// src/components/CalendarSync.js
import React, { useState } from "react";

/**
 * קומפוננטה לסנכרון משימות ליומן Google
 * כולל תמיכה בהוספת משתתפים - כל משתתף מקבל הזמנה ביומן שלו
 */
function CalendarSync({ tasks, accessToken }) {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleSync = async () => {
    // בדיקה שיש חיבור לגוגל
    if (!accessToken) {
      setError("❌ אין חיבור לגוגל!");
      return;
    }

    // סינון משימות עם deadline בלבד
    const tasksWithDeadline = tasks.filter(
      (task) => task.deadline && !task.completed
    );

    if (tasksWithDeadline.length === 0) {
      setError("⚠️ אין משימות עם תאריך יעד לסנכרון");
      return;
    }

    console.log(`📅 מתחיל סנכרון של ${tasksWithDeadline.length} משימות...`);

    setSyncing(true);
    setError(null);
    setSyncStatus(null);

    let successCount = 0;
    let failedCount = 0;

    // עובר על כל המשימות ומוסיף אותן ליומן
    for (const task of tasksWithDeadline) {
      try {
        await addTaskToCalendar(task, accessToken);
        successCount++;
        console.log(`✅ ${task.text} - נוסף בהצלחה!`);
      } catch (err) {
        failedCount++;
        console.error(`❌ ${task.text} - שגיאה:`, err.message);
      }
    }

    setSyncing(false);
    setSyncStatus({
      success: successCount,
      failed: failedCount,
      total: tasksWithDeadline.length,
    });

    console.log(`✅ סנכרון הושלם: ${successCount} הצליחו, ${failedCount} נכשלו`);
  };

  return (
    <div>
      <button onClick={handleSync} disabled={syncing || !accessToken}>
        {syncing ? "⏳ Syncing..." : "Sync Tasks to Calendar"}
      </button>

      {syncStatus && (
        <div>
          ✅ Synced {syncStatus.success} of {syncStatus.total} tasks
          {syncStatus.failed > 0 && ` (${syncStatus.failed} failed)`}
        </div>
      )}

      {error && <div>{error}</div>}

      {!accessToken && <div>⚠️ Please login with Google to sync calendar</div>}
    </div>
  );
}

/**
 * פונקציה שמוסיפה משימה אחת ליומן Google
 */
async function addTaskToCalendar(task, accessToken) {
  const deadlineDate = new Date(task.deadline);
  
  // פורמט התאריך ליום שלם (YYYY-MM-DD)
  const dateString = deadlineDate.toISOString().split('T')[0];

  // יצירת אירוע של יום שלם (All-day event)
  const event = {
    summary: `📋 ${task.text}`,
    description: buildDescription(task),
    start: {
      date: dateString, // רק תאריך, בלי שעה
    },
    end: {
      date: dateString, // אותו תאריך
    },
    // ⭐⭐⭐ הוספת משתתפים - כל אחד יקבל הזמנה ביומן שלו! ⭐⭐⭐
    attendees: task.participants && task.participants.length > 0
      ? task.participants.map(email => ({ 
          email: email.trim(),
          responseStatus: 'needsAction'
        }))
      : undefined,
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 0 }, // תזכורת ביום עצמו בבוקר
      ],
    },
    colorId: getPriorityColor(task.priority),
  };

  // שליחת הבקשה ל-Google Calendar API
  // ⭐ sendUpdates=all שולח הזמנות אוטומטית לכל המשתתפים
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "שגיאה בהוספה ליומן");
  }

  return await response.json();
}

/**
 * בונה תיאור מפורט למשימה
 */
function buildDescription(task) {
  let description = `משימה מ-TaskMan\n\n`;

  if (task.priority) {
    description += `🎯 Priority: ${task.priority}\n`;
  }

  if (task.category) {
    description += `📁 Category: ${task.category}\n`;
  }

  if (task.participants && task.participants.length > 0) {
    description += `👥 Participants: ${task.participants.join(", ")}\n`;
  }

  return description;
}

/**
 * מחזיר צבע לפי עדיפות המשימה
 * Google Calendar color IDs:
 * 11 = אדום (High), 5 = צהוב (Normal), 9 = כחול (Low)
 */
function getPriorityColor(priority) {
  const colorMap = {
    High: "11",
    Normal: "5",
    Low: "9",
  };
  return colorMap[priority] || "5";
}

export default CalendarSync;

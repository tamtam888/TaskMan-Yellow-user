// src/components/CalendarSync.jsx
import React from "react";

/**
 * קומפוננטה פשוטה שמדגימה סנכרון משימות ליומן
 * בשלב ראשון – רק מציגה בלוגים (console.log)
 * בהמשך אפשר להוסיף חיבור ל-Google Calendar API
 */
function CalendarSync({ tasks }) {
  const handleSync = () => {
    console.log("📅 התחלת סנכרון משימות ליומן...");
    tasks.forEach((task) => {
      if (task.deadline) {
        console.log(`מוסיפה ליומן: ${task.text} | Deadline: ${task.deadline}`);
        // כאן נוסיף בהמשך קריאה אמיתית ל-API של Google Calendar
      }
    });
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={handleSync}>Sync Tasks to Calendar</button>
    </div>
  );
}

export default CalendarSync;

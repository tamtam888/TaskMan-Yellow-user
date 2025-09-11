import React, { useState } from "react";
import "./TaskItem.css";

function TaskItem({ task, onToggle, onDelete, eatingTaskId, onEdit }) {
  console.log("🔍 TaskItem קיבל משימה:", task); // ✅ כאן מותר להשתמש ב-task

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("/")) return dateString;
    const [year, month, day] = (dateString || "").split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDateForStorage = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("-")) return dateString;
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  // כמו בגרסה שעבדה: תמיכה גם במערך וגם במחרוזת
  const usersToString = (users, participants) => {
    if (Array.isArray(users)) return users.join(", ");
    if (typeof users === "string") return users;
    if (Array.isArray(participants)) return participants.join(", ");
    if (typeof participants === "string") return participants;
    return "";
  };
  const usersDisplay = usersToString(task.users, task.participants);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDeadline, setEditedDeadline] = useState(
    task.deadline ? formatDateForDisplay(task.deadline) : ""
  );
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const [editedParticipants, setEditedParticipants] = useState(task.participants || "");

  const handleSave = () => {

  const [editedUsers, setEditedUsers] = useState(usersDisplay);

  const isValidDate = (dateString) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;
    const [d, m, y] = dateString.split("/").map(Number);
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  };

  const isFutureOrToday = (dateString) => {
    const [d, m, y] = dateString.split("/").map(Number);
    const inputDate = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
  };

  const handleSave = () => {
    if (!isValidDate(editedDeadline)) {
      alert("Please enter a valid date in the format DD/MM/YYYY.");
      return;
    }
    if (!isFutureOrToday(editedDeadline)) {
      alert("Deadline must be today or a future date.");
      return;
    }

    const usersArray =
      editedUsers.trim() === ""
        ? []
        : editedUsers.split(",").map((u) => u.trim()).filter(Boolean);

    const updatedTask = {
      ...task,
      text: editedText,
      deadline: formatDateForStorage(editedDeadline),
      priority: editedPriority,

      participants: editedParticipants, // ⬅ ללא split

      users: usersArray,               // לעריכה
      participants: editedUsers.trim() // לתצוגה

    };

    onEdit(updatedTask);
    setIsEditing(false);
  };


  const handleDeadlineChange = (e) => {
    let v = e.target.value.replace(/[^\d/]/g, "");
    if (v.length >= 2 && v.charAt(2) !== "/") v = v.slice(0, 2) + "/" + v.slice(2);
    if (v.length >= 5 && v.charAt(5) !== "/") v = v.slice(0, 5) + "/" + v.slice(5);
    if (v.length > 10) v = v.slice(0, 10);
    setEditedDeadline(v);
  };


  return (
    <li className={`task-list-item task-item ${task.priority} ${task.completed ? "completed" : ""}`}>
      {!isEditing && (
        <button className="edit-btn" title="Edit task" onClick={() => setIsEditing(true)}>
          🖉
        </button>
      )}

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Task text"
            aria-label="Edit task"
          />
          <input
            type="text"
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
            placeholder="DD/MM/YYYY"
            aria-label="Edit deadline"
            maxLength="10"
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            aria-label="Edit priority"
          >
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          <input
            type="text"

            value={editedParticipants}
            onChange={(e) => setEditedParticipants(e.target.value)}
            placeholder="Add participants"
            aria-label="Edit participants"

            value={editedUsers}
            onChange={(e) => setEditedUsers(e.target.value)}
            placeholder="Add participants"
            aria-label="Edit users"

          />
          <div className="edit-buttons">
            <button onClick={handleSave}>✅</button>
            <button onClick={() => setIsEditing(false)}>❌</button>
          </div>
        </div>
      ) : (
        <>
          <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />

          <span className="emoji-left">
            {task.priority === "high" ? "😡" : task.priority === "normal" ? "🤔" : "🤢"}
          </span>

          <span className="task-text">{task.text}</span>

          {task.participants && task.participants.trim() !== "" && (
            <div className="task-users">🧑‍🤝‍🧑 {task.participants}</div>

          {/* 👥 תצוגת משתתפים */}
          {usersDisplay && (
            <span className="task-users">🧑‍🤝‍🧑 {usersDisplay}</span>

          )}

          {task.deadline && (
            <span className="task-deadline">
              <strong>Deadline:</strong> {formatDateForDisplay(task.deadline)}
            </span>
          )}

          <span className="task-category">{task.category}</span>


          {task.date && <span className="task-date">{task.date}</span>}

          <button onClick={() => onDelete(task.id)} title="Remove">🗑️</button>

          {eatingTaskId === task.id && (
            <img src="/taskman-transparent.png" alt="Eating" className="dane-eat" />
          )}
        </>
      )}
    </li>
  );
}

export default TaskItem;

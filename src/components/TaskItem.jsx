import React, { useState } from "react";
import "./TaskItem.css";

function TaskItem({ task, onToggle, onDelete, eatingTaskId, onEdit }) {
  console.log("🔍 TaskItem קיבל משימה:", task); // ✅ כאן מותר להשתמש ב-task

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("/")) return dateString;
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDateForStorage = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("-")) return dateString;
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDeadline, setEditedDeadline] = useState(
    task.deadline ? formatDateForDisplay(task.deadline) : ""
  );
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedParticipants, setEditedParticipants] = useState(task.participants || "");

  const handleSave = () => {
    const updatedTask = {
      ...task,
      text: editedText,
      deadline: formatDateForStorage(editedDeadline),
      priority: editedPriority,
      participants: editedParticipants, // ⬅ ללא split
    };

    onEdit(updatedTask);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.priority} ${task.completed ? "completed" : ""}`}>
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
          )}

          {task.deadline && (
            <span className="task-deadline">
              <strong>Deadline:</strong> {formatDateForDisplay(task.deadline)}
            </span>
          )}

          <span className="task-category">{task.category}</span>

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

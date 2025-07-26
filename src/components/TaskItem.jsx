import React, { useState } from "react";
import "./TaskItem.css";

function TaskItem({ task, onToggle, onDelete, eatingTaskId, onEdit }) {
  // פונקציה להמרת תאריך מ-YYYY-MM-DD ל-DD/MM/YYYY
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("/")) return dateString; // כבר בפורמט תצוגה
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // פונקציה להמרת תאריך מ-DD/MM/YYYY ל-YYYY-MM-DD (לשמירה)
  const formatDateForStorage = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("-")) return dateString; // כבר בפורמט שמירה
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDeadline, setEditedDeadline] = useState(
    task.deadline ? formatDateForDisplay(task.deadline) : ""
  );
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const getCategoryIcon = (category) => {
    if (category === "Shopping") return "🛒";
    if (category === "mission") return "📋";
    if (category === "other") return "💡";
    return "";
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      text: editedText,
      deadline: formatDateForStorage(editedDeadline),
      priority: editedPriority,
    };
    onEdit(updatedTask);
    setIsEditing(false);
  };

  const handleDeadlineChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d/]/g, "");
    if (value.length >= 2 && value.charAt(2) !== "/") {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }
    if (value.length >= 5 && value.charAt(5) !== "/") {
      value = value.substring(0, 5) + "/" + value.substring(5);
    }
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    setEditedDeadline(value);
  };

  return (
    <li className={`task-item ${task.priority} ${task.completed ? "completed" : ""}`}>
      {!isEditing && (
        <button
          className="edit-btn"
          title="Edit task"
          onClick={() => setIsEditing(true)}
        >
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
            dir="rtl"
          />
          <input
            type="text"
            value={editedDeadline}
            onChange={handleDeadlineChange}
            placeholder="DD/MM/YYYY"
            aria-label="Edit deadline"
            dir="ltr"
            maxLength="10"
            style={{
              textAlign: "left",
              direction: "ltr",
            }}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            aria-label="Edit priority"
            dir="ltr"
          >
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          <div className="edit-buttons">
            <button onClick={handleSave} title="Save changes">
              ✅
            </button>
            <button onClick={() => setIsEditing(false)} title="Cancel">
              ❌
            </button>
          </div>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />

          <span className="emoji-left">
            {task.priority === "high"
              ? "😡"
              : task.priority === "normal"
              ? "🤔"
              : task.priority === "low"
              ? "🤢"
              : ""}
          </span>

          <span className="task-text">{task.text}</span>

          {task.deadline && (
            <span className="task-deadline">
              <strong>Deadline:</strong> {formatDateForDisplay(task.deadline)}
            </span>
          )}

          <span className="task-category">
            {getCategoryIcon(task.category)} {task.category}
          </span>

          {task.date && <span className="task-date">{task.date}</span>}

          <button onClick={() => onDelete(task.id)} title="Remove">
            🗑️
          </button>

          {eatingTaskId === task.id && (
            <img
              src="/taskman-transparent.png"
              alt="Eating"
              className="dane-eat"
            />
          )}
        </>
      )}
    </li>
  );
}

export default TaskItem;

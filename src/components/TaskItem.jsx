import React from "react";
import "./TaskItem.css";

function TaskItem({ task, onToggle, onDelete, eatingTaskId }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Shopping":
        return "🛒";
      case "mission":
        return "📋";
      case "other":
        return "💡";
      default:
        return "";
    }
  };

  return (
    <li
      className={`task-item ${task.priority} ${task.completed ? "completed" : ""}`}
    >
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
          : "🨢"}
      </span>

      <span className="task-text">{task.text}</span>
      <span className="task-date">{task.date}</span>
      <span className="task-deadline">Deadline: {task.deadline}</span>

      <span className="task-category">
        {getCategoryIcon(task.category)} {task.category}
      </span>

      <button onClick={() => onDelete(task.id)} title="Remove">
        🗑️
      </button>

      {eatingTaskId === task.id && (
        <img src="/taskman-transparent.png" alt="Eating" className="dane-eat" />
      )}
    </li>
  );
}

export default TaskItem;

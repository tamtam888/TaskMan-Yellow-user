import React from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

function TaskList({
  tasks,
  toggleTaskCompleted,
  removeTask,
  eatingTaskId,
  tab,
  onEditTask,
}) {
  const priorityOrder = { high: 1, normal: 2, low: 3 };

  const filteredTasks = tasks
    .filter((task) => {
      if (!tab) return true; // ✅ הגנה על undefined/null
      if (tab.toLowerCase() === "all") return true;
      if (tab.toLowerCase() === "done") return task.completed;

      // ✅ השוואה בטוחה עם ברירת מחדל ריקה
      return (task.category || "").toLowerCase() === tab.toLowerCase();
    })
    .sort((a, b) => (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99));

  return (
    <ul className="task-list">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <li key={task.id} className="task-list-item">
            <TaskItem
              task={task}
              onToggle={toggleTaskCompleted}
              onDelete={() => removeTask(task.id)}
              eatingTaskId={eatingTaskId}
              onEdit={onEditTask}
            />
          </li>
        ))
      ) : (
        <li style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
          No tasks found
        </li>
      )}
    </ul>
  );
}

export default TaskList;

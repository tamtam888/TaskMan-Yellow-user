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
      if (tab === "all") return true;
      if (tab === "done") return task.completed;
      return task.category?.toLowerCase() === tab.toLowerCase();
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  console.log("[TaskList] render count:", filteredTasks.length, "tab:", tab);

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-list-item">
          <TaskItem
            task={task}
            onToggle={toggleTaskCompleted}
            onDelete={() => removeTask(task.id)}
            eatingTaskId={eatingTaskId}
            onEdit={onEditTask}
          />
        </div>
      ))}
    </ul>
  );
}

export default TaskList;

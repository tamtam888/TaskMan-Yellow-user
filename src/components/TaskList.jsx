import React from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

function TaskList({
  tasks,
  toggleTaskCompleted,
  removeTask,
  eatingTaskId,
  tab,
}) {
  // ✨ סינון משימות לפי הטאב הנבחר
  const filteredTasks = tasks.filter((task) => {
    if (tab === "all") return true;
    if (tab === "done") return task.completed;
    return task.category === tab;
  });

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTaskCompleted}
          onDelete={() => removeTask(task.id)}
          eatingTaskId={eatingTaskId}
        />
      ))}
    </ul>
  );
}

export default TaskList;

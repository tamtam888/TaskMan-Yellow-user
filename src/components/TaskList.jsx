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
  const filteredTasks = tasks.filter((task) => {
    if (tab === "all") return true;
    if (tab === "done") return task.completed;
    return task.category === tab;
  });

  console.log("[TaskList] render count:", filteredTasks.length); // לוג אימות

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        // ❌ בלי <li> כאן, כי TaskItem כבר מחזיר <li>
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTaskCompleted}
          onDelete={() => removeTask(task.id)}
          eatingTaskId={eatingTaskId}
          onEdit={onEditTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;

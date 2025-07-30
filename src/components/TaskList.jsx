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

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-list-item">
          <TaskItem
            task={task}
            onToggle={toggleTaskCompleted}
            onDelete={() => removeTask(task.id)}
            eatingTaskId={eatingTaskId}
            onEdit={onEditTask} // חובה כדי שהתעדכון ישפיע בפועל
          />
        </div>
      ))}
    </ul>
  );
}

export default TaskList;

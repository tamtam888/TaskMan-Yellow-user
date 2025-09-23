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
      const taskCategory = (task.category || "").toLowerCase();
      const currentTab = (tab || "").toLowerCase();

      if (currentTab === "all") return true;
      if (currentTab === "done") return task.completed;
      return taskCategory === currentTab;
    })
    .sort((a, b) => {
      const aPriority = priorityOrder[a.priority] || 99;
      const bPriority = priorityOrder[b.priority] || 99;
      return aPriority - bPriority;
    });

  console.log(
    "[TaskList] render count:",
    filteredTasks.length,
    "tab:",
    tab,
    "categories:",
    tasks.map((t) => t.category)
  );

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

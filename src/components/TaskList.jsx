import React, { useState } from "react";
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
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (tab === "all") return true;
    if (tab === "done") return task.completed;
    return task.category === tab;
  });

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-list-item">
          {editingTaskId === task.id ? (
            <input
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => {
                if (editText.trim() !== "") {
                  onEditTask(task.id, editText.trim());
                }
                setEditingTaskId(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (editText.trim() !== "") {
                    onEditTask(task.id, editText.trim());
                  }
                  setEditingTaskId(null);
                }
              }}
              autoFocus
            />
          ) : (
            <>
              <TaskItem
                task={task}
                onToggle={toggleTaskCompleted}
                onDelete={() => removeTask(task.id)}
                eatingTaskId={eatingTaskId}
              />
              {!task.completed && (
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditText(task.text);
                  }}
                >
                  🖉
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </ul>
  );
}

export default TaskList;

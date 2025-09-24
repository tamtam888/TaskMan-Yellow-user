import React, { useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import CalendarSync from "./components/CalendarSync"; // ✅ חדש
import "../App.css";

function TaskManApp({ tasks = [], setTasks: externalSetTasks }) {
  const [internalTasks, internalSetTasks] = useState(tasks);

  const actualTasks = externalSetTasks ? tasks : internalTasks;
  const setTasks = externalSetTasks || internalSetTasks;

  const addTask = (text, priority, date, category, deadline, participants) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      priority,
      completed: false,
      date,
      deadline,
      category,
      users: [],
      participants: participants || "",
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTaskCompleted = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="taskman-app">
      <h1>TaskMan</h1>
      <TaskInput onAddTask={addTask} />
      <TaskList
        tasks={actualTasks}
        onToggleTask={toggleTaskCompleted}
        onDeleteTask={removeTask}
      />
      <CalendarSync tasks={actualTasks} /> {/* ✅ חדש */}
    </div>
  );
}

export default TaskManApp;



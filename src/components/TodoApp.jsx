import React, { useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import Tabs from "./DoneStatusTabs";
import CalendarSync from "./CalendarSync"; // ✅ תיקון import
import "../App.css";

function TodoApp({ tasks = [], setTasks: externalSetTasks }) {
  const [internalTasks, internalSetTasks] = useState(tasks);
  const [tab, setTab] = useState("all");

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
    <div className="todo-app">
      <TaskInput onAddTask={addTask} />
      <Tabs tab={tab} setTab={setTab} />
      <TaskList
        tasks={actualTasks}
        onToggleTask={toggleTaskCompleted}
        onDeleteTask={removeTask}
        tab={tab}
      />

      {/* ✅ שמנו את CalendarSync בסוף כדי לא לשבור עיצוב */}
      <div className="calendar-sync-container">
        <CalendarSync tasks={actualTasks} />
      </div>
    </div>
  );
}

export default TodoApp;




import React, { useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import Tabs from "./DoneStatusTabs";
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
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEditTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
    );
  };

  return (
    <div className="todo-container">
      <header className="title-header">
        <div className="title-content">
          <img src="/pacwhite.png" alt="Mdone Icon" className="dane-icon" />
          <div>
            <h1>TaskMan</h1>
            <p className="subtitle">Your task guide to victory!</p>
          </div>
        </div>
      </header>

      <TaskInput onAddTask={addTask} />
      <Tabs activeTab={tab} onTabChange={setTab} />

      {/* ✨ שולחים גם את tab ל-TaskList */}
      <TaskList
        tasks={actualTasks}
        toggleTaskCompleted={toggleTaskCompleted}
        removeTask={removeTask}
        tab={tab}
        onEditTask={handleEditTask}
      />

      <div className="signature">© TM by TK ~ 2025</div>
    </div>
  );
}

export default TodoApp;


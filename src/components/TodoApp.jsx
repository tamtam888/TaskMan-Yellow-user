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
    console.log("[TodoApp] addTask() received:", {
      text,
      priority,
      date,
      category,
      deadline,
      participants,
    });

    let usersArray = [];
    let participantsString = "";

    if (Array.isArray(participants)) {
      usersArray = participants
        .filter(Boolean)
        .map((s) => String(s).trim())
        .filter(Boolean);
      participantsString = usersArray.join(", ");
    } else if (typeof participants === "string") {
      const p = participants.trim();
      usersArray = p
        ? p.split(",").map((s) => s.trim()).filter(Boolean)
        : [];
      participantsString = usersArray.join(", ");
    }

    const newTask = {
      id: Date.now().toString(),
      text,
      priority,
      completed: false,
      date,
      deadline,
      category,
      users: usersArray,
      participants: participantsString,
    };

    console.log("[TodoApp] Task created:", newTask);
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

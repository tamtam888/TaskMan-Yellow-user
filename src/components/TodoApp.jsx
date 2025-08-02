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

  const addTask = (text, priority, date, category, deadline, users) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      priority,
      completed: false,
      date,
      deadline,
      category,
      users, // 👥 משתתפים
    };
    setTasks([newTask, ...actualTasks]);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = actualTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    setTasks(actualTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = actualTasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
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

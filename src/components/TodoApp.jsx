import React, { useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import Tabs from "./Tabs";
import "../App.css";

function TodoApp({ tasks = [], setTasks: externalSetTasks }) {
  // אם לא נשלח setTasks מבחוץ – נשתמש ב־useState פנימי
  const [internalTasks, internalSetTasks] = useState(tasks);
  const [tab, setTab] = useState("all");
  const [eatingTaskId, setEatingTaskId] = useState(null);

  const actualTasks = externalSetTasks ? tasks : internalTasks;
  const setTasks = externalSetTasks || internalSetTasks;

  const addTask = (text, priority, date, category, deadline) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      priority,
      completed: false,
      date,
      deadline,
      category,
    };
    setTasks([newTask, ...actualTasks]);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = actualTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);

    // אפקט פקמן כשמשימה בוצעה
    const completedTask = updatedTasks.find(
      (task) => task.id === id && task.completed
    );
    if (completedTask) {
      setEatingTaskId(id);
      setTimeout(() => setEatingTaskId(null), 2000); // אחרי 2 שניות תעלים את פקמן
    }
  };

  const removeTask = (id) => {
    setTasks(actualTasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    const updated = actualTasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updated);
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
        eatingTaskId={eatingTaskId}
        tab={tab}
        onEditTask={editTask}
      />

      <div className="signature">© TM by TK ~ 2025</div>
    </div>
  );
}

export default TodoApp;

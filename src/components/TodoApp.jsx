import React, { useState, useEffect } from "react";
import Title from "./Title";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import DoneStatusTabs from "./DoneStatusTabs";
import "../App.css";

const TodoApp = ({ tasks, setTasks }) => {
  const [tab, setTab] = useState("all");

  useEffect(() => {
    localStorage.setItem("taskman-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (text, priority, date, category) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
      date,
      category,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTaskCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (tab === "all") return true;
      if (tab === "done") return task.completed;
      return task.category === tab;
    })
    .sort((a, b) => {
      const priorityOrder = { high: 1, normal: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <div className="todo-container">
      <Title />

      <TaskInput onAddTask={handleAddTask} />
      <DoneStatusTabs tab={tab} setTab={setTab} />
      <TaskList
        tasks={filteredTasks}
        removeTask={handleRemoveTask}
        toggleTaskCompleted={handleToggleTaskCompleted}
        tab={tab}
      />
      <div className="signature">© TM by TK ~ 2025</div>
    </div>
  );
};

export default TodoApp;

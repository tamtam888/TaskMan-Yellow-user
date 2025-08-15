import React, { useState } from "react";
import "./TaskInput.css";

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && priority && category && deadline) {
      const date = new Date();
      const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${date.getFullYear()}`;

      onAddTask(trimmedValue, priority, formattedDate, category, deadline);
      setInputValue("");
      setPriority("");
      setCategory("");
      setDeadline("");
    } else {
      alert("Please enter all fields: mission, priority, category, and deadline!");
    }
  };

  return (
    <div className="input-task-container">
      <label htmlFor="task-input" style={{ display: "none" }}>Task</label>
      <input
        id="task-input"
        type="text"
        placeholder="🎮 What’s your next mission?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Task"
      />

      <label htmlFor="priority-select" style={{ display: "none" }}>Priority</label>
      <select
        id="priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
        aria-label="Priority"
      >
        <option value="" disabled hidden>- Priority mission -</option>
        <option value="high">😡 High</option>
        <option value="normal">🤔 Normal</option>
        <option value="low">🤢 Low</option>
      </select>

      <label htmlFor="category-select" style={{ display: "none" }}>Category</label>
      <select
        id="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
        aria-label="Category"
      >
        <option value="" disabled hidden>- Choose category -</option>
        <option value="Shopping">🛒 Shopping</option>
        <option value="mission">📋 Mission</option>
        <option value="other">💡 Other</option>
      </select>

      <label htmlFor="deadline-input" style={{ display: "none" }}>Deadline</label>
      <input
        id="deadline-input"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="deadline-input"
        aria-label="Deadline"
      />

      <button onClick={handleAdd}>+ Add</button>
    </div>
  );
}

export default TaskInput;





import React, { useState } from "react";
import "./TaskInput.css";

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && priority && category) {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      // שליחת משימה עם קטגוריה!
      onAddTask(trimmedValue, priority, formattedDate, category);

      // ניקוי שדות
      setInputValue("");
      setPriority("");
      setCategory("");
    } else {
      alert("Please enter a mission, choose a priority and a category!!.");
    }
  };

  return (
    <div className="input-task-container">
      <input
        type="text"
        placeholder="🎮 What’s your next mission?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="" disabled hidden>
          - Priority mission -
        </option>
        <option value="high">😡 High</option>
        <option value="normal">🤔 Normal</option>
        <option value="low">🤢 Low</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        <option value="" disabled hidden>
          - Choose category -
        </option>
        <option value="Shopping">🛒 Shopping</option>
        <option value="mission">📋 Mission</option>
        <option value="other">💡 Other</option>
      </select>

      <button onClick={handleAdd}>+ Add</button>
    </div>
  );
}

export default TaskInput;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./TaskInput.css";

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState(null);

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && priority && category && deadline) {
      const now = new Date();
      const creationDate = format(now, "dd/MM/yyyy");
      const deadlineFormatted = format(deadline, "dd/MM/yyyy");

      onAddTask(trimmedValue, priority, creationDate, category, deadlineFormatted);
      setInputValue("");
      setPriority("");
      setCategory("");
      setDeadline(null);
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
        placeholder="🎮 What's your next mission?"
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

      <label htmlFor="deadline-datepicker" style={{ display: "none" }}>Deadline</label>
      <DatePicker
        id="deadline-datepicker"
        selected={deadline}
        onChange={(date) => setDeadline(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="📅 DD/MM/YYYY"
        className="deadline-date-input"
        aria-label="Deadline"
      />

      <button onClick={handleAdd}>+ Add</button>
    </div>
  );
}

export default TaskInput;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./TaskInput.css";

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState(new Date());

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (!trimmedValue || !priority || !category || !deadline) {
      alert("Please enter all fields: mission, priority, category, and deadline!");
      return;
    }

    if (Object.prototype.toString.call(deadline) !== "[object Date]" || isNaN(deadline)) {
      alert("Invalid date format. Please enter a valid date.");
      return;
    }

    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    if (deadlineDate < now) {
      alert("Deadline must be today or a future date.");
      return;
    }

    const creationDate = format(now, "dd/MM/yyyy");
    const deadlineFormatted = format(deadlineDate, "dd/MM/yyyy");

    onAddTask(trimmedValue, priority, creationDate, category, deadlineFormatted);
    setInputValue("");
    setPriority("");
    setCategory("");
    setDeadline(new Date());
  };

  return (
    <div className="input-task-container">
      <input
        id="task-input"
        type="text"
        placeholder="🎮 What's your next mission?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Task"
      />

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

      <DatePicker
        id="deadline-datepicker"
        selected={deadline}
        onChange={(date) => setDeadline(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="📅 DD/MM/YYYY"
        minDate={new Date()}
        className="deadline-date-input"
        aria-label="Deadline"
      />

      <button onClick={handleAdd}>+ Add</button>
    </div>
  );
}

export default TaskInput;

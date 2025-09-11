import React, { useState } from "react";
import "./TaskItem.css";

function TaskItem({ task, onToggle, onDelete, eatingTaskId, onEdit }) {
  console.log("🔍 TaskItem קיבל משימה:", task);

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("/")) return dateString;
    const [year, month, day] = (dateString || "").split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDateForStorage = (dateString) => {
    if (!dateString) return "";
    if (dateString.includes("-")) return dateString;
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const usersToString = (users, participants) => {
    if (Array.isArray(users)) return users.join(", ");
    if (typeof users === "string") return users;
    if (Array.isArray(participants)) return participants.join(", ");
    if (typeof participants === "string") return participants;
    return "";
  };
  const usersDisplay = usersToString(task.users, task.participants);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDeadline, setEditedDeadline] = useState(
    task.deadline ? formatDateForDisplay(task.deadline) : ""
  );
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedUsers, setEditedUsers] = useState(usersDisplay);

  const isValidDate = (dateString) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;
    const [d, m, y] = dateString.split("/").map(Number);
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  };

  const isFutureOrToday = (dateString) => {
    const [d, m, y] = dateString.split("/").map(Number);
    const inputDate = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
  };

  const handleSave = () => {
    if (!isValidDate(editedDeadline)) {
      alert("Please enter a valid date in the format DD/MM/YYYY.");
      return;
    }
    if (!isFutureOrToday(editedDeadline)) {
      alert("Deadline must be today o


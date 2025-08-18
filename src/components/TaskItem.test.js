import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskItem from "./TaskItem";

// עוזר לפורמט DD/MM/YYYY
function formatDDMMYYYY(d) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// נשתמש היום כערך התחלה חוקי
const today = new Date();
const sampleTask = {
  id: "1",
  text: "Buy milk",
  priority: "normal",
  completed: false,
  category: "Shopping",
  deadline: formatDDMMYYYY(today), // היום - חוקי
  date: formatDDMMYYYY(today),
};

test("Edit task with valid input", () => {
  const onEdit = jest.fn();

  render(
    <TaskItem task={sampleTask} onEdit={onEdit} onToggle={() => {}} onDelete={() => {}} />
  );

  fireEvent.click(screen.getByTitle("Edit task"));

  fireEvent.change(screen.getByLabelText("Edit task"), {
    target: { value: "Buy eggs" },
  });

  // מחר = עתידי => יעבור ולידציה
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  fireEvent.change(screen.getByLabelText("Edit deadline"), {
    target: { value: formatDDMMYYYY(tomorrow) },
  });

  fireEvent.change(screen.getByLabelText("Edit priority"), {
    target: { value: "high" },
  });

  fireEvent.click(screen.getByTitle("Save changes"));

  expect(onEdit).toHaveBeenCalledTimes(1);
});

test("Show alert on invalid past date", () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  render(
    <TaskItem task={sampleTask} onEdit={() => {}} onToggle={() => {}} onDelete={() => {}} />
  );

  fireEvent.click(screen.getByTitle("Edit task"));

  fireEvent.change(screen.getByLabelText("Edit deadline"), {
    target: { value: "01/01/2020" }, // עבר
  });

  fireEvent.click(screen.getByTitle("Save changes"));

  expect(alertSpy).toHaveBeenCalledWith("Deadline must be today or a future date.");
  alertSpy.mockRestore();
});

test("Show alert on invalid format", () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  render(
    <TaskItem task={sampleTask} onEdit={() => {}} onToggle={() => {}} onDelete={() => {}} />
  );

  fireEvent.click(screen.getByTitle("Edit task"));

  fireEvent.change(screen.getByLabelText("Edit deadline"), {
    target: { value: "2025-08-01" }, // פורמט לא DD/MM/YYYY
  });

  fireEvent.click(screen.getByTitle("Save changes"));

  expect(alertSpy).toHaveBeenCalledWith("Please enter a valid date in the format DD/MM/YYYY.");
  alertSpy.mockRestore();
});

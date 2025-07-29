import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem";

const sampleTask = {
  id: "1",
  text: "Buy milk",
  priority: "normal",
  completed: false,
  category: "Shopping",
  deadline: "01/08/2025",
  date: "28/07/2025",
};

test("Edit task with valid input", () => {
  const onEdit = jest.fn();

  render(
    <TaskItem task={sampleTask} onEdit={onEdit} onToggle={() => {}} onDelete={() => {}} />
  );

  fireEvent.click(screen.getByTitle("Edit task"));

  fireEvent.change(screen.getByLabelText("Edit task"), {
    target: { value: "Buy eggs" }
  });

  fireEvent.change(screen.getByLabelText("Edit deadline"), {
    target: { value: "02/08/2025" }
  });

  fireEvent.change(screen.getByLabelText("Edit priority"), {
    target: { value: "high" }
  });

  fireEvent.click(screen.getByTitle("Save changes"));

  expect(onEdit).toHaveBeenCalled();
});

test("Show alert on invalid past date", () => {
  window.alert = jest.fn();

  render(
    <TaskItem task={sampleTask} onEdit={() => {}} onToggle={() => {}} onDelete={() => {}} />
  );

  fireEvent.click(screen.getByTitle("Edit task"));

  fireEvent.change(screen.getByLabelText("Edit deadline"), {
    target: { value: "01/01/2020" }
  });

  fireEvent.click(screen.getByTitle("Save changes"));

  expect(window.alert).toHaveBeenCalledWith("Deadline must be today or a future date.");
});

test("Show alert on invalid format", () => {
  window.alert = jest.fn();

  render(
    <TaskItem task={sampleTask} onEdit={() => {}} onToggle={() => {}} onDelete={() => {}} />
  );

  fireEvent.click(screen.getByTitle("Edit task"));

  fireEvent.change(screen.getByLabelText("Edit deadline"), {
    target: { value: "2025-08-01" }
  });

  fireEvent.click(screen.getByTitle("Save changes"));

  expect(window.alert).toHaveBeenCalledWith("Please enter a valid date in the format DD/MM/YYYY.");
});








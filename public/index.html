import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem";
import '@testing-library/jest-dom';

describe("TaskItem - Edit Feature", () => {
  const sampleTask = {
    id: "1",
    text: "Buy cheese",
    priority: "high",
    completed: false,
    date: "25/07/2025",
    deadline: "2025-08-01",
    category: "Shopping",
  };

  const onEditMock = jest.fn();

  beforeEach(() => {
    render(
      <TaskItem
        task={sampleTask}
        onToggle={() => {}}
        onDelete={() => {}}
        eatingTaskId={null}
        onEdit={onEditMock}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows edit fields when clicking pencil icon", () => {
    const editIcon = screen.getByTitle("Edit");
    fireEvent.click(editIcon);

    expect(screen.getByRole("textbox", { name: "Edit task" })).toBeInTheDocument();
    expect(screen.getByLabelText("Edit deadline")).toBeInTheDocument();
    expect(screen.getByLabelText("Edit priority")).toBeInTheDocument();
  });

  test("calls onEdit with updated task", () => {
    const editIcon = screen.getByTitle("Edit");
    fireEvent.click(editIcon);

    const input = screen.getByRole("textbox", { name: "Edit task" });
    fireEvent.change(input, { target: { value: "Buy milk" } });

    const saveButton = screen.getByRole("button", { name: "✅" });
    fireEvent.click(saveButton);

    expect(onEditMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        text: "Buy milk",
      })
    );
  });
});

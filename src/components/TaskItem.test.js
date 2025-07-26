import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem";
import '@testing-library/jest-dom';

describe("TaskItem component", () => {
  const sampleTask = {
    id: "1",
    text: "Buy cheese",
    priority: "high",
    completed: false,
    date: "25/07/2025",
    deadline: "2025-08-01",
    category: "Shopping",
  };

  const onToggleMock = jest.fn();
  const onDeleteMock = jest.fn();

  beforeEach(() => {
    render(
      <TaskItem
        task={sampleTask}
        onToggle={onToggleMock}
        onDelete={onDeleteMock}
        eatingTaskId={null}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders task details", () => {
    expect(screen.getByText("Buy cheese")).toBeInTheDocument();
    expect(screen.getByText("25/07/2025")).toBeInTheDocument();
    expect(screen.getByText("Deadline: 2025-08-01")).toBeInTheDocument();
    expect(screen.getByText(/🛒 Shopping/)).toBeInTheDocument();
    expect(screen.getByText("😡")).toBeInTheDocument(); // Emoji for high priority
  });

  test("calls onToggle when checkbox is clicked", () => {
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(onToggleMock).toHaveBeenCalledWith("1");
  });

  test("calls onDelete when delete button is clicked", () => {
    const deleteButton = screen.getByRole("button", { name: "🗑️" });
    fireEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });

  test("does not show eating image if not eating", () => {
    const img = screen.queryByAltText("Eating");
    expect(img).not.toBeInTheDocument();
  });

  test("shows eating image when eatingTaskId matches", () => {
    render(
      <TaskItem
        task={sampleTask}
        onToggle={onToggleMock}
        onDelete={onDeleteMock}
        eatingTaskId="1"
      />
    );
    const img = screen.getByAltText("Eating");
    expect(img).toBeInTheDocument();
  });
});


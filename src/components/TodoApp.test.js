import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp";
import '@testing-library/jest-dom'; // חובה!

describe("TodoApp component", () => {
  test("adds a new task and displays it", () => {
    render(<TodoApp />);

    fireEvent.change(screen.getByPlaceholderText("🎮 What’s your next mission?"), {
      target: { value: "New Task" },
    });

    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "high" },
    });

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Shopping" },
    });

    fireEvent.change(screen.getByLabelText("Deadline"), {
      target: { value: "2025-08-01" },
    });

    fireEvent.click(screen.getByText("+ Add"));

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getAllByText(/🛒 Shopping/i).length).toBeGreaterThan(0);
  });
});


import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp";
import '@testing-library/jest-dom';

test("adds and displays a new task", () => {
  render(<TodoApp />);

  fireEvent.change(screen.getByLabelText("Task"), {
    target: { value: "Buy cheese" },
  });

  fireEvent.change(screen.getByLabelText("Priority"), {
    target: { value: "high" },
  });

  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "Shopping" },
  });

  // 🟢 פתרון עובד לשדה תאריך:
  fireEvent.change(screen.getByPlaceholderText("📅 DD/MM/YYYY"), {
    target: { value: "01/08/2025" },
  });

  fireEvent.click(screen.getByText("+ Add"));

  expect(screen.getByText("Buy cheese")).toBeInTheDocument();
  expect(screen.getAllByText(/🛒 Shopping/).length).toBeGreaterThan(0);
});

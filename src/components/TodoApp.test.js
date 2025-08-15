import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoApp from "./TodoApp";

describe("TodoApp", () => {
  test("adds and displays a new task", () => {
    render(<TodoApp />);

    // כניסה לשדות לפי aria-label
    fireEvent.change(screen.getByLabelText(/task/i), {
      target: { value: "Buy cheese" },
    });

    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: "high" },
    });

    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Shopping" },
    });

    // ✅ שימוש נכון ב־aria-label לשדה התאריך
    const deadline = screen.getByLabelText(/deadline/i);
    fireEvent.change(deadline, { target: { value: "01/08/2025" } });

    // לחיצה על הכפתור "+ Add"
    fireEvent.click(screen.getByRole("button", { name: /\+\s*Add/i }));

    // בדיקות
    expect(screen.getByText("Buy cheese")).toBeInTheDocument();
    expect(screen.getAllByText(/🛒\s*Shopping/i).length).toBeGreaterThan(0);
  });
});

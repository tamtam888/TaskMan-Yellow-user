import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoApp from "./TodoApp";

// תאריך עתידי ל-<input type="date"> (חשוב: YYYY-MM-DD)
const futureISO = (days = 2) => {
  const d = new Date(Date.now() + days * 86400000);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

describe("TodoApp component", () => {
  test("adds a new task and displays it", () => {
    render(<TodoApp />);

    // לפי ה-placeholder המדויק שלך
    fireEvent.change(
      screen.getByPlaceholderText("🎮 What’s your next mission?"),
      { target: { value: "New Task" } }
    );

    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "high" },
    });

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Shopping" },
    });

    // לשדה date מזינים ISO ולא תאריך עבר
    fireEvent.change(screen.getByLabelText("Deadline"), {
      target: { value: futureISO(2) },
    });

    fireEvent.click(screen.getByText("+ Add"));

    // מוודאות שהמשימה הופיעה (לא תלויות בעיצוב)
    expect(screen.getByText("New Task")).toBeInTheDocument();
    // אם מוצג "🛒 Shopping" – זה יעבור; אחרת אפשר להחליף ל-/Shopping/i בלבד
    expect(screen.getAllByText(/🛒\s*Shopping/i).length).toBeGreaterThan(0);
  });
});

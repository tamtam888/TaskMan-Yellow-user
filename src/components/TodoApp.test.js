import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoApp from "./TodoApp";

// עוזר לפורמט DD/MM/YYYY
function formatDDMMYYYY(d) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

test("adds and displays a new task", async () => {
  render(<TodoApp />);

  // קלטים לפי aria-labels כפי שהגדרת בקומפוננטה
  fireEvent.change(screen.getByLabelText("Task"), {
    target: { value: "Buy cheese" },
  });

  fireEvent.change(screen.getByLabelText("Priority"), {
    target: { value: "high" },
  });

  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "Shopping" },
  });

  // תאריך עתידי (מחר) בפורמט DD/MM/YYYY
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  fireEvent.change(screen.getByPlaceholderText("📅 DD/MM/YYYY"), {
    target: { value: formatDDMMYYYY(tomorrow) },
  });

  // הוספה
  fireEvent.click(screen.getByRole("button", { name: /\+\s*add/i }));

  // המתנה להצגת המשימה
  const taskText = await screen.findByText("Buy cheese");
  expect(taskText).toBeInTheDocument();

  // וידוא קטגוריה בתוך אותו פריט (li)
  const li = taskText.closest("li");
  expect(li).toHaveTextContent(/Shopping/i);
});

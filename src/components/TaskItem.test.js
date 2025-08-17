import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskItem from "./TaskItem";

// עוזר להציג DD/MM/YYYY מה-ISO (לפי מה שאת מציגה)
const isoToDDMMYYYY = (iso) => {
  if (!iso || !iso.includes("-")) return iso;
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

describe("TaskItem component", () => {
  const sampleTask = {
    id: "1",
    text: "Buy cheese",
    priority: "high",
    completed: false,   // אם הקומפוננטה משתמשת ב-done זה לא פוגע
    done: false,
    date: "25/07/2025", // תאריך יצירה כפי שמוצג אצלך (DD/MM/YYYY)
    deadline: "2030-08-01", // ISO כדי שלא יחשב עבר; בתצוגה אמור להפוך ל-DD/MM/YYYY
    category: "Shopping",
  };

  const onToggleMock = jest.fn();
  const onDeleteMock = jest.fn();

  beforeEach(() => {
    render(
      <TaskItem
        task={sampleTask}
        onToggle={onToggleMock}       // אם השם אצלך onToggleDone – החליפי כאן
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

    // תאריך יצירה כפי שמופיע אצלך (DD/MM/YYYY)
    expect(screen.getByText("25/07/2025")).toBeInTheDocument();

    // דדליין: או טקסט "Deadline" + DD/MM/YYYY, או "Deadline: YYYY-MM-DD" – נתמוך בשניהם
    const ddmmyyyy = isoToDDMMYYYY(sampleTask.deadline);
    const deadlineRegexes = [
      new RegExp(`\\bDeadline\\b`, "i"),
      new RegExp(`${ddmmyyyy}`),
    ];
    // מחפשות בנפרד כדי לא להיות תלויות בדיוק בפורמט
    expect(screen.getByText(deadlineRegexes[0])).toBeInTheDocument();
    expect(screen.getByText(deadlineRegexes[1])).toBeInTheDocument();

    // קטגוריה עם עגלת קניות (אם מוצג כך אצלך)
    expect(screen.getByText(/🛒\s*Shopping/)).toBeInTheDocument();

    // אימוג׳י עדיפות גבוהה (😡) אם כך אצלך
    expect(screen.getByText("😡")).toBeInTheDocument();
  });

  test("calls onToggle when checkbox is clicked", () => {
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(onToggleMock).toHaveBeenCalledWith("1");
  });

  test("calls onDelete when delete button is clicked", () => {
    // אם כפתור המחיקה אצלך הוא 🗑️ כתוכן כפתור – זה יתפוס; אחרת אפשר לעבור ל-title="Delete"
    const deleteButton =
      screen.queryByRole("button", { name: "🗑️" }) ||
      screen.getByTitle(/delete/i);
    fireEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });

  test("does not show eating image if not eating", () => {
    const img = screen.queryByAltText("Eating");
    expect(img).not.toBeInTheDocument();
  });

  test("shows eating image when eatingTaskId matches", () => {
    // מרנדרים מחדש עם eatingTaskId תואם
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

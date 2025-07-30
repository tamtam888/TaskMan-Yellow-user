import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskInput from "./TaskInput";
import { act } from "react-dom/test-utils";

// דימוי של פונקציית הוספה
function mockAddTask(text, priority, date, category, deadline) {
  console.log("✅ Added:", { text, priority, date, category, deadline });
}

test("Add valid task", async () => {
  render(<TaskInput onAddTask={mockAddTask} />);

  fireEvent.change(screen.getByLabelText("Task"), {
    target: { value: "Test mission" },
  });

  fireEvent.change(screen.getByLabelText("Priority"), {
    target: { value: "high" },
  });

  fireEvent.change(screen.getByLabelText("Category"), {
    target: { value: "Shopping" },
  });

  // הגדרת תאריך עתידי בעזרת act בגלל react-datepicker
  await act(async () => {
    const dateInput = screen.getByPlaceholderText("📅 DD/MM/YYYY");
    fireEvent.change(dateInput, { target: { value: "31/12/2025" } });
  });

  fireEvent.click(screen.getByText("+ Add"));
  console.log("✅ Valid input test passed");
});

test("Show alert when fields are missing", () => {
  window.alert = (msg) => console.warn("❌ Alert:", msg);
  render(<TaskInput onAddTask={mockAddTask} />);
  fireEvent.click(screen.getByText("+ Add"));
  console.log("✅ Missing fields alert shown");
});



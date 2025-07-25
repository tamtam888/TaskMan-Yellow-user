import { render, screen, fireEvent } from "@testing-library/react";
import TaskInput from "./TaskInput";

// פונקציה מדומה
const mockAddTask = jest.fn();

describe("TaskInput", () => {
  beforeEach(() => {
    render(<TaskInput onAddTask={mockAddTask} />);
  });

  afterEach(() => {
    mockAddTask.mockClear(); // נקה קריאות בין טסטים
  });

  test("מזין טקסט ומוסיף משימה", () => {
    const input = screen.getByPlaceholderText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "לקנות גבינה צהובה" } });
    fireEvent.click(addButton);

    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "לקנות גבינה צהובה",
      })
    );
  });

  test("לא מוסיף משימה אם אין טקסט", () => {
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.click(addButton);

    expect(mockAddTask).not.toHaveBeenCalled();
  });
});

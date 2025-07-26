import { render, screen, fireEvent } from "@testing-library/react";
import TaskInput from "./TaskInput";

const mockAddTask = jest.fn();

beforeAll(() => {
  global.alert = jest.fn(); // למנוע שגיאת alert
});

describe("TaskInput", () => {
  beforeEach(() => {
    render(<TaskInput onAddTask={mockAddTask} />);
  });

  afterEach(() => {
    mockAddTask.mockClear();
  });

  test("fills all fields and adds a task", () => {
    fireEvent.change(screen.getByPlaceholderText("🎮 What’s your next mission?"), {
      target: { value: "Buy cheese" },
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

    expect(mockAddTask).toHaveBeenCalledWith(
      "Buy cheese",
      "high",
      expect.any(String),
      "Shopping",
      "2025-08-01"
    );
  });

  test("does not add task if required field is missing", () => {
    fireEvent.change(screen.getByPlaceholderText("🎮 What’s your next mission?"), {
      target: { value: "Incomplete" },
    });
    fireEvent.click(screen.getByText("+ Add"));

    expect(mockAddTask).not.toHaveBeenCalled();
  });
});

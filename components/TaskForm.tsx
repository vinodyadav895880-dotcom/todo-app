"use client";

import { useState } from "react";

import styles from "../app/page.module.css";

import {
  addTask,
  Task,
} from "../store/taskSlice";

import {
  useAppDispatch,
} from "../store/hooks";

export default function TaskForm() {

  // Input value
  const [task, setTask] =
    useState<string>("");

  // Error message
  const [error, setError] =
    useState<string>("");

  // Redux dispatch
  const dispatch = useAppDispatch();


  // Add Task
  const handleAddTask = () => {

    const trimmedTask =
      task.trim();

    // Empty validation
    if (trimmedTask === "") {

      setError(
        "Please enter a task."
      );

      return;
    }

    // Length validation
    if (trimmedTask.length < 3) {

      setError(
        "Task must be at least 3 characters."
      );

      return;
    }

    // Create new task
    const newTask: Task = {

      id: Date.now(),

      title: trimmedTask,

      completed: false,

    };

    // Add task to Redux
    dispatch(
      addTask(newTask)
    );

    // Clear input
    setTask("");

    // Clear error
    setError("");

  };


  // Input change
  const handleChange = (
    value: string
  ) => {

    setTask(value);

    // Remove error while typing
    if (error) {
      setError("");
    }

  };


  return (

    <div>

      {/* Input + Button */}

      <div className={styles.inputSection}>

        <input
          type="text"
          placeholder="Enter a new task..."
          value={task}
          onChange={(e) =>
            handleChange(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              handleAddTask();
            }

          }}
        />

        <button
          onClick={handleAddTask}
          disabled={
            task.trim() === ""
          }
        >
          Add Task
        </button>

      </div>


      {/* Error Message */}

      {error && (
        <p className={styles.formError}>
          {error}
        </p>
      )}

    </div>

  );
}
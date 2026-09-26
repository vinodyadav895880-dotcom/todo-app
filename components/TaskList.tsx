"use client";

import { Task } from "../store/taskSlice";

import TaskItem from "./TaskItem";

import styles from "../app/page.module.css";

type FilterType =
  | "all"
  | "active"
  | "completed";

type TaskListProps = {
  tasks: Task[];

  allTasksCount: number;

  search: string;

  filter: FilterType;

  onToggle: (id: number) => void;

  onEdit: (
    id: number,
    title: string
  ) => void;

  onDelete: (id: number) => void;
};

export default function TaskList({
  tasks,
  allTasksCount,
  search,
  filter,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {

  // =========================
  // No Tasks State
  // =========================

  if (allTasksCount === 0) {

    return (

      <div className={styles.emptyState}>

        <div className={styles.emptyIcon}>
          📝
        </div>

        <h3>
          No tasks yet
        </h3>

        <p>
          Add your first task to get started!
        </p>

      </div>

    );

  }


  // =========================
  // No Search/Filter Results
  // =========================

  if (tasks.length === 0) {

    if (search.trim() !== "") {

      return (

        <div className={styles.emptyState}>

          <div className={styles.emptyIcon}>
            🔍
          </div>

          <h3>
            No matching tasks
          </h3>

          <p>
            Try a different search term.
          </p>

        </div>

      );

    }


    if (filter === "completed") {

      return (

        <div className={styles.emptyState}>

          <div className={styles.emptyIcon}>
            🎯
          </div>

          <h3>
            No completed tasks
          </h3>

          <p>
            Complete a task and it will appear here.
          </p>

        </div>

      );

    }


    if (filter === "active") {

      return (

        <div className={styles.emptyState}>

          <div className={styles.emptyIcon}>
            🎉
          </div>

          <h3>
            All tasks completed!
          </h3>

          <p>
            Great job! You have no active tasks.
          </p>

        </div>

      );

    }

  }


  // =========================
  // Task List
  // =========================

  return (

    <div className={styles.taskList}>

      {tasks.map((task) => (

        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>

  );

}
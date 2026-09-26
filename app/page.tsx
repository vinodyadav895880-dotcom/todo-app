"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import styles from "./page.module.css";

import {
  deleteTask,
  editTask,
  setTasks,
  toggleTask,
  Task,
} from "../store/taskSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskStats from "../components/TaskStats";

type FilterType =
  | "all"
  | "active"
  | "completed";

export default function Home() {

  // =========================
  // Search State
  // =========================

  const [search, setSearch] =
    useState<string>("");


  // =========================
  // Filter State
  // =========================

  const [filter, setFilter] =
    useState<FilterType>("all");


  // =========================
  // Loading State
  // =========================

  const [isLoaded, setIsLoaded] =
    useState<boolean>(false);


  // =========================
  // Error State
  // =========================

  const [loadError, setLoadError] =
    useState<string>("");


  // =========================
  // Get Tasks From Redux
  // =========================

  const tasks = useAppSelector(
    (state) => state.tasks.tasks
  );


  // =========================
  // Redux Dispatch
  // =========================

  const dispatch = useAppDispatch();


  // =========================
  // Load Tasks From LocalStorage
  // =========================

  useEffect(() => {

    const savedTasks =
      localStorage.getItem("todoTasks");

    if (savedTasks) {

      try {

        const parsedTasks: Task[] =
          JSON.parse(savedTasks);

        dispatch(
          setTasks(parsedTasks)
        );

      } catch (error) {

        console.error(
          "Failed to load tasks:",
          error
        );

        setLoadError(
          "Unable to load your tasks."
        );

      }

    }

    setIsLoaded(true);

  }, [dispatch]);


  // =========================
  // Save Tasks To LocalStorage
  // =========================

  useEffect(() => {

    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "todoTasks",
      JSON.stringify(tasks)
    );

  }, [tasks, isLoaded]);


  // =========================
  // Toggle Task
  // =========================

  const handleToggleTask =
    useCallback(
      (id: number) => {

        dispatch(
          toggleTask(id)
        );

      },
      [dispatch]
    );


  // =========================
  // Delete Task
  // =========================

  const handleDeleteTask =
    useCallback(
      (id: number) => {

        dispatch(
          deleteTask(id)
        );

      },
      [dispatch]
    );


  // =========================
  // Edit Task
  // =========================

  const handleEditTask =
    useCallback(
      (
        id: number,
        title: string
      ) => {

        dispatch(
          editTask({
            id,
            title,
          })
        );

      },
      [dispatch]
    );


  // =========================
  // Total Tasks
  // =========================

  const totalTasks = useMemo(() => {

    return tasks.length;

  }, [tasks]);


  // =========================
  // Completed Tasks
  // =========================

  const completedTasks = useMemo(() => {

    return tasks.filter(
      (item) => item.completed
    ).length;

  }, [tasks]);


  // =========================
  // Active Tasks
  // =========================

  const activeTasks = useMemo(() => {

    return tasks.filter(
      (item) => !item.completed
    ).length;

  }, [tasks]);


  // =========================
  // Search + Filter
  // =========================

  const filteredTasks = useMemo(() => {

    return tasks.filter((item) => {

      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "all" ||
        (filter === "active" &&
          !item.completed) ||
        (filter === "completed" &&
          item.completed);

      return (
        matchesSearch &&
        matchesFilter
      );

    });

  }, [tasks, search, filter]);


  // =========================
  // Loading UI
  // =========================

  if (!isLoaded) {

    return (

      <main className={styles.container}>

        <div className={styles.todoCard}>

          <p className={styles.loadingMessage}>
            Loading tasks...
          </p>

        </div>

      </main>

    );

  }


  // =========================
  // Error UI
  // =========================

  if (loadError) {

    return (

      <main className={styles.container}>

        <div className={styles.todoCard}>

          <p className={styles.errorMessage}>
            ⚠️ {loadError}
          </p>

        </div>

      </main>

    );

  }


  // =========================
  // Main UI
  // =========================

  return (

    <main className={styles.container}>

      <div className={styles.todoCard}>

        {/* Heading */}

        <h1>
          To-Do App
        </h1>

        <p className={styles.subtitle}>
          Manage your daily tasks
        </p>


        {/* Search + Filters */}

        <TaskFilters
          search={search}
          filter={filter}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
        />


        {/* Add Task */}

        <TaskForm />


        {/* Task List */}

       <TaskList
  tasks={filteredTasks}
  allTasksCount={tasks.length}
  search={search}
  filter={filter}
  onToggle={handleToggleTask}
  onEdit={handleEditTask}
  onDelete={handleDeleteTask}
/>


        {/* Statistics */}

        <TaskStats
          totalTasks={totalTasks}
          activeTasks={activeTasks}
          completedTasks={completedTasks}
        />

      </div>

    </main>

  );
}
"use client";

import styles from "../app/page.module.css";

type FilterType = "all" | "active" | "completed";

type TaskFiltersProps = {
  search: string;
  filter: FilterType;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: FilterType) => void;
};

export default function TaskFilters({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: TaskFiltersProps) {
  return (
    <>
      {/* Search */}

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>


      {/* Filter Buttons */}

      <div className={styles.filterButtons}>

        <button
          className={
            filter === "all"
              ? styles.activeFilter
              : styles.filterButton
          }
          onClick={() =>
            onFilterChange("all")
          }
        >
          All
        </button>


        <button
          className={
            filter === "active"
              ? styles.activeFilter
              : styles.filterButton
          }
          onClick={() =>
            onFilterChange("active")
          }
        >
          Active
        </button>


        <button
          className={
            filter === "completed"
              ? styles.activeFilter
              : styles.filterButton
          }
          onClick={() =>
            onFilterChange("completed")
          }
        >
          Completed
        </button>

      </div>
    </>
  );
}
"use client";

import styles from "../app/page.module.css";

type TaskStatsProps = {
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
};

export default function TaskStats({
  totalTasks,
  activeTasks,
  completedTasks,
}: TaskStatsProps) {
  return (
    <div className={styles.statistics}>

      {/* Total Tasks */}

      <div className={styles.statBox}>

        <span className={styles.statNumber}>
          {totalTasks}
        </span>

        <span className={styles.statLabel}>
          Total
        </span>

      </div>


      {/* Active Tasks */}

      <div className={styles.statBox}>

        <span className={styles.statNumber}>
          {activeTasks}
        </span>

        <span className={styles.statLabel}>
          Active
        </span>

      </div>


      {/* Completed Tasks */}

      <div className={styles.statBox}>

        <span className={styles.statNumber}>
          {completedTasks}
        </span>

        <span className={styles.statLabel}>
          Completed
        </span>

      </div>

    </div>
  );
}
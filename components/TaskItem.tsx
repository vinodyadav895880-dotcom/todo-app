"use client";

import { memo, useState } from "react";

import { Task } from "../store/taskSlice";
import styles from "../app/page.module.css";

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
};

function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {

  // Edit mode
  const [isEditing, setIsEditing] =
    useState<boolean>(false);

  // Edit input value
  const [editTitle, setEditTitle] =
    useState<string>(task.title);

  // Delete confirmation mode
  const [isDeleting, setIsDeleting] =
    useState<boolean>(false);


  // Start editing
  const handleStartEdit = () => {

    setEditTitle(task.title);

    setIsEditing(true);

  };


  // Cancel editing
  const handleCancelEdit = () => {

    setEditTitle(task.title);

    setIsEditing(false);

  };


  // Save edited task
  const handleSaveEdit = () => {

    const trimmedTitle =
      editTitle.trim();

    if (trimmedTitle === "") {
      return;
    }

    onEdit(
      task.id,
      trimmedTitle
    );

    setIsEditing(false);

  };


  // Start delete confirmation
  const handleStartDelete = () => {

    setIsDeleting(true);

  };


  // Cancel delete confirmation
  const handleCancelDelete = () => {

    setIsDeleting(false);

  };


  // Confirm delete
  const handleConfirmDelete = () => {

    onDelete(task.id);

    setIsDeleting(false);

  };


  return (

    <div className={styles.taskItem}>

      {isDeleting ? (

        /* =========================
           DELETE CONFIRMATION
           ========================= */

        <div className={styles.deleteConfirmation}>

          <span className={styles.deleteMessage}>
            Are you sure you want to delete this task?
          </span>


          <div className={styles.actionButtons}>

            <button
              className={styles.confirmDeleteButton}
              onClick={handleConfirmDelete}
            >
              Delete
            </button>


            <button
              className={styles.cancelButton}
              onClick={handleCancelDelete}
            >
              Cancel
            </button>

          </div>

        </div>

      ) : isEditing ? (

        /* =========================
           EDIT MODE
           ========================= */

        <div className={styles.editMode}>

          <input
            className={styles.editInput}
            type="text"
            value={editTitle}
            onChange={(e) =>
              setEditTitle(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                handleSaveEdit();
              }

              if (e.key === "Escape") {
                handleCancelEdit();
              }

            }}
            autoFocus
          />


          <div className={styles.actionButtons}>

            <button
              className={styles.saveButton}
              onClick={handleSaveEdit}
            >
              Save
            </button>


            <button
              className={styles.cancelButton}
              onClick={handleCancelEdit}
            >
              Cancel
            </button>

          </div>

        </div>

      ) : (

        /* =========================
           NORMAL MODE
           ========================= */

        <>

          {/* Task Content */}

          <div className={styles.taskContent}>

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                onToggle(task.id)
              }
            />

            <span
              className={
                task.completed
                  ? styles.completed
                  : ""
              }
            >
              {task.title}
            </span>

          </div>


          {/* Action Buttons */}

          <div className={styles.actionButtons}>

            <button
              className={styles.editButton}
              onClick={handleStartEdit}
            >
              Edit
            </button>


            <button
              className={styles.deleteButton}
              onClick={handleStartDelete}
            >
              Delete
            </button>

          </div>

        </>

      )}

    </div>

  );
}

export default memo(TaskItem);
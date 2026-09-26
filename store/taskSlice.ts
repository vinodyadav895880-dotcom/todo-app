import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },

    toggleTask(state, action: PayloadAction<number>) {
      const task = state.tasks.find(
        (item) => item.id === action.payload
      );

      if (task) {
        task.completed = !task.completed;
      }
    },

    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(
        (item) => item.id !== action.payload
      );
    },

    editTask(
      state,
      action: PayloadAction<{
        id: number;
        title: string;
      }>
    ) {
      const task = state.tasks.find(
        (item) => item.id === action.payload.id
      );

      if (task) {
        task.title = action.payload.title;
      }
    },

    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  setTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
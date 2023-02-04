import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = [
  {
    id: "1",
    title: "test",
    description: "test",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2"],
    status: "Pending",
    comments: ["lorm epsom"],
  },
  {
    id: "2",
    title: "test2",
    description: "test2",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2"],
    status: "Processing",
    comments: ["lorm epsom"],
  },
  {
    id: "3",
    title: "test3",
    description: "test3",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2", "test3"],
    status: "Done",
    comments: ["lorm epsom"],
  },
];
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action: any) {
        state.push(action.payload);
      },
      prepare(title, description, date, labels, status) {
        return {
          payload: {
            id: nanoid(),
            date: date.toISOString() || new Date().toISOString(),
            title,
            labels: labels || [],
            description,
            status,
            comments: [],
          },
        };
      },
    },
    taskUpdated(state, action) {
      const { id, title, description, date, labels, status } = action.payload;
      const existingTask = state.find((task) => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.date = date;
        existingTask.labels = labels;
        existingTask.status = status;
      }
    },
    removeTask(state, { payload }) {
      const { taskId } = payload;
      return (state = state.filter(({ id }) => id !== taskId.toString()));
    },
  },
});

export const { taskAdded, taskUpdated, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;

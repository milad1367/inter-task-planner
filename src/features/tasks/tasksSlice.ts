import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  labels: string[];
  status: string;
  comments: string[];
  attachments: string[];
}
const initialState: any = [
  {
    id: "1",
    title: "test",
    description: "test",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["redux", "test2"],
    status: "Pending",
    comments: ["lorm epsom"],
    attachments: [],
  },
  {
    id: "2",
    title: "test2",
    description: "test2",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["saga", "test2"],
    status: "Processing",
    comments: ["lorm epsom"],
    attachments: [],
  },
  {
    id: "3",
    title: "test3",
    description: "test3",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2", "test3"],
    status: "Done",
    comments: ["lorm epsom"],
    attachments: [],
  },
  {
    id: "4",
    title: "test4",
    description: "test4",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2", "test3"],
    status: "Done",
    comments: ["lorm epsom"],
    attachments: [],
  },
];
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action: any) {
        state.push(action.payload); // Important note, redux toolkit hast internal Immer, so I can change state directly
      },
      prepare(title, description, date, labels, status, attachments) {
        return {
          payload: {
            id: nanoid(),
            date: date.toISOString() || new Date().toISOString(),
            title,
            labels: labels,
            description,
            status,
            comments: [],
            attachments: attachments,
          },
        };
      },
    },
    taskUpdated(state, action) {
      const { id, title, description, comment, attachments } = action.payload;
      const existingTask = state.find((task: any) => task.id === id);
      if (existingTask) {
        existingTask.title = title || existingTask.title;
        existingTask.description = description || existingTask.description;
        existingTask.attachments = attachments || existingTask.attachments;
        if (!!comment) {
          existingTask.comments.push(comment);
        }
      }
    },
    removeTask(state, { payload }) {
      const { taskId } = payload;
      return state.filter(({ id }: any) => id !== taskId.toString());
    },
    setTasks(state, { payload }) {
      const { newTasks } = payload;
      return newTasks;
    },
  },
});

export const { taskAdded, taskUpdated, removeTask, setTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;

import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { ITask } from "../../models";
const initialState: ITask[] = [
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

//IMPORTANT NOTE,
//With redux toolkit I can mutate state inside of any case of reducer function!
//https://redux-toolkit.js.org/usage/immer-reducers#redux-toolkit-and-immer
// As we know in redux old version we have to use something like Immer
//IMPORTANT NOTE,

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action: any) {
        state.push(action.payload);
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
      const existingTask = state.find((task: ITask) => task.id === id);
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
      return state.filter(({ id }) => id !== taskId.toString());
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

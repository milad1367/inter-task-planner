import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    title: "test",
    description: "test",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2"],
    status: "Pending",
    comments: ["lorm epsom"],
  },
  {
    title: "test2",
    description: "test2",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2"],
    status: "Processing",
    comments: ["lorm epsom"],
  },
  {
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
  reducers: {},
});

export default tasksSlice.reducer;

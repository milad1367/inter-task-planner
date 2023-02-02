import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    title: "test",
    description: "test",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2"],
    status: "Pending",
  },
  {
    title: "test2",
    description: "test2",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2"],
    status: "Processing",
  },
  {
    title: "test3",
    description: "test3",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    labels: ["test1", "test2", "test3"],
    status: "Done",
  },
];
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export default tasksSlice.reducer;

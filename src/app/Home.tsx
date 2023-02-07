import { AddTask } from "../features/tasks/addTask/AddTask";
import { Progress } from "../features/tasks/Progress";
import { Boards } from "../features/tasks/boards/Boards";
import Stack from "@mui/material/Stack";
import { SearchAndFilters } from "../features/tasks/SearchAndFilters";
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <Stack spacing={4}>
      <Progress />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <SearchAndFilters />
        <AddTask />
      </Stack>
      <Boards />
      <Outlet />
    </Stack>
  );
};

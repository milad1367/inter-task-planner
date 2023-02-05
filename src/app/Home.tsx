import { AddTask } from "../features/tasks/addTask/AddTask";
import { Progress } from "../features/tasks/Progress";
import { TaskList } from "../features/tasks/taskList/TaskList";
import Stack from "@mui/material/Stack";
import { SearchAndFilters } from "../features/tasks/SearchAndFilters";

export const Home = () => {
  return (
    <Stack spacing={4}>
      <Progress />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <SearchAndFilters />
        <AddTask />
      </Stack>
      <TaskList />
    </Stack>
  );
};

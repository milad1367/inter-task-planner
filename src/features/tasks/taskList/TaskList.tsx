import { useAppSelector } from "../../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { TaskBox } from "../TaskBox";

import { Grid, Box } from "@mui/material";

export const TaskList = () => {
  const [params] = useSearchParams();
  const filter = params.get("filter");
  const key = params.get("key") || "";

  const derivedTasks = (tasks: any) => {
    const pendingTasks = tasks.filter((task: any) => task.status === "Pending");
    const processingTasks = tasks.filter(
      (task: any) => task.status === "Processing"
    );
    const doneTasks = tasks.filter((task: any) => task.status === "Done");
    return { pendingTasks, processingTasks, doneTasks };
  };

  const filteredTasksSelector = createSelector(
    (state: any) => state.tasks,
    (tasks) => {
      if (!key && !filter) {
        return tasks;
      }
      return tasks?.filter((task: any) => {
        let isInTime = true;
        if (filter) {
          const taskDate = dayjs(task.date);
          const filterDate = dayjs(filter);

          isInTime = taskDate.isBefore(filterDate);
        }
        const picked = (({ title, description, labels }) => ({
          title,
          description,
          labels,
        }))(task);
        const hasKey = JSON.stringify(picked)
          .toLowerCase()
          .includes(key.toLowerCase());

        return hasKey && isInTime;
      });
    }
  );
  const tasks = useAppSelector(filteredTasksSelector);
  const { pendingTasks, processingTasks, doneTasks } = derivedTasks(tasks);

  const renderedPendingTasks = pendingTasks.map((task: any) => (
    <TaskBox {...task} key={task.id} />
  ));
  const renderedProcessingTasks = processingTasks.map((task: any) => (
    <TaskBox {...task} key={task.id} />
  ));
  const renderedDoneTasks = doneTasks.map((task: any) => (
    <TaskBox {...task} key={task.id} />
  ));
  return (
    <section>
      <h2>Tasks</h2>
      <Grid container spacing={{ xs: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4}>
          <Box bgcolor={"white"}>
            <div>
              Pending {pendingTasks.length} / {tasks.length}
            </div>
            {renderedPendingTasks}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box bgcolor={"white"}>
            <div>
              Processing {processingTasks.length} / {tasks.length}
            </div>
            {renderedProcessingTasks}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box bgcolor={"white"}>
            <div>
              Done {doneTasks.length} / {tasks.length}
            </div>
            {renderedDoneTasks}
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

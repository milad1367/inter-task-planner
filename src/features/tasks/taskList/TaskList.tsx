import { Chip, Stack, Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { removeTask } from "../tasksSlice";

export const TaskList = () => {
  const tasks = useSelector((state: any) => state.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnDelete = (taskId: string) => {
    dispatch(removeTask({ taskId }));
  };
  const renderedTasks = tasks.map((task: any) => (
    <div key={task.id}>
      <Grid container columnSpacing={{ xs: 12 }}>
        <Grid item xs={6}>
          Task
        </Grid>
        <Grid item xs={6}>
          <Grid container columnSpacing={{ xs: 12 }}>
            <Grid item xs={4}>
              <IconButton aria-label="move">
                <DriveFileMoveIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => navigate(`/tasks/${task.id}`)}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <IconButton
                onClick={() => handleOnDelete(task.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      Task:<h2>{task.title}</h2>
      Description:<h2>{task.description}</h2>
      Labels:
      <Stack direction="row" spacing={1}>
        {task.labels.map((label: any, index: number) => (
          <Chip key={index} label={label} color="primary" />
        ))}
      </Stack>
    </div>
  ));
  return (
    <section>
      <h2>Tasks</h2>
      {renderedTasks}
    </section>
  );
};

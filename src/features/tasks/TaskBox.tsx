import { Chip, Stack, Grid, IconButton, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useSearchParams } from "react-router-dom";
import { removeTask } from "./tasksSlice";
import { HighlightText } from "../../components/HighlightText";

export const TaskBox = ({
  id,
  title,
  description,
  labels,
  attachments,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [params] = useSearchParams();
  const key = params.get("key") || "";
  const handleOnDelete = (taskId: string) => {
    dispatch(removeTask({ taskId }));
  };

  return (
    <div>
      <Grid bgcolor={"#ff00005e"} item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            Task
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={4}>
                <IconButton aria-label="move">
                  <DriveFileMoveIcon />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <IconButton
                  onClick={() => navigate(`/tasks/${id}`)}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <IconButton
                  onClick={() => handleOnDelete(id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        Task:
        <h2>
          <HighlightText searchText={key}>{title}</HighlightText>
        </h2>
        Description:
        <h2>
          <HighlightText searchText={key}>{description}</HighlightText>
        </h2>
        Labels:
        <Stack direction="row" spacing={1}>
          {labels.map((label: any, index: number) => (
            <Chip
              key={index}
              label={
                <HighlightText
                  searchText={key}
                  key={`label-highlight-text-${index}`}
                >
                  {label}
                </HighlightText>
              }
              color="primary"
            />
          ))}
        </Stack>
        {!!attachments.length && (
          <Button onClick={() => navigate(`/tasks/${id}`)} size="large">
            VIEW ATTACHMENTS
          </Button>
        )}
      </Grid>
    </div>
  );
};

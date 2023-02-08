import { Chip, Grid, IconButton, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useSearchParams } from "react-router-dom";
import { removeTask } from "./tasksSlice";
import { HighlightText } from "../../components/HighlightText";
import styled from "styled-components";
import { mdColors } from "../../utils";

const Container = styled.div`
  border-radius: 5px;
  border: 1px solid #c7d0d5;
`;

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
    <Container>
      <Grid sx={{ px: 2, bgcolor: "#ff00005e" }} item xs={12}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={6}>
            Task
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid
                item
                xs={4}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <IconButton aria-label="move">
                  <DriveFileMoveIcon />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={4}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <IconButton
                  onClick={() => navigate(`/tasks/${id}`)}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={4}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
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
      <Grid item xs={12} p={2}>
        Task:
        <h2>
          <HighlightText searchText={key}>{title}</HighlightText>
        </h2>
        Description:
        <h2>
          <HighlightText searchText={key}>{description}</HighlightText>
        </h2>
        <Typography> Labels:</Typography>
        <Grid container spacing={1}>
          {labels.map((label: any, index: number) => (
            <Grid key={index} item>
              <Chip
                sx={{ backgroundColor: mdColors[index] }}
                label={
                  <HighlightText
                    searchText={key}
                    key={`label-highlight-text-${index}`}
                  >
                    {label}
                  </HighlightText>
                }
              />
            </Grid>
          ))}
        </Grid>
        {!!attachments.length && (
          <Button onClick={() => navigate(`/tasks/${id}`)} size="large">
            VIEW ATTACHMENTS
          </Button>
        )}
      </Grid>
    </Container>
  );
};

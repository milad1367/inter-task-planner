import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Grid,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { taskUpdated } from "./tasksSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Upload } from "../../components/Upload";
import { mdColors } from "../../utils";
import { Comments } from "../../components/Comments";
import { RootState } from "../../app/store";
import { ITask } from "../../models";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  width: 400,
  minHeight: "80vh",
  maxHeight: "80vh",
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
export interface EditTaskState {
  title: string;
  description: string;
  comment: string;
}
export const SingleTaskForm = () => {
  const [open, setOpen] = useState(true);
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, description, status, comments, attachments, date, labels } =
    useSelector<RootState, ITask | any>((state) =>
      state.tasks.find((task) => task.id === taskId)
    );
  const [editedTask, setEditedTask] = useState<EditTaskState>({
    title,
    description,
    comment: "",
  });

  const onResetStates = () => {
    setEditedTask((prev) => ({ ...prev, comment: "", attachment: "" }));
  };
  const handleClose = () => {
    setOpen(false);
    onResetStates();
    navigate("/");
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    if (name) {
      setEditedTask((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onUpdateTask = (e: any) => {
    const name: string = e.target.name;

    dispatch(
      taskUpdated({
        id: taskId,
        [name]: editedTask[name as keyof EditTaskState],
      })
    );
    if (name === "comment") {
      setEditedTask((prev) => ({ ...prev, comment: "" }));
    }
    //onResetStates();
  };
  const onUploadFile = (attachments: string[]) => {
    dispatch(
      taskUpdated({
        id: taskId,
        attachments,
      })
    );
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Task
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-title">Title</InputLabel>
              <OutlinedInput
                name="title"
                value={editedTask?.title}
                onChange={handleOnChange}
                id="outlined-adornment-title"
                label="Title"
                endAdornment={
                  <>
                    {editedTask?.title !== title && (
                      <Button
                        disableRipple
                        name={"title"}
                        id="title-save-button"
                        onClick={onUpdateTask}
                        color="success"
                      >
                        Save
                      </Button>
                    )}
                  </>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-description">
                Description
              </InputLabel>
              <OutlinedInput
                name="description"
                id="outlined-adornment-description"
                label="Description"
                onChange={handleOnChange}
                value={editedTask?.description}
                endAdornment={
                  <>
                    {editedTask.description !== description && (
                      <Button
                        disableRipple
                        name="description"
                        id="description-save-button"
                        onClick={onUpdateTask}
                        color="success"
                      >
                        Save
                      </Button>
                    )}
                  </>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <OutlinedInput value={date} disabled />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <Typography variant="h6" component="h6">
                Labels:
              </Typography>
              <Grid container spacing={1}>
                {labels.map((label: string, index: number) => (
                  <Grid key={index} item>
                    <Chip
                      sx={{ backgroundColor: mdColors[index] }}
                      label={label}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="status-select"
                value={status}
                disabled
                label="Status"
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Processing"}>Processing</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <Upload list={attachments} onChange={onUploadFile} />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <OutlinedInput
                name="comment"
                type="text"
                onChange={handleOnChange}
                value={editedTask.comment}
                placeholder="Add your comment"
                endAdornment={
                  <>
                    {!!editedTask.comment && (
                      <Button
                        disableRipple
                        name="comment"
                        id="comment-save-button"
                        onClick={onUpdateTask}
                        color="success"
                      >
                        Save
                      </Button>
                    )}
                  </>
                }
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Comments:
              </Typography>
              <Comments items={comments} />
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { taskUpdated } from "./tasksSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Upload } from "../../components/upload/Upload";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  height: "90%",
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
const _labels = ["test1", "test2"]; //TODO

export const SingleTaskForm = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state: any) =>
    state.tasks.find((task: any) => task.id === taskId)
  );

  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [date, setDate] = useState<Dayjs>(task.date);
  const [comment, setComment] = useState<string>("");
  const [labels, setLabels] = useState(task.labels);
  const [attachments, setAttachments] = useState<string[]>(
    task?.attachments || []
  );
  const onResetStates = () => {
    setComment("");
  };
  const handleClose = () => {
    setOpen(false);
    onResetStates();
    navigate("/");
  };
  const handleSelectChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue || dayjs());
  };
  const dispatch = useDispatch();

  const onUpdateTask = () => {
    dispatch(
      taskUpdated({
        id: taskId,
        title,
        description,
        comment,
        attachments,
      })
    );
    onResetStates();
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
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                id="outlined-adornment-title"
                label="Title"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-description">
                Description
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-description"
                label="Description"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                onChange={(e: any) => setComment(e.target.value)}
                value={comment}
                placeholder="Add your comment"
                multiline
                rows={2}
                maxRows={4}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <Upload
                list={attachments}
                onChange={(attachments: string[]) =>
                  setAttachments(attachments)
                }
                titleButton={"Add Attachment"}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={date}
                  disabled
                  onChange={handleDateChange}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="status-select"
                value={status}
                disabled
                label="Status"
                onChange={handleSelectChange}
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Processing"}>Processing</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={_labels}
                getOptionLabel={(option) => option}
                value={labels}
                disabled
                onChange={(event, newValue) => {
                  setLabels([...newValue]);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Labels"
                    placeholder="Favorites"
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <Button
                onClick={onUpdateTask}
                fullWidth
                variant="contained"
                color="success"
              >
                Save
              </Button>
            </FormControl>
            <div>
              comments:
              {task.comments.map((comment: string) => (
                <div> {comment} </div>
              ))}
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

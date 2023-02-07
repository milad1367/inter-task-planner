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
import React from "react";
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

  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const [status, setStatus] = React.useState(task.status);
  const [date, setDate] = React.useState<Dayjs>(task.date);

  const [labels, setLabels] = React.useState(task.labels);
  const [attachments, setAttachments] = React.useState<string[]>(
    task?.attachments || []
  );
  const handleClose = () => {
    setOpen(false);
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
        date: dayjs(date).toISOString(), //TODO, IT CAN BE IN PREPARE
        labels,
        status,
        attachments,
      })
    );
    navigate("/");
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
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={date}
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
                onChange={(event, newValue) => {
                  //   const values = newValue.map((item) => item.title);
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
            <FormControl sx={{ m: 1 }}>
              <Upload
                list={attachments}
                onChange={(attachments: string[]) =>
                  setAttachments(attachments)
                }
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
          </Box>
        </Box>
      </Modal>
    </>
  );
};

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
import { taskAdded } from "../tasksSlice";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
const _labels = ["test1", "test2"];
export const AddTask = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  const [labels, setLabels] = React.useState([_labels[0]]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSelectChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };
  const dispatch = useDispatch();

  const onAddedTask = () => {
    dispatch(taskAdded(title, description, date, labels, status));
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Add Task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new Task
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
                <MenuItem value={1}>Pending</MenuItem>
                <MenuItem value={2}>Processing</MenuItem>
                <MenuItem value={3}>Done</MenuItem>
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
                onClick={onAddedTask}
                fullWidth
                variant="contained"
                color="success"
              >
                Add
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
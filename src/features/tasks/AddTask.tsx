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
  Grid,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { taskAdded } from "./tasksSlice";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { labelsSrc, taskStatus } from "../../utils";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Upload } from "../../components/Upload";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: "80vh",
  maxHeight: "80vh",
  overflow: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
export const AddTask = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [labels, setLabels] = useState<string[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle(""); //TODO, change to useReducer, as a object
    setDescription("");
    setDate(null);
    setStatus("");
    //...
  };
  const handleSelectChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };
  const dispatch = useDispatch();

  const handleOnAddedTask = (event: any) => {
    event.preventDefault();
    dispatch(taskAdded(title, description, date, labels, status, attachments));
    handleClose();
  };
  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        <AddOutlinedIcon /> Add Task
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
          <form onSubmit={handleOnAddedTask}>
            <Grid sx={{ minHeight: "580px", height: "100%" }} container>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-title">
                  Title
                </InputLabel>
                <OutlinedInput
                  value={title}
                  onChange={(e: any) => setTitle(e.target.value)}
                  id="outlined-adornment-title"
                  label="Title"
                  required
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
                    renderInput={(params: any) => (
                      <TextField required {...params} />
                    )}
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
                  required
                  onChange={handleSelectChange}
                >
                  {taskStatus.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={labelsSrc}
                  getOptionLabel={(option) => option}
                  onChange={(event, newValue) => {
                    setLabels([...newValue]);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Labels"
                      placeholder="Label"
                    />
                  )}
                />
              </FormControl>
              <FormControl sx={{ m: 1 }}>
                <Upload
                  onChange={(attachments: string[]) =>
                    setAttachments(attachments)
                  }
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1, justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  Add
                </Button>
              </FormControl>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

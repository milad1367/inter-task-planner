import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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

export const SearchAndFilters = () => {
  let [params, setParams] = useSearchParams();
  const filter = params.get("filter");
  const defaultDate = filter ? dayjs(filter) : null;
  const key = params.get("key");
  const [search, setSearch] = useState(key || "");
  const [date, setDate] = useState<Dayjs | null>(defaultDate);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };
  const onFilterTasks = () => {
    let params = {};
    if (search) {
      params = { ...params, key: search };
    }
    if (date) {
      params = { ...params, filter: date.format() };
    }
    setParams(params); // TODO NEED MORE SAFE WAY! //http://localhost:3000/?filter=2023-02-03T22%3A39%3A00.000Z
    handleClose();
  };
  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        <ImageSearchOutlinedIcon />
        Search & Filter
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search & Filter
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-title">Search</InputLabel>
              <OutlinedInput
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                id="outlined-adornment-search"
                label="Search"
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <Button
                onClick={onFilterTasks}
                fullWidth
                variant="contained"
                color="success"
              >
                Apply
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

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
  const [_startDate, _endDate] = params.getAll("filter");

  const key = params.get("key");
  const [search, setSearch] = useState(key || "");
  const [startDate, setStartDate] = useState<Dayjs | null>(
    _startDate ? dayjs(_startDate) : null
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    _endDate ? dayjs(_endDate) : null
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };
  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };

  const onFilterTasks = (e: any) => {
    e.preventDefault();
    let _params = {};

    if (search) {
      _params = { ..._params, key: search };
    }
    if (startDate && endDate) {
      _params = { ..._params, filter: [startDate.format(), endDate.format()] };
    }
    setParams(_params);
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
            <form onSubmit={onFilterTasks}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-title">
                  Search
                </InputLabel>
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
                    label="Start date"
                    value={startDate}
                    maxDateTime={endDate ? endDate : undefined}
                    onChange={handleStartDateChange}
                    renderInput={(params: any) => (
                      <TextField required={!!endDate} {...params} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    minDateTime={startDate ? startDate : undefined}
                    renderInput={(params: any) => (
                      <TextField required={!!startDate} {...params} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  Apply
                </Button>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

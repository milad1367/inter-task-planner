import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RootState } from "../../app/store";
import { ITask } from "../../models";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { percentage } from "../../utils";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export const Progress = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const numberOfDoneTasks = tasks.filter(
    (task: ITask) => task.status === "Done"
  ).length;
  const percentOfDone = percentage(numberOfDoneTasks, Number(tasks.length));
  return (
    <Box sx={{ p: 2, background: "white" }}>
      <Stack spacing={1}>
        <Typography variant="h6" component="h6">
          Progress(all Done tasks, without filter)
        </Typography>
        <div>{`${percentOfDone}% (Done ${numberOfDoneTasks} out of ${tasks.length})`}</div>
        <BorderLinearProgress variant="determinate" value={percentOfDone} />
      </Stack>
    </Box>
  );
};

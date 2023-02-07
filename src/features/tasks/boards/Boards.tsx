import { useAppSelector } from "../../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { DragDropContext } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";
import { groupBy } from "lodash";
import { Grid } from "@mui/material";
import { TaskBoard } from "../TaskBoard";
import { useDispatch } from "react-redux";
import { setTasks } from "../tasksSlice";
import { removeByIndex, reorder } from "../../../utils";

export const Boards = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const filter = params.get("filter");
  const key = params.get("key") || "";

  const filteredTasksSelector = createSelector(
    (state: any) => state.tasks,
    (tasks) => {
      if (!key && !filter) {
        return tasks;
      }
      return tasks?.filter((task: any) => {
        let isInTime = true;
        if (filter) {
          const taskDate = dayjs(task.date);
          const filterDate = dayjs(filter);

          isInTime = taskDate.isBefore(filterDate);
        }
        const picked = (({ title, description, labels }) => ({
          title,
          description,
          labels,
        }))(task);
        const hasKey = JSON.stringify(picked)
          .toLowerCase()
          .includes(key.toLowerCase());

        return hasKey && isInTime;
      });
    }
  );
  const tasks = useAppSelector(filteredTasksSelector);

  const onDragEnd = (res: DropResult) => {
    // TODO WRAP IN USECALLBACK
    const { source, destination } = res;
    if (!destination) return;
    const itemsSplitByListIds = groupBy(tasks, (task: any) => {
      return task.status;
    });

    if (source.droppableId === destination.droppableId) {
      // Items are in the same list, so just re-order the list array
      const target = itemsSplitByListIds[destination.droppableId];
      const reordered: any = reorder<any>(
        [...target],
        source.index,
        destination.index
      );

      // Get rid of old list and replace with updated one
      const filteredCards = tasks.filter(
        (task: any) => task.status !== source.droppableId
      );
      return dispatch(setTasks({ newTasks: [...filteredCards, ...reordered] }));
    }

    // Items are in different lists, so just change the item's listId

    const sourceItems = tasks.filter(
      (task: any) => task.status === source.droppableId
    );
    const sourceWithoutDragged = removeByIndex(sourceItems, source.index);

    const target = tasks.filter(
      (task: any) => task.status === destination.droppableId
    );

    const itemWithNewId = {
      ...sourceItems[source.index],
      status: destination.droppableId,
    };

    target.splice(destination.index, 0, itemWithNewId);

    const filteredTasks = tasks.filter(
      (task: any) =>
        task.status !== source.droppableId &&
        task.status !== destination.droppableId
    );

    dispatch(
      setTasks({
        newTasks: [...filteredTasks, ...sourceWithoutDragged, ...target],
      })
    );
  };
  const boards = ["Pending", "Processing", "Done"];
  return (
    <section>
      <h2>Boards</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {boards.map((board: string) => (
            <Grid key={board} item xs={4}>
              <TaskBoard
                title={board}
                tasks={tasks.filter((item: any) => item.status === board)}
                tasksType={board}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </section>
  );
};

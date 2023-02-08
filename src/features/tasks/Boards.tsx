import { useAppSelector } from "../../app/hooks";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { DragDropContext } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";
import { groupBy } from "lodash";
import { Grid } from "@mui/material";
import { TaskBoard } from "./TaskBoard";
import { useDispatch } from "react-redux";
import { setTasks } from "./tasksSlice";
import { removeByIndex, reorder } from "../../utils";
import { useCallback, useMemo } from "react";
import { RootState } from "../../app/store";
import { ITask } from "../../models";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const Boards = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const [startDate, endDate] = params.getAll("filter");
  const key = params.get("key") || "";
  const tasks = useAppSelector((state: RootState) => state.tasks);

  const filteredTasks = useMemo(() => {
    if (!key && (!startDate || !endDate)) {
      return tasks;
    }
    return tasks?.filter((task: ITask) => {
      let isInTimeRange = true;
      if (startDate && endDate) {
        const taskDate = dayjs(task.date);
        isInTimeRange =
          taskDate.isSameOrAfter(dayjs(startDate)) &&
          taskDate.isSameOrBefore(dayjs(endDate));
      }
      const picked = (({ title, description, labels }) => ({
        title,
        description,
        labels,
      }))(task);
      const searchFilter = !!key
        ? JSON.stringify(Object.values(picked))
            .toLowerCase()
            .includes(key.toLowerCase())
        : true;
      return searchFilter && isInTimeRange;
    });
  }, [tasks, key, startDate, endDate]);

  const onDragEnd = useCallback(
    (res: DropResult) => {
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
          (task: ITask) => task.status !== source.droppableId
        );
        return dispatch(
          setTasks({ newTasks: [...filteredCards, ...reordered] })
        );
      }

      // Items are in different lists, so just change the item's listId

      const sourceItems = tasks.filter(
        (task: ITask) => task.status === source.droppableId
      );
      const sourceWithoutDragged = removeByIndex(sourceItems, source.index);

      const target = tasks.filter(
        (task: ITask) => task.status === destination.droppableId
      );

      const itemWithNewId = {
        ...sourceItems[source.index],
        status: destination.droppableId,
      };

      target.splice(destination.index, 0, itemWithNewId);

      const filteredTasks = tasks.filter(
        (task: ITask) =>
          task.status !== source.droppableId &&
          task.status !== destination.droppableId
      );

      dispatch(
        setTasks({
          newTasks: [...filteredTasks, ...sourceWithoutDragged, ...target],
        })
      );
    },
    [tasks, dispatch]
  );
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
                tasks={filteredTasks.filter(
                  (item: ITask) => item.status === board
                )}
                tasksType={board}
                allTasksLength={tasks.length}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </section>
  );
};

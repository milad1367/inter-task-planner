import { TaskBox } from "./TaskBox";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { percentage } from "../../utils";

const Container = styled.div`
  padding: 5px;
  box-sizing: border-box;
  margin-left: 5px;
  border-radius: 5px;
  background: white;
`;
export const TaskBoard = ({
  title,
  tasks,
  tasksType,
  allTasksLength,
}: {
  title: string;
  tasks: any;
  tasksType: string;
  allTasksLength: number;
}) => {
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: "white",
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "5px",

    ...draggableStyle,
  });
  const getListStyle = (isDraggingOver: boolean) => ({
    minHeight: 350,
  });
  return (
    <Container>
      <Typography fontWeight={"bold"} textAlign={"center"}>
        {title}({tasks.length} / {allTasksLength}) (
        {percentage(tasks.length, allTasksLength)}%)
      </Typography>
      <Droppable droppableId={tasksType}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <>
              {tasks.map((task: any, index: number) => (
                <Draggable key={task.id} index={index} draggableId={task.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <TaskBox {...task} key={task.id} />
                    </div>
                  )}
                </Draggable>
              ))}
            </>

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
};

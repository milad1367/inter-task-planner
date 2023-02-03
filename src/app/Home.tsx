import { AddTask } from "../features/tasks/addTask/AddTask";
import { TaskList } from "../features/tasks/taskList/TaskList";

export const Home = () => {
  return (
    <div>
      <div>Progress</div>

      <div>
        <AddTask />
        <div>Search and filter</div>
      </div>
      <TaskList />
    </div>
  );
};

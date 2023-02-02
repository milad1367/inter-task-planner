import { TaskList } from "../features/tasks/taskList/TaskList";

export const Home = () => {
  return (
    <div>
      <div>Progress</div>
      <div>
        <div>Add Task </div>
        <div>Search and filter</div>
        <TaskList />
      </div>
    </div>
  );
};

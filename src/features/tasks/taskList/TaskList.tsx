import { useSelector } from "react-redux";

export const TaskList = () => {
  const tasks = useSelector((state: any) => state.tasks);
  const renderedTasks = tasks.map((task: any) => (
    <div key={task.id}>
      <h2>{task.title}</h2>
    </div>
  ));
  return (
    <section>
      <h2>Tasks</h2>
      {renderedTasks}
    </section>
  );
};

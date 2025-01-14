
export default function TodoStatus({ todos }) {
  const completedTodos = todos.filter((todo) => todo.done).length;
  const totalTodos = todos.length;

  return (
    <div className="todo-status">
      {completedTodos} / {totalTodos} tâches réalisées
    </div>
  );
}

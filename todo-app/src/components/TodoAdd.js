import React, { useState } from 'react';

function TodoAdd({ onAddTodo }) {
  const [task, setTask] = useState('');

  const handClick = (e) => {
    if (task.trim()) {
      onAddTodo(task);
      setTask('');
    }
  };

  return (
    <div className="todo-add">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Ajouter une nouvelle tâche"
      />
      <button onClick={handClick}>Ajouter</button>
    </div>
  );
}

export default TodoAdd;
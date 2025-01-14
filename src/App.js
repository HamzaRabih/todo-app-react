import React, { useState } from 'react';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';
import TodoStatus from './components/TodoStatus';
import './App.css';

export default function App() {
  const initialTodos = [
    { id: 1, task: "faire  A", done: false },
    { id: 2, task: "faire B", done: false },
    { id: 3, task: "faire quelque chose C", done: true },
    { id: 4, task: "faire quelque chose D", done: false },
    { id: 5, task: "faire quelque chose E", done: false },
  ];

  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (task) => {
    const newTodo = {
      id: Math.max(...todos.map(t => t.id)) + 1, 
      task,
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoAdd onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} />
      <TodoStatus todos={todos} />
    </div>
  );
}

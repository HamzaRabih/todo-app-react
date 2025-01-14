## Application de tâches

<image src="./capture/Capture2.png"/>

Pour créer une application de gestion de tâches avec `create-react-app`.

### 1. Installer `create-react-app`

Si vous ne l'avez pas déjà fait, commencez par installer `create-react-app` :

```bash
npx create-react-app todo-app
cd todo-app
```
### 2. Structure de l'application

<image src="./capture/Capture1.png"/>

### 3. Structure des fichiers

Voici une structure de fichiers possible pour votre application :

```
src/
├── components/
│   ├── TodoAdd.js
│   ├── TodoList.js
│   ├── Todo.js
│   └── TodoStatus.js
├── App.js
├── App.css
├── index.js
└── index.css
```

### 3. Créer les composants

#### `TodoAdd.js`

Ce composant permet d'ajouter une nouvelle tâche.

```javascript
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
```

#### `TodoList.js`

Ce composant affiche la liste des tâches.

```javascript
import React from 'react';
import Todo from './Todo';

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

```

#### `Todo.js`

Ce composant représente une tâche individuelle.

```javascript
export default function Todo({ todo, onToggleTodo, onDeleteTodo }) {
  function handleToggle() {
    onToggleTodo(todo.id)
  }
  return (
    <li >
      <button onClick={() => onDeleteTodo(todo.id)}> X </button>
      
        <label for={todo.id} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
          {todo.task}
        </label>
      
      <input
        id={todo.id}
        type="checkbox"
        checked={todo.done}
        onChange={handleToggle}
      />

    </li>
  );
}

```

#### `TodoStatus.js`

Ce composant affiche le nombre de tâches réalisées par rapport au nombre total de tâches.

```javascript
import React from 'react';

export default function TodoStatus({ todos }) {
  const completedTodos = todos.filter((todo) => todo.done).length;
  const totalTodos = todos.length;

  return (
    <div className="todo-status">
      {completedTodos} / {totalTodos} tâches réalisées
    </div>
  );
}

```

### 4. `App.js`

Le composant principal `App` qui gère l'état global des tâches.

```javascript
import React, { useState } from 'react';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';
import TodoStatus from './components/TodoStatus';
import './App.css';

function App() {
  const initialTodos = [
    { id: 1, task: "faire qque chose A", done: false },
    { id: 2, task: "faire qque chose B", done: false },
    { id: 3, task: "faire qque chose C", done: true },
    { id: 4, task: "faire qque chose D", done: false },
    { id: 5, task: "faire qque chose E", done: false },
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

export default App;
```

### 5. `index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />,document.getElementById('root'));
```

### 6. Lancer l'application

Enfin, lancez l'application avec :

```bash
npm start
```


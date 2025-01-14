## 📋 Application de tâches "To-Do" avec React.js
Cette application "To-Do" est une solution simple, élégante et fonctionnelle pour gérer vos tâches quotidiennes. Développée avec React.js, elle met en avant des fonctionnalités essentielles pour organiser efficacement votre liste de tâches.

<image src="./capture/Capture2.png"/>

# 📚 Table des matières
1. [Fonctionnalités](#-fonctionnalités)
2. [Technologies utilisées](#-technologies-utilisées)
3. [Objectifs du projet](#-objectifs-du-projet)
4. [Structure du projet](#-structure-du-projet)
   - [4.1 Structure de l'application](#41-structure-de-lapplication)
   - [4.2 Structure des fichiers](#42-structure-des-fichiers)
5. [Création de l'application](#-création-de-lapplication)
   - [5.1 Installer `create-react-app`](#51-installer-create-react-app)
   - [5.2 Créer les composants](#52-créer-les-composants)
     - [5.2.1 Composant TodoAdd](#521-composant-todoadd)
     - [5.2.2 Composant TodoList](#522-composant-todolist)
     - [5.2.3 Composant Todo](#523-composant-todo)
     - [5.2.4 Composant TodoStatus](#524-composant-todostatus)
   - [5.3 Composant principal App](#53-composant-principal-app)
   - [5.4 `index.js`](#54-indexjs)
6. [Lancer l'application](#6-lancer-lapplication)

## 🚀 Fonctionnalités
- **Ajouter des tâches** : Ajoutez rapidement de nouvelles tâches à votre liste.
- **Cocher/Décocher les tâches** : Marquez une tâche comme terminée ou remettez-la en cours.
- **Supprimer des tâches** : Supprimez les tâches terminées ou non pertinentes en un clic.
- **Statistiques en direct** : Visualisez le nombre total de tâches et celles complétées.


## 🛠️ Technologies utilisées
- **React.js** : Une bibliothèque JavaScript pour construire des interfaces utilisateur dynamiques.
- **CSS** : Style moderne et responsive pour une meilleure expérience utilisateur.

## 🎯 Objectifs du projet
- Fournir une base simple pour apprendre et explorer les concepts fondamentaux de React.js, comme les composants, états et props.
- Proposer une interface utilisateur minimaliste et conviviale pour gérer des tâches.

## 4 📂 Structure du projet

### 4.1 Structure de l'application

<image src="./capture/Capture1.png"/>

### 4.2 Structure des fichiers

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

## 5. Création de l'application

### 5.1. Installer `create-react-app`

Pour créer une application de gestion de tâches avec `create-react-app`.

Si vous ne l'avez pas déjà fait, commencez par installer `create-react-app` :

```bash
npx create-react-app todo-app
cd todo-app
```

### 5.2. Créer les composants

#### 5.2.1.  `TodoAdd.js`

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

#### 5.2.2 `TodoList.js`

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

#### 5.2.3. `Todo.js`

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

#### 5.2.4. `TodoStatus.js`

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

### 5.3 `App.js`

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

### 5.4 `index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />,document.getElementById('root'));
```

## 6. Lancer l'application

Enfin, lancez l'application avec :

```bash
npm start
```


import React, { useState, useCallback } from "react";
import "./TodoList.css";

// Separate TodoItem component for cleaner structure
const TodoItem = React.memo(({ todo, onDelete }) => (
  <li className="todo-item">
    <span>{todo}</span>
    <button onClick={onDelete}>X</button>
  </li>
));

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = useCallback(() => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      setTodos((prevTodos) => [...prevTodos, trimmedInput]);
      setInput("");
    }
  }, [input]);

  const deleteTodo = useCallback((index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onDelete={() => deleteTodo(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

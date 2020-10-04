import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./Todo.css"

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const addTodo = () => {
    if (!todoText.trim()) {
      return;
    }
    const todoObj = {
      id: uuid(),
      text: todoText,
      isCompleted: false,
      isEditing: false
    };
    setTodos([...todos, todoObj]);
    setTodoText("");
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const setEditMode = (todo, bool) => {
    if (bool) {
      setEditingMode(true)
      setEditValue(todo.text)
    }
    else {
      setEditingMode(false)
    }
    const newTodos = todos.map(item => {
      if (item.id === todo.id) {
        item.isEditing = bool
        item.text = editValue
      }
      return item;
    })
    setTodos(newTodos)
  }

  const markComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = true;
        }
        return todo;
      })
    );
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2.5vh 0vw",
        }}
      >
        <div>
          <input
            type="text"
            className="input"
            value={todoText}
            placeholder="Press 'Enter' or Click 'Add' to add todo"
            onChange={(e) => setTodoText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo()
              }
            }}
          ></input>
        </div>
        <div style={{ margin: "0px 10px", cursor: 'pointer' }}>
          <input className="inputBtn btn" type="button" value="ADD" onClick={addTodo}></input>
        </div>
      </div>
      {todos.map((todo, index) => {
        return (
          <div
            key={todo.id}
            className={"todo " + (!todo.isCompleted ? "todoRed" : "todoGreen")}
          >
            <div className="index">{index + 1}</div>
            {todo.isEditing ?
              <input
                type="text"
                className="editBox"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditMode(todo, false)
                  }
                }}
                autoFocus
              />
              :
              <div onDoubleClick={() => {
                !editingMode && setEditMode(todo, true)
              }}>{todo.text}</div>
            }
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: todo.isCompleted ? "none" : "block",
                }}
              >
                <input
                  className={"btn " + (editingMode ? "disabled" : "complete")}
                  type="button"
                  value="Done"
                  onClick={() => markComplete(todo.id)}
                  disabled={editingMode}
                ></input>
              </div>
              <div>
                <input
                  className={"btn " + (editingMode ? "disabled" : "delete")}
                  type="button"
                  value="Delete"
                  onClick={() => deleteTodo(todo.id)}
                  disabled={editingMode}
                ></input>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Todo;

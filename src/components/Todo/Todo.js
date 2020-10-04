import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const addTodo = () => {
    const todoObj = {
      id: uuid(),
      text: todoText,
      isCompleted: false,
    };
    setTodos([...todos, todoObj]);
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
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
  console.log("todos", todos);
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
            style={{ width: "50vw" }}
            onChange={(e) => setTodoText(e.target.value)}
          ></input>
        </div>
        <div style={{ margin: "0px 10px", cursor: 'pointer'}}>
          <input type="button" value="ADD TODO" onClick={addTodo}></input>
        </div>
      </div>
      {todos.map((todo, index) => {
        return (
          <div
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "2px dashed black",
              padding: "2vh 3vw",
              margin: "2vh 0vw",
              backgroundColor: todo.isCompleted ? "green" : "red",
            }}
          >
            <div>{index}</div>
            <div>{todo.text}</div>
            <div style={{ display: "flex" }}>
              <div>
                <input
                  type="button"
                  value="Delete"
                  onClick={() => deleteTodo(todo.id)}
                ></input>
              </div>
              <div
                style={{
                  display: todo.isCompleted ? "none" : "block",
                  margin: "0px 0px 0px 3px",
                }}
              >
                <input
                  type="button"
                  value="Mark Complete"
                  onClick={() => markComplete(todo.id)}
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

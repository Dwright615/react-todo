import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);

    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response;
    }

    postData("http://localhost:3001/tasks", {
      id: todo.id,
      text: todo.text,
    }).then((data) => {
      console.log(data);
    });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );

    let url = new URL("http://localhost:3001/tasks/" + todoId);

    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response;
    }

    postData(url, {
      text: newValue.text,
      id: todoId,
    }).then((data) => {
      console.log(data);
    });
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);

    let url = new URL("http://localhost:3001/tasks/" + id);

    async function deleteData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response;
    }

    deleteData(url).then((data) => {
      console.log(data);
    });
  };

  const completeTodo = (id) => {
    let todoText;

    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todoText = todo.text;
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    setTodos(updatedTodos);

    let url = new URL("http://localhost:3001/tasks/complete/" + id);

    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response;
    }

    postData(url, {
      id,
      text: todoText,
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <h1>Your To-Do list</h1>
      <TodoForm onSubmit={addTodo} />
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo.id}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
    </>
  );
}

export default TodoList;

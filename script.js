const API_URL = "https://exceed-todo-list.herokuapp.com";
const API_KEY = "6cbde027-1bf2-488b-bd9a-c0e004eef164";

let form = document.getElementById("form");
let input = document.getElementById("input");
let submit = document.getElementById("submit");
let todoList = document.getElementById("todo-list");
let loadingScreen = document.getElementById("loading-screen");
let deleteAllBtn = document.getElementById("delete-all");

let isLoading = false;

const randomizedNumber = () => {
  return Math.floor(Math.random() * (5000 - 1000) + 1000);
};

let headers = {
  "Content-type": "application/json",
  charset: "UTF-8",
  apikey: API_KEY,
};

// Adding todo
const addTodo = (title) => {
  title = input.value;
  return fetch(`${API_URL}/api/v1/todos`, {
    headers: headers,
    method: "POST",
    body: JSON.stringify({ title }),
  })
    .then(() => {
      setTimeout(() => {
        isLoading = true;
        loadingScreenHandler();
        createTodo(title);
        input.value = "";
      }, randomizedNumber());
    })
    .catch((err) => console.log(err, "aaaaaaaaaaaaaaaaaa"));
};

const createTodo = (title) => {
  let todo = document.createElement("li");
  todo.innerText = title;
  todoList.appendChild(todo);
};

// Getting todos
const getTodos = () =>
  fetch(`${API_URL}/api/v1/todos`, {
    headers: headers,
  })
    .then((data) => {
      return data.json();
    })
    .then((todos) => {
      return todos;
    })
    .catch((err) => {
      console.log(new Error(err));
    });

const setTodos = () => {
  getTodos().then((todos) => {
    setTimeout(() => {
      todos.map((todo) => {
        let newTodo = document.createElement("li");
        newTodo.innerText = todo.title;
        todoList.appendChild(newTodo);
      });
    }, randomizedNumber());
  });
};
setTodos();
// Delete all todos
const removeTodo = (id) =>
  fetch(`${API_URL}/api/v1/todos/${id}`, {
    headers: headers,
    method: "DELETE",
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log(new Error(err));
    });

const deleteAll = () => {
  getTodos()
    .then((todos) => {
      todos.map((todo) => {
        removeTodo(todo._id);
      });
    })
    .then(() => {
      console.log("all deleted");
      setTodos();
    })
    .catch((err) => console.log(err, "Error"));
};

// Loading screen
const loadingScreenHandler = () => {
  if (isLoading) {
    loadingScreen.classList.remove("hidden");
  }
  loadingScreen.classList.add("hidden");
  isLoading = false;
};

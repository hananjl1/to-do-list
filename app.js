import {
  addTodo,
  changeTodoIsComplete,
  getTodos,
  removeAllTodos,
  removeTodo,
} from "./todo.js";
// $AddToListBtn.addEventListener("click", addTodoUI);

// RENDER
const todoInput = document.getElementById("todo-input");
const toDoAddBtn = document.getElementById("todo-add-Btn");
const removeAllTodoBtn = document.getElementById("removeAllTodoButton");
const todoList = document.getElementById("todo-list");
const errorArea = document.querySelector(".errorArea");

toDoAddBtn.addEventListener("click", handleAddToDo);
removeAllTodoBtn.addEventListener("click", handleAllRemoveTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleAddToDo();
  }
});

todoList.addEventListener("change", (e) => {
  if (e.target.matches("input.is-complete")) {
    handleIsComplete(Number(e.target.closest("li.todo-item").dataset.todoId));
    console.log(e.target.closest("li").dataset.todoId);
  }
});

todoList.addEventListener("click", (e) => {
  if (e.target.matches(".bi-trash")) {
    handleRemoveTodo(Number(e.target.closest("li.todo-item").dataset.todoId));
  }
});

todoList.addEventListener("onclick", (e) => {
  if (e.target.matches(e.target)) {
    console.log("works");
  }
});

function handleAddToDo() {
  addTodo(todoInput.value);
  todoInput.value = "";
  renderTodoApp();
}

function handleRemoveTodo(index) {
  removeTodo(index);
  renderTodoApp();
}

function handleAllRemoveTodo(index) {
  removeAllTodos();
  renderTodoApp();
}

function renderTodoApp() {
  const todos = getTodos();
  todoList.innerHTML =
    todos.length > 0 ? renderTodoList(todos) : renderEmptyListNotification();
}

function renderEmptyListNotification() {
  return `<div class="bg-light rounded text-center p-3">
  <h1 class="display-3 fw-bold">Well Done!!</h1>
  <p>You are all done for today!</p>
</div> `;
}

function renderTodoItem(todo) {
  return `
  <li data-todo-id="${
    todo.id
  }" class="todo-item list-group-item d-flex justify-content-between">
    <input 
      class="is-complete form-check-input me-1" 
      type="checkbox" 
      id="todo-id-${todo.id}" 
      
      ${todo.isComplete ? "checked" : ""} 
    />
    <label 
      class="form-check-label flex-fill ${
        todo.isComplete ? "text-secondary text-decoration-line-through" : ""
      }" 
      for="todo-id-${todo.id}"
    >
      ${todo.title}
    </label>
    <i class="text-danger bi bi-trash btn p-0" ></i>
  </li>`;
}

function renderTodoList(todos = []) {
  let html = '<ul class="list-group">';

  for (const todo of todos) {
    html += renderTodoItem(todo);
  }
  html += "</ul>";
  return html;
}

function handleIsComplete(id) {
  changeTodoIsComplete(id);
  renderTodoApp();
}

renderTodoApp();

// Data
const TODO_CURRENT_ID = "todo-current-id";
const savedTodos = localStorage.getItem("todos");
const todos = savedTodos
  ? JSON.parse(savedTodos, (key, value) => {
      if (key === "createdAt") {
        return new Date(value);
      }
      return value;
    })
  : [];
console.log(todos);
let currentId = localStorage.getItem(TODO_CURRENT_ID)
  ? Number(localStorage.getItem(TODO_CURRENT_ID))
  : 1;

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem(TODO_CURRENT_ID, currentId);
}

// Data operation
export function getTodos() {
  return todos;
}

export function addTodo(title) {
  const newToDo = {
    id: currentId++,
    title,
    isComplete: false,
    createdAt: new Date(),
  };
  todos.push(newToDo);
  save();
  return newToDo;
}

function findTodoIndex(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  return index === -1 ? null : index;
}

export function changeTodoIsComplete(id) {
  const index = findTodoIndex(id);
  if (typeof index !== "number") {
    return null;
  }
  todos[index].isComplete = !todos[index].isComplete;
  save();
  return todos[index];
}

export function removeTodo(id) {
  const index = findTodoIndex(id);
  if (typeof index !== "number") {
    return null;
  }
  const removed = todos.splice(index, 1)[0];
  save();
  return removed ? removed : null;
}

export function removeAllTodos() {
  todos.splice(0, todos.length);
  save();
  return getTodos();
}

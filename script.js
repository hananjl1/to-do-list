// Data

const todos = [
  {
    title: "buy milk",
    isCompete: true,
    createdAt: new Date(),
  },
];

// Data operations
function getTodos() {
  return todos;
}

function addTodo(title) {
  todos.push({
    title,
    isCompete: false,
    createdAt: new Date(),
  });
}

function removeTodo(index) {
  todos.splice(index, 1);
}

function changeTodoIsComplete() {
  todos[index].isCompete = !todos[index].isCompete;
}

function removeAllTodos() {
  todos.splice(0, todos.length);
}

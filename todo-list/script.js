const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const clearBtn = document.querySelector("#clearBtn");

//button for adding task
addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const task = todoInput.value.trim();

  if (task === "") {
    return;
  }

  const li = document.createElement("li");
  li.classList.add("todo-item");

  const span = document.createElement("span");
  span.textContent = task;
  span.classList.add("todo-text");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  span.addEventListener("click", function () {
    span.classList.toggle("completed");
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = "";
}

clearBtn.addEventListener("click", function () {
  todoList.innerHTML = "";
});
const todo = document.querySelector("#to-do");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];

let dragElem = null;

// Create a task and attach all required events
function createTask(title, description) {
  const div = document.createElement("div");

  div.classList.add("task");
  div.setAttribute("draggable", "true");

  const heading = document.createElement("h2");
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.textContent = description;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  div.append(heading, paragraph, deleteBtn);

  // Start dragging
  div.addEventListener("dragstart", () => {
    dragElem = div;
  });

  // Finish dragging
  div.addEventListener("dragend", () => {
    dragElem = null;

    columns.forEach((column) => {
      column.classList.remove("hover-over");
    });
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    div.remove();
    updateCounts();
    saveTasks();
  });

  return div;
}

// Update task counts
function updateCounts() {
  columns.forEach((column) => {
    const tasks = column.querySelectorAll(".task");
    const count = column.querySelector(".right");

    if (count) {
      count.textContent = tasks.length;
    }
  });
}

// Save all columns and their tasks
function saveTasks() {
  const tasksData = {};

  columns.forEach((column) => {
    const tasks = column.querySelectorAll(".task");

    tasksData[column.id] = Array.from(tasks).map((task) => ({
      title: task.querySelector("h2").textContent,
      desc: task.querySelector("p").textContent
    }));
  });

  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

// Restore tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (!savedTasks) {
    updateCounts();
    return;
  }

  try {
    const data = JSON.parse(savedTasks);

    columns.forEach((column) => {
      column.querySelectorAll(".task").forEach((task) => task.remove());

      const tasks = data[column.id] || [];

      tasks.forEach((task) => {
        const div = createTask(task.title, task.desc);
        column.appendChild(div);
      });
    });
  } catch (error) {
    console.error("Unable to load saved tasks:", error);
  }

  updateCounts();
}

// Drag-and-drop functionality
function addDragEvent(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", (e) => {
    if (!column.contains(e.relatedTarget)) {
      column.classList.remove("hover-over");
    }
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");

    if (!dragElem) return;

    column.appendChild(dragElem);

    updateCounts();
    saveTasks();
  });
}

// Register drag-and-drop on all columns
columns.forEach((column) => {
  addDragEvent(column);
});

// Modal functionality
const taskBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBG = document.querySelector(".bg");

taskBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBG.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Add new task
const newTask = document.querySelector("#new-task");

newTask.addEventListener("click", () => {
  const taskTitle = document.querySelector("#input-title");
  const taskDescription = document.querySelector("#description-title");

  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();

  if (!title) {
    alert("Please enter a task title.");
    return;
  }

  const div = createTask(title, description);

  todo.appendChild(div);

  updateCounts();
  saveTasks();

  taskTitle.value = "";
  taskDescription.value = "";

  modal.classList.remove("active");
});

// Load saved tasks when the page starts
loadTasks();

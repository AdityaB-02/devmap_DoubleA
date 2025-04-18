let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let editingIndex = null;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  ["all", "completed", "pending"].forEach(id =>
    document.getElementById(`filter-${id}`).classList.remove("bg-blue-200", "font-semibold")
  );
  document.getElementById(`filter-${filter}`).classList.add("bg-blue-200", "font-semibold");
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
}

function openModal(index) {
  editingIndex = index;
  document.getElementById("editInput").value = tasks[index].text;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  editingIndex = null;
  document.getElementById("modal").classList.add("hidden");
}

function saveEdit() {
  const newText = document.getElementById("editInput").value.trim();
  if (newText && editingIndex !== null) {
    tasks[editingIndex].text = newText;
    saveTasks();
    renderTasks();
    closeModal();
  }
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredWithIndex = tasks
    .map((task, i) => ({ ...task, originalIndex: i }))
    .filter(task => {
      if (currentFilter === "completed") return task.completed;
      if (currentFilter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => a.completed - b.completed);

  filteredWithIndex.forEach((taskObj) => {
    const index = taskObj.originalIndex;
    const task = tasks[index];

    const li = document.createElement("li");
    li.className = "flex items-center justify-between bg-yellow-50 p-3 rounded-lg shadow fade-enter";
    setTimeout(() => li.classList.add("fade-enter-active"), 10);

    const left = document.createElement("div");
    left.className = "flex items-center gap-2 flex-1";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleTask(index);

    const text = document.createElement("span");
    text.textContent = task.text;
    if (task.completed) {
      text.className = "line-through text-gray-500 text-lg";
    } else {
      text.classList.add("text-lg");
    }

    left.appendChild(checkbox);
    left.appendChild(text);

    const buttons = document.createElement("div");
    buttons.className = "flex gap-2";

    const edit = document.createElement("button");
    edit.textContent = "🖊️";
    edit.className = "hover:opacity-75 hover:scale-150 transition-transform duration-300";
    edit.onclick = () => openModal(index);

    const del = document.createElement("button");
    del.textContent = "❌";
    del.className = "hover:opacity-75 hover:scale-125 transition-transform duration-200";
    del.onclick = () => removeTask(index);

    buttons.appendChild(edit);
    buttons.appendChild(del);

    li.appendChild(left);
    li.appendChild(buttons);
    list.appendChild(li);
  });
}

window.onload = () => {
  setFilter("all"); 
};

document.getElementById("taskInput").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
  });

document.getElementById("editInput").addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        saveEdit();
    }
  });
let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter an academic task.");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    input.value = "";
    saveTasks();
    displayTasks();
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        const item = document.createElement("div");
        item.className = "task";

        const name = document.createElement("span");
        name.textContent = task.text;

        if (task.completed) {
            name.classList.add("completed");
        }

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";

        completeButton.onclick = function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        item.appendChild(name);
        item.appendChild(completeButton);
        item.appendChild(deleteButton);

        list.appendChild(item);
    });
}

displayTasks();

document.getElementById("contactForm").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const phone = document.getElementById("phone").value;
        const formMessage = document.getElementById("formMessage");

        if (!/^[0-9]+$/.test(phone)) {
            alert("Please enter digits only for your phone number.");
            return;
        }

        formMessage.textContent =
            "Your form has been validated successfully!";

        this.reset();
    }
);
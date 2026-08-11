const themeToggleBtn = document.getElementById("themeToggle");
const body = document.body;
function applyTheme(isDark) {
    if (isDark) {
        body.classList.add("dark-mode");
        if (themeToggleBtn) {
            themeToggleBtn.innerText = "☀ LIGHT";
        }
    } else {
        body.classList.remove("dark-mode");
        if (themeToggleBtn) {
            themeToggleBtn.innerText = "☾ DARK";
        }
    }
}

const savedTheme =
    localStorage.getItem("darkMode") === "true";
applyTheme(savedTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function () {
        const isDarkNow =
            !body.classList.contains("dark-mode");
        applyTheme(isDarkNow);
        localStorage.setItem(
            "darkMode",
            isDarkNow
        );
    });

}

function showGreeting() {
    const greetingElement =
        document.getElementById("greeting");
    const timeElement =
        document.getElementById("currentTime");
    if (!greetingElement || !timeElement) {
        return;
    }
    const now = new Date();
    const currentHour = now.getHours();
    let greeting = "";
    if (
        currentHour >= 5 &&
        currentHour < 12
    ) {
        greeting = "GOOD MORNING";
    } else if (
        currentHour >= 12 &&
        currentHour < 18
    ) {
        greeting = "GOOD AFTERNOON";
    } else {
        greeting = "GOOD EVENING";
    }
    const hour =
        String(now.getHours()).padStart(2, "0");

    const minute =
        String(now.getMinutes()).padStart(2, "0");
    greetingElement.innerText =
        greeting + ", WELCOME!";
    timeElement.innerText =
        "TIME: " + hour + ":" + minute;
}

showGreeting();

setInterval(function () {
    showGreeting();
}, 60000);

let messages =
    JSON.parse(
        localStorage.getItem("hardjonoMessages")
    ) || [];

const messageForm =
    document.getElementById("todoForm");

const messageInput =
    document.getElementById("todoInput");

const messageList =
    document.getElementById("todoList");

const messageEmpty =
    document.getElementById("todoEmpty");

function saveMessages() {
    localStorage.setItem(
        "hardjonoMessages",
        JSON.stringify(messages)
    );
}

function renderMessages() {
    if (!messageList || !messageEmpty) {
        return;
    }
    messageList.innerHTML = "";
    messages.forEach(function (message) {
        const li =
            document.createElement("li");
        li.className = "todo-item";
        const span =
            document.createElement("span");
        span.innerText = message.text;
        const deleteButton =
            document.createElement("button");
        deleteButton.innerText = "DELETE";
        deleteButton.className =
            "delete-btn";
        deleteButton.addEventListener(
            "click",
            function () {
                deleteMessage(message.id);
            }
        );
        li.appendChild(span);
        li.appendChild(deleteButton);
        messageList.appendChild(li);
    });
    if (messages.length === 0) {
        messageEmpty.style.display = "block";
    } else {
        messageEmpty.style.display = "none";
    }
}
function addMessage(text) {
    if (text.trim() === "") {
        return;
    }
    const newMessage = {
        id: Date.now(),
        text: text.trim()
    };
    messages.push(newMessage);
    saveMessages();
    renderMessages();
}
function deleteMessage(id) {
    messages =
        messages.filter(function (message) {
            return message.id !== id;
        });
    saveMessages();
    renderMessages();
}

if (messageForm) {
    messageForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            addMessage(messageInput.value);
            messageInput.value = "";
        }
    );
}

renderMessages();

const startButton =
    document.querySelector(".start-button");
if (startButton) {
    startButton.addEventListener(
        "click",
        function () {
            startButton.style.transform =
                "translate(5px, 5px)";
        }
    );
}

const currentPage =
    window.location.pathname
        .split("/")
        .pop();

const navLinks =
    document.querySelectorAll(".nav-links a");
navLinks.forEach(function (link) {
    const linkPage =
        link.getAttribute("href");
    if (
        linkPage === currentPage
    ) {
        link.classList.add("active");
    }
});
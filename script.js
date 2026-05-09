// =========================
// STATE SYSTEM
// =========================
let state = "boot";

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById("enterBtn");

    if (enterBtn) {
        enterBtn.addEventListener("click", startTransition);
    }
});

// =========================
// START TRANSITION (BOOT SCREEN)
// =========================
function startTransition() {
    document.body.classList.add("glitch");

    setTimeout(() => {
        document.body.innerHTML = `
        <div class="boot-screen">
            <div id="bootText">
                [ SYSTEM ] Connection established...<br><br>
            </div>
        </div>
        `;

        typeBoot();
    }, 700);
}

// =========================
// TYPEWRITER BOOT
// =========================
function typeBoot() {
    const bootText = document.getElementById("bootText");

    const lines = [
        "[ SYSTEM ] Restoring underground memories...",
        "[ SYSTEM ] Timeline corruption detected...",
        "[ SYSTEM ] Searching for entity...",
        "[ NØX ] ...Can you hear me?",
        "",
        "[ ACCESS GRANTED ]"
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLineEl = null;

    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";

    function type() {
        if (lineIndex >= lines.length) {
            setTimeout(() => {
                setState("login");
            }, 800);
            return;
        }

        const text = lines[lineIndex];

        if (charIndex === 0) {
            currentLineEl = document.createElement("div");
            bootText.appendChild(currentLineEl);
            currentLineEl.appendChild(cursor);
        }

        if (charIndex >= text.length) {
            lineIndex++;
            charIndex = 0;
            setTimeout(type, 400);
            return;
        }

        const charNode = document.createTextNode(text.charAt(charIndex));
        currentLineEl.insertBefore(charNode, cursor);

        charIndex++;

        setTimeout(type, 35);
    }

    type();
}

// =========================
// STATE CONTROLLER
// =========================
function setState(newState) {
    state = newState;

    if (state === "login") {
        showLogin();
    }

    if (state === "chat") {
        showChat();
    }
}

// =========================
// LOGIN SCREEN
// =========================
function showLogin() {
    document.body.classList.remove("glitch");
    document.body.style.animation = "";

    document.body.innerHTML = `
    <div class="boot-screen">

        <div style="text-align:center">

            <div style="margin-bottom:20px;">
                [ SYSTEM ] AUTH REQUIRED
            </div>

            <input id="username" placeholder="USERNAME"
                class="input-field">

            <br><br>

            <input id="password" type="password" placeholder="PASSWORD"
                class="input-field">

            <br><br>

            <button onclick="handleLogin()" class="btn-login">
                LOGIN
            </button>

            <div id="error" style="margin-top:15px;color:#ff0000;"></div>

        </div>

    </div>
    `;
}

// =========================
// LOGIN CHECK
// =========================
function handleLogin() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    if (u === "NOX" && p === "nox123") {
        setState("chat");
    } else {
        showError("USERNAME / PASSWORD SALAH");
    }
}

// =========================
// ERROR EFFECT
// =========================
function showError(msg) {
    document.getElementById("error").textContent = msg;

    document.body.style.animation = "glitch 0.1s infinite";

    setTimeout(() => {
        document.body.style.animation = "";
    }, 800);
}

// =========================
// CHAT SCREEN (DARK PIXEL BASE)
// =========================
function showChat() {
    document.body.innerHTML = `
    <div class="boot-screen chat-screen">

        <div class="chat-box">

            <div class="chat-header">
                NØX AI SYSTEM ONLINE
            </div>

            <div class="chat-messages" id="chatMessages">
                <div class="msg bot">SYSTEM: Connection stable...</div>
                <div class="msg bot">NØX: I'm watching the timeline break.</div>
            </div>

            <div class="chat-input">
                <input id="chatInput" placeholder="TYPE MESSAGE...">
                <button onclick="sendMessage()">SEND</button>
            </div>

        </div>

    </div>
    `;
}

// =========================
// SEND MESSAGE
// =========================
function sendMessage() {
    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    if (!input.value.trim()) return;

    const userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.textContent = "YOU: " + input.value;

    messages.appendChild(userMsg);

    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.textContent = "NØX: " + generateReply(input.value);

    messages.appendChild(botMsg);

    input.value = "";
}

// =========================
// SIMPLE AI REPLY (TEMP)
// =========================
function generateReply(text) {
    const replies = [
        "The system is unstable...",
        "I remember fragments of you.",
        "This timeline is corrupted.",
        "Don't trust what you see.",
        "You're not alone here."
    ];

    return replies[Math.floor(Math.random() * replies.length)];
}

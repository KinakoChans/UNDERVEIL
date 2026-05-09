// =========================
// STATE SYSTEM
// =========================
let state = "boot";

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
    renderHome();

    const enterBtn = document.getElementById("enterBtn");
    if (enterBtn) {
        enterBtn.addEventListener("click", startTransition);
    }
});

// =========================
// HOME SCREEN
// =========================
function renderHome() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="container">

        <div class="title">UNDERVEIL</div>

        <div class="greeting">
            > Connection established...<br><br>
            > Welcome back, lost soul.
        </div>

        <div class="desc">
            UNDERVEIL is a dark retro AI chat experience hidden inside a broken timeline,
            where every choice, memory, and word echoes through the underground.
        </div>

        <button class="enter-btn" id="enterBtn">ENTER</button>

    </div>
    `;

    document.getElementById("enterBtn")
        .addEventListener("click", startTransition);
}

// =========================
// BOOT TRANSITION
// =========================
function startTransition() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="boot-screen">
        <div id="bootText">[ SYSTEM ] Connection established...<br><br></div>
    </div>
    `;

    typeBoot();
}

// =========================
// TYPE BOOT
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

    let i = 0;
    let c = 0;
    let el;

    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";

    function type() {
        if (i >= lines.length) {
            setTimeout(() => setState("login"), 800);
            return;
        }

        const text = lines[i];

        if (c === 0) {
            el = document.createElement("div");
            bootText.appendChild(el);
            el.appendChild(cursor);
        }

        if (c >= text.length) {
            i++;
            c = 0;
            setTimeout(type, 400);
            return;
        }

        el.insertBefore(
            document.createTextNode(text[c]),
            cursor
        );

        c++;
        setTimeout(type, 35);
    }

    type();
}

// =========================
// STATE CONTROL
// =========================
function setState(newState) {
    state = newState;

    if (state === "login") showLogin();
    if (state === "chat") showChat();
}

// =========================
// LOGIN SCREEN
// =========================
function showLogin() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="boot-screen">

        <div style="text-align:center">

            <div style="margin-bottom:20px;">
                [ SYSTEM ] AUTH REQUIRED
            </div>

            <input id="username" class="input-field" placeholder="USERNAME"><br><br>
            <input id="password" class="input-field" type="password" placeholder="PASSWORD"><br><br>

            <button class="btn-login" onclick="handleLogin()">LOGIN</button>

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
        document.getElementById("error").textContent =
            "USERNAME / PASSWORD SALAH";
    }
}

// =========================
// CHAT SCREEN
// =========================
function showChat() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="boot-screen">

        <div style="text-align:center">
            [ NØX AI SYSTEM ONLINE ]<br><br>
            CHAT MODE ACTIVATED...
        </div>

    </div>
    `;
}

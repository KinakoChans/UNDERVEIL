document.getElementById("app").innerHTML = `
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

// =========================
// STATE SYSTEM
// =========================
let state = "boot";

// =========================
// ENTER BUTTON
// =========================
const enterBtn = document.getElementById("enterBtn");

if (enterBtn) {
    enterBtn.addEventListener("click", startTransition);
}

// =========================
// START TRANSITION (BOOT SCREEN)
// =========================
function startTransition(){

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
// BOOT TYPEWRITER
// =========================
function typeBoot(){

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

    function type(){

        if(lineIndex >= lines.length){
            setTimeout(() => setState("login"), 800);
            return;
        }

        const text = lines[lineIndex];

        if(charIndex === 0){
            currentLineEl = document.createElement("div");
            bootText.appendChild(currentLineEl);
            currentLineEl.appendChild(cursor);
        }

        if(charIndex >= text.length){
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
function setState(newState){
    state = newState;

    if(state === "login"){
        showLogin();
    }

    if(state === "chat"){
        showChat();
    }
}

// =========================
// LOGIN SCREEN
// =========================
function showLogin(){

    document.body.classList.remove("glitch");

    document.body.innerHTML = `
    <div class="boot-screen">

        <div style="text-align:center">

            <div style="margin-bottom:20px;">
                [ SYSTEM ] AUTH REQUIRED
            </div>

            <input id="username" placeholder="USERNAME"><br><br>

            <input id="password" type="password" placeholder="PASSWORD"><br><br>

            <button onclick="handleLogin()">LOGIN</button>

            <div id="error" style="margin-top:15px;color:#ff0000;"></div>

        </div>

    </div>
    `;
}

// =========================
// LOGIN CHECK
// =========================
function handleLogin(){

    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    if(u === "NOX" && p === "nox123"){
        setState("chat");
    } else {
        showError("USERNAME / PASSWORD SALAH");
    }
}

// =========================
// ERROR EFFECT
// =========================
function showError(msg){

    document.getElementById("error").textContent = msg;

    document.body.style.animation = "glitch 0.1s infinite";

    setTimeout(() => {
        document.body.style.animation = "";
    }, 800);
}

// =========================
// CHAT SCREEN (DUMMY)
// =========================
function showChat(){

    document.body.innerHTML = `
    <div class="boot-screen">

        <div style="text-align:center">

            [ NØX AI SYSTEM ONLINE ]<br><br>
            CHAT MODE ACTIVATED...

        </div>

    </div>
    `;
}

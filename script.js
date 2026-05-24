// =========================
// STATE
// =========================
let state = "boot";
let chatLocked = true;

// =========================
// INIT BUTTON EVENT (optional safety)
// =========================
document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("sendBtn");

    if (btn) {
        btn.addEventListener("click", () => {
            playChatSound();
            sendMessage();
        });
    }
});

// =========================
// SOUND
// =========================
function playChatSound() {
    const chatSound = document.getElementById("chatSound");
    if (!chatSound) return;

    chatSound.volume = 0.4;
    chatSound.currentTime = 0;
    chatSound.play();
}

// =========================
// SEND MESSAGE (FIXED)
// =========================
async function sendMessage() {

    if (chatLocked) return;

    const input = document.getElementById("input");
    const chatBox = document.getElementById("chatBox");

    if (!input || !chatBox) return;

    const text = input.value.trim();
    if (text === "") return;

    input.value = "";

    // USER MESSAGE
    const msg = document.createElement("div");
    msg.className = "message user";
    msg.innerHTML = "[ USER ] : " + text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        // AI REQUEST
        const res = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await res.json();

        // AI MESSAGE
        const aiMsg = document.createElement("div");
        aiMsg.className = "message ai";
        aiMsg.innerHTML = "[ EMELY ] : " + data.reply;

        chatBox.appendChild(aiMsg);
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (err) {

        const errMsg = document.createElement("div");
        errMsg.className = "message system-error";
        errMsg.innerHTML = "[ SYSTEM ] : connection failed...";

        chatBox.appendChild(errMsg);
    }
}

// =========================
// FULLSCREEN TOGGLE (optional)
// =========================
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// =========================
// MAKE GLOBAL (IMPORTANT)
// =========================
window.sendMessage = sendMessage;
window.toggleFullscreen = toggleFullscreen;
window.playChatSound = playChatSound;

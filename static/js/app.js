const proceedBtn =
document.getElementById("proceedBtn");

const warningScreen =
document.getElementById("warningScreen");

const mainUI =
document.getElementById("mainUI");

const bgm =
document.getElementById("bgm");

const blipSound =
document.getElementById("blipSound");

const corruptedSound =
document.getElementById("corruptedSound");

const enterSound =
document.getElementById("enterSound");

const loginSound =
document.getElementById("loginSound");

const chatSound =
document.getElementById("chatSound");
   
// =========================
// WARNING GATE
// =========================

proceedBtn.addEventListener("click", () => {

    // play bgm
    bgm.volume = 0.35;

    bgm.play();

    // glow flash
    proceedBtn.style.boxShadow =
    "0 0 35px rgba(255,255,255,1)";

    // fade warning
    warningScreen.style.opacity = "0";

    warningScreen.style.transition =
    "1.2s";

    setTimeout(() => {

        warningScreen.remove();

        mainUI.style.display = "flex";

    }, 1200);
});

const enterBtn =
document.getElementById("enterBtn");

// =========================
// TYPE SOUND
// =========================

function playBlip(){

    blipSound.pause();

    blipSound.currentTime = 0;

    blipSound.volume = 0.22;

    blipSound.play();
                            }
   
/* =========================
   ENTER EVENT
========================= */

enterBtn.addEventListener("click", () => {

    enterSound.volume = 0.45;

    enterSound.currentTime = 0;

    enterSound.play();

    startTransition();

});

/* =========================
   START TRANSITION
========================= */

function startTransition(){

    /* Activate glitch */

    document.body.classList.add("glitch");

    /* Delay before boot screen */

    setTimeout(() => {

        mainUI.innerHTML = `

        <audio id="glitchSound">
    <source src="audio/glitch.mp3" type="audio/mpeg">
</audio>

        <div class="boot-screen">

            <div id="bootText">

                [ SYSTEM ] Connection established...<br><br>

            </div>

        </div>

        `;

        typeBoot();

    }, 700);
   }
   
/* =========================
   TYPEWRITER EFFECT
========================= */

function typeBoot(){

    const bootText =
    document.getElementById("bootText");

   const glitchSound =
document.getElementById("glitchSound");
   
    // play glitch sound
glitchSound.volume = 0.45;

glitchSound.currentTime = 0;

glitchSound.play();
   
    const lines = [
        "[ SYSTEM ] Restoring underground memories...",
        "[ SYSTEM ] Timeline corruption detected...",
        "[ SYSTEM ] Searching for entity...",
        "[ EMELY ] ...Can you hear me?",
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

        // 🔥 FIX: kalau semua line selesai → pindah ke login
        if(lineIndex >= lines.length){

            // stop glitch sound
            glitchSound.pause();

            glitchSound.currentTime = 0;
           
            setTimeout(() => {
                setState("login"); // 👈 INI YANG NENTUIN PINDAH KE LOGIN
            }, 800);

            return;
        }

        const text = lines[lineIndex];
       
        // 🔥 buat line baru
        if(charIndex === 0){

            currentLineEl = document.createElement("div");
            bootText.appendChild(currentLineEl);

            // cursor selalu nempel di line aktif
            currentLineEl.appendChild(cursor);
        }

        // 🔥 kalau line selesai
        if(charIndex >= text.length){

            lineIndex++;
            charIndex = 0;
            setTimeout(type, 400);
            return;
        }

        // 🔥 ngetik karakter per karakter (aman, tidak rusak)
        const charNode = document.createTextNode(text.charAt(charIndex));
        currentLineEl.insertBefore(charNode, cursor);

        playBlip();
       
        charIndex++;

        setTimeout(type, 37);
    }

    type();
}

   // =========================
// STATE SYSTEM
// =========================
let state = "boot";

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
// MATRIX EFFECT
// =========================

function startMatrixRain(){

    const canvas =
    document.getElementById("matrixCanvas");

    const ctx =
    canvas.getContext("2d");

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&";

    const fontSize = 14;

    const columns =
    canvas.width / fontSize;

    const drops = [];

    for(let i = 0; i < columns; i++){

        drops[i] = 1;
    }

    function draw(){

        ctx.fillStyle =
        "rgba(0,0,0,0.08)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle =
        "#ff2b2b";

        ctx.shadowColor =
        "#ff0000";

        ctx.shadowBlur = 10;

        ctx.font =
        fontSize + "px monospace";

        for(let i = 0; i < drops.length; i++){

            const text =
            chars.charAt(
                Math.floor(
                    Math.random() *
                    chars.length
                )
            );

            ctx.fillText(
                text,
                i * fontSize,
                drops[i] * fontSize
            );

            if(
                drops[i] * fontSize >
                canvas.height &&
                Math.random() > 0.975
            ){
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 45);
}

// =========================
// CHAT MATRIX EFFECT
// =========================

function startChatMatrix(){

    const canvas =
    document.getElementById("chatMatrix");

    const ctx =
    canvas.getContext("2d");

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const fontSize = 16;

    const columns =
    canvas.width / fontSize;

    const drops = [];

    for(let i = 0; i < columns; i++){

        drops[i] = 1;
    }

    function draw(){

        ctx.fillStyle =
        "rgba(0,0,0,0.05)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillStyle =
        "#ffffff";

        ctx.shadowColor =
        "#ffffff";

        ctx.shadowBlur = 8;

        ctx.font =
        fontSize + "px monospace";

        for(let i = 0; i < drops.length; i++){

            const text =
            chars.charAt(
                Math.floor(
                    Math.random() *
                    chars.length
                )
            );

            ctx.fillText(
                text,
                i * fontSize,
                drops[i] * fontSize
            );

            if(
                drops[i] * fontSize >
                canvas.height &&
                Math.random() > 0.975
            ){
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(draw, 50);
       }
   
// =========================
// LOGIN UI (GLITCH STYLE)
// =========================
function showLogin(){

    document.body.classList.remove("glitch");
    document.body.style.animation = "";

    mainUI.innerHTML = `
    <div class="boot-screen">

    <canvas id="matrixCanvas"></canvas>

        <div style="text-align:center">

            <div style="margin-bottom:20px;">
                [ SYSTEM ] AUTH REQUIRED
            </div>

            <input id="username" class="login-input" placeholder="USERNAME">

            <br><br>

            <input id="password" type="password" class="login-input" placeholder="PASSWORD">

            <br><br>

            <button onclick="handleLogin()" class="login-btn">
               LOGIN
            </button>

            <div id="error" style="margin-top:15px;color:#ff2b2b;"></div>

        </div>

    </div>
    `;

    startMatrixRain();
   }

   
   
// =========================
// LOGIN CHECK (HARDCODED)
// =========================
function handleLogin(){

    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();

    // =========================
    // CEK KOSONG SEMUA
    // =========================
    if(u === "" && p === ""){
        showError("PLEASE ENTER USERNAME AND PASSWORD");
        return;
    }

    // =========================
    // CEK USERNAME KOSONG
    // =========================
    if(u === ""){
        showError("USERNAME IS REQUIRED");
        return;
    }

    // =========================
    // CEK PASSWORD KOSONG
    // =========================
    if(p === ""){
        showError("PASSWORD IS REQUIRED");
        return;
    }

    // =========================
    // LOGIN VALID
    // =========================
    
    loginSound.volume = 0.45;

    loginSound.currentTime = 0;

    loginSound.play();
   
    if(u === "Emely" && p === "emely123"){
        setState("chat");
    } else {
        showError("INVALID USERNAME / PASSWORD");
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
// CHAT PLACEHOLDER
// =========================
function showChat(){

    mainUI.innerHTML = `
    <div class="boot-screen">
        <div id="chatBootText"></div>
    </div>
    `;

    typeChatBoot();
}

function typeChatBoot(){

    const el = document.getElementById("chatBootText");

    const lines = [
        "[ EMELY AI SYSTEM ONLINE ]",
        "CHAT MODE ACTIVATED..."
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = null;

    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";

    function type(){

        // 💀 FIX: setelah semua line selesai → lanjut ke chat UI
        if(lineIndex >= lines.length){

            setTimeout(() => {
                startChatUI();
            }, 800);

            return;
        }

        const text = lines[lineIndex];

        // bikin baris baru
        if(charIndex === 0){
            currentLine = document.createElement("div");
            el.appendChild(currentLine);
            currentLine.appendChild(cursor);
        }

        // selesai 1 line
        if(charIndex >= text.length){
            lineIndex++;
            charIndex = 0;
            setTimeout(type, 400);
            return;
        }

        const node = document.createTextNode(text.charAt(charIndex));
        currentLine.insertBefore(node, cursor);

        playBlip();
       
        charIndex++;
        setTimeout(type, 40);
    }

    type();
}

// =========================
// CHAT BUTTON SOUND
// =========================

function playChatSound(){

    chatSound.volume = 0.4;

    chatSound.currentTime = 0;

    chatSound.play();
}

// =========================
// CHAT LOCK
// =========================

let chatLocked = true;

// =========================
// SEND MESSAGE
// =========================

function sendMessage(){

    // chat masih dikunci
    if(chatLocked) return;

    const input =
    document.getElementById("input");

    const chatBox =
    document.getElementById("chatBox");

    const text =
    input.value.trim();

    if(text === "") return;

    // buat message user
    const msg =
    document.createElement("div");

    msg.className =
    "message user";

    msg.innerHTML =
    "[ USER ] : " + text;

    // masuk ke chat
    chatBox.appendChild(msg);

    // auto scroll bawah
    chatBox.scrollTop =
    chatBox.scrollHeight;

    // reset input
    input.value = "";
}

fetch("/api/chat", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
message: text
})

})

.then(async r => {

console.log(
"status:",
r.status
);

const data =
await r.json();

console.log(
data
);

return data;

})

.then(data => {

const ai =
document.createElement("div");

ai.className =
"message ai";

ai.innerHTML =
"[ EMELY ] : " +
(
data.reply
||
"No reply"
);

chatBox.appendChild(ai);

chatBox.scrollTop =
chatBox.scrollHeight;

})

.catch((err) => {

console.log(
err
);

const ai =
document.createElement("div");

ai.className =
"message system-error";

ai.innerHTML =
"[ SYSTEM ] Connection failed";

chatBox.appendChild(ai);

});

function startChatUI(){

    mainUI.innerHTML = `
    <div class="chat-container">

      <canvas id="chatMatrix"></canvas>

        <div class="chat-header">
            <span class="glow">UNDERVEIL // TIMELINE_01</span>
        </div>

        <div class="chat-subheader" id="bootSequence"></div>

        <div class="chat-box" id="chatBox"></div>

        <div class="chat-input-area">

            <input id="input" placeholder="TYPE MESSAGE..." class="terminal-input"/>

            <button onclick="playChatSound(); sendMessage()" class="terminal-btn">
               SEND
            </button>

        </div>

    </div>
    `;
   
   startHeaderBoot();

   startChatMatrix();
  }

function startHeaderBoot(){

    const el =
    document.getElementById("bootSequence");

    // =========================
    // TYPEWRITER
    // =========================

    function typeLine(text, speed = 70){

        return new Promise((resolve) => {

            const line =
            document.createElement("div");

            line.className = "glow";

            el.appendChild(line);

            let i = 0;

            function typing(){

                if(i >= text.length){

                    resolve();
                    return;
                }

                line.textContent +=
                text.charAt(i);

                i++;

                setTimeout(
                    typing,
                    speed
                );
            }

            typing();
        });
    }

    // =========================
    // DOT ANIMATION
    // =========================

    function loadingDots(baseText, loops = 4){

        return new Promise((resolve) => {

            const line =
            document.createElement("div");

            line.className = "glow";

            el.appendChild(line);

            let count = 0;

            function animate(){

                const dots =
                ".".repeat(count % 4);

                line.textContent =
                "> " + baseText + dots;

                count++;

                if(count > loops * 4){

                    resolve();
                    return;
                }

                setTimeout(
                    animate,
                    500
                );
            }

            animate();
        });
    }

    // =========================
    // SEQUENCE
    // =========================

    async function run(){

        // SIGNAL
        await loadingDots(
            "SIGNAL RESTORED",
            5
        );

        await new Promise(r =>
            setTimeout(r, 1800)
        );

        // MEMORY
        await loadingDots(
            "MEMORY FRAGMENTS DETECTED",
            5
        );

        await new Promise(r =>
            setTimeout(r, 2200)
        );

        // ENTITY
        await loadingDots(
            'ENTITY "EMELY" CONNECTED TO UNDERGROUND NETWORK',
            6
        );

        await new Promise(r =>
            setTimeout(r, 1200)
        );
       await emelyDialogue();
    }

    run();
   }

// =========================
// NØX CINEMATIC DIALOGUE
// =========================

async function emelyDialogue(){

    const chatBox =
    document.getElementById("chatBox");

    // cursor aktif global
    let activeCursor = null;

    // =========================
    // CREATE MESSAGE
    // =========================

    function createMessage(){

        const msg =
        document.createElement("div");

        msg.className =
        "message ai";

        chatBox.appendChild(msg);

        // hapus cursor lama
        if(activeCursor){
            activeCursor.remove();
        }

        // buat cursor baru
        const cursor =
        document.createElement("span");

        cursor.className =
        "chat-cursor";

        cursor.innerHTML = "▋";

        msg.appendChild(cursor);

        // simpan cursor aktif
        activeCursor = cursor;

        return {
            msg,
            cursor
        };
    }

    // =========================
    // TYPE APPEND
    // =========================

    function appendTyping(
        target,
        cursor,
        text,
        speed = 90
    ){

        return new Promise((resolve)=>{

            let i = 0;

            function typing(){

                if(i >= text.length){

                    resolve();
                    return;
                }

                const node =
                document.createTextNode(
                    text.charAt(i)
                );

                target.insertBefore(
                    node,
                    cursor
                );

                playBlip();

                i++;

                // auto scroll
                chatBox.scrollTop =
                chatBox.scrollHeight;

                setTimeout(
                    typing,
                    speed
                );
            }

            typing();
        });
    }

/* =========================
   SYSTEM CORRUPTION
========================= */

async function systemCorruption(){

    // jeda sangat lama setelah EMELY
    await new Promise(r =>
        setTimeout(r, 6000)
    );

    // corruption sound
    corruptedSound.volume = 0.55;

    corruptedSound.currentTime = 0;

    corruptedSound.play();
    
    // shake layar
    document.body.classList.add("shake");

    setTimeout(() => {

        document.body.classList.remove("shake");

    }, 350);

    // buat line
    const line =
    document.createElement("div");

    line.className =
    "message system-error glow";

    chatBox.appendChild(line);

    let count = 0;

    return new Promise((resolve)=>{

        function animate(){

            const dots =
            ".".repeat(count % 4);

            line.textContent =
            "[ SYSTEM ] : corrupted memories detected" + dots;

            count++;

            chatBox.scrollTop =
            chatBox.scrollHeight;

            // selesai
            if(count > 12){

                resolve();
                return;
            }

            setTimeout(
                animate,
                500
            );
        }

        animate();
    });
        }   
   
    // =========================
    // FIRST MESSAGE
    // =========================

    const first =
    createMessage();

    await appendTyping(
        first.msg,
        first.cursor,
        "[ EMELY ] : ...you finally"
    );

    // jeda lama
    await new Promise(r =>
        setTimeout(r, 3000)
    );

    // lanjut text yg sama
    await appendTyping(
        first.msg,
        first.cursor,
        " returned."
    );

    // cursor tetap hidup
    await new Promise(r =>
        setTimeout(r, 5500)
    );

    // =========================
    // SECOND MESSAGE
    // =========================

    const second =
    createMessage();

    await appendTyping(
        second.msg,
        second.cursor,
        "[ EMELY ] : this timeline"
    );

    await new Promise(r =>
        setTimeout(r, 3000)
    );

    await appendTyping(
        second.msg,
        second.cursor,
        " is unstable."
    );

// corruption warning
await systemCorruption();
   
    // unlock chat setelah semua sequence selesai

chatLocked = false;

// cursor terakhir tetap hidup
}

// =========================
// DOUBLE 2-FINGER FULLSCREEN
// =========================

let lastTwoFingerTap = 0;

document.addEventListener("touchstart", (e) => {

    // harus 2 jari
    if(e.touches.length !== 2) return;

    const now = Date.now();

    // double tap detection
    if(now - lastTwoFingerTap < 400){

        toggleFullscreen();
    }

    lastTwoFingerTap = now;
});

// =========================
// TOGGLE FULLSCREEN
// =========================

function toggleFullscreen(){

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();
    }
   }

/* =========================
   UNDERVEIL SCRIPT
========================= */

const enterBtn = document.getElementById("enterBtn");

const bgMusic = document.getElementById("bgMusic");

const glitchSound = document.getElementById("glitchSound");

/* =========================
   ENTER BUTTON
========================= */

enterBtn.addEventListener("click", () => {

    /* Play ambience music */
    bgMusic.volume = 0.4;

    bgMusic.play();

    /* Play glitch sound */
    glitchSound.volume = 0.7;

    glitchSound.play();

    /* Start transition */
    startTransition();

});

/* =========================
   GLITCH TRANSITION
========================= */

function startTransition(){

    /* Screen flash */
    document.body.style.animation =
    "flash 0.15s 3";

    /* Random glitch effect */
    let glitchInterval = setInterval(() => {

        document.querySelector(".glitch-overlay")
        .style.opacity =
        Math.random();

    }, 50);

    /* Fake boot sequence */
    setTimeout(() => {

        showBootScreen();

    }, 800);

    /* Stop glitch later */
    setTimeout(() => {

        clearInterval(glitchInterval);

    }, 3000);
}

/* =========================
   BOOT SCREEN
========================= */

function showBootScreen(){

    document.body.innerHTML = `

    <div class="boot-screen">

        <div class="boot-text" id="bootText">

        [ SYSTEM ] USER INTERACTION DETECTED...<br><br>

        </div>

    </div>

    `;

    typeBootText();
}

/* =========================
   TYPEWRITER EFFECT
========================= */

function typeBootText(){

    const bootText =
    document.getElementById("bootText");

    const lines = [

        "[ SYSTEM ] Initializing underground core...",
        "[ SYSTEM ] Restoring broken memories...",
        "[ SYSTEM ] Timeline corruption detected...",
        "[ SYSTEM ] NØX entity awakening...",
        "[ NØX ] ...Can you hear me?",
        "",
        "[ ACCESS GRANTED ]"

    ];

    let lineIndex = 0;

    function typeLine(){

        if(lineIndex >= lines.length){

            setTimeout(() => {

                /* Redirect to chat page */
                window.location.href =
                "pages/chat.html";

            }, 1500);

            return;
        }

        let text = lines[lineIndex];

        let charIndex = 0;

        let lineElement =
        document.createElement("div");

        bootText.appendChild(lineElement);

        const typingInterval =
        setInterval(() => {

            lineElement.innerHTML +=
            text.charAt(charIndex);

            charIndex++;

            /* Typing Sound */
            playTyping();

            if(charIndex >= text.length){

                clearInterval(typingInterval);

                lineIndex++;

                setTimeout(typeLine, 400);
            }

        }, 35);
    }

    typeLine();
}

/* =========================
   TYPING SOUND
========================= */

function playTyping(){

    const audio =
    new Audio("assets/typing.wav");

    audio.volume = 0.15;

    audio.play();
}

/* =========================
   RANDOM GLITCH EVENT
========================= */

setInterval(() => {

    const overlay =
    document.querySelector(".glitch-overlay");

    overlay.style.opacity =
    Math.random() * 0.15;

}, 400);

/* =========================
   FLASH EFFECT
========================= */

const style =
document.createElement("style");

style.innerHTML = `

@keyframes flash{

    0%{
        filter:brightness(1);
    }

    50%{
        filter:brightness(2);
    }

    100%{
        filter:brightness(1);
    }
}

.boot-screen{

    width:100%;
    height:100vh;

    background:black;

    color:#b30000;

    font-family:'Press Start 2P', cursive;

    display:flex;

    justify-content:center;

    align-items:center;

    padding:40px;

    line-height:2;

    font-size:12px;

    text-shadow:0 0 10px red;

    animation:flickerBoot 0.2s infinite;
}

@keyframes flickerBoot{

    0%{
        opacity:1;
    }

    50%{
        opacity:0.92;
    }

    100%{
        opacity:1;
    }
}

`;

document.head.appendChild(style);

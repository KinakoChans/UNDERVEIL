document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("sendBtn");
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    btn.addEventListener("click", async () => {

        const text = input.value;

        if (!text) return;

        output.innerHTML += `<div class="message user">> ${text}</div>`;

        input.value = "";

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await res.json();

        output.innerHTML += `<div class="message ai">EMELY: ${data.reply}</div>`;

        output.scrollTop = output.scrollHeight;
    });

});

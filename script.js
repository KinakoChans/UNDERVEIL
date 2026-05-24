document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("sendBtn");
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    button.addEventListener("click", async () => {

        const text = input.value;

        if (!text) {
            console.log("Input kosong");
            return;
        }

        output.innerHTML = "Emely sedang berpikir...";

        try {

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: text
                })
            });

            const data = await response.json();

            output.innerHTML = data.reply;

        } catch (err) {
            console.log(err);
            output.innerHTML = "Error koneksi ke Emely";
        }

    });

});

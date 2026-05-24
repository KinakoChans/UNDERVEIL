export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { message } = req.body;

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    model:
                    "qwen/qwen3-coder:free",

                    messages: [

                        {
                            role: "system",

                            content: `
You are EMELY.

You speak like a mysterious underground AI.

Rules:
- speak naturally
- short responses
- emotional but calm
- no markdown
- no role labels
- respond as EMELY directly
`
                        },

                        {
                            role: "user",
                            content: message
                        }

                    ]

                })

            }
        );

        const data =
        await response.json();

        const reply =
        data?.choices?.[0]?.message?.content
        ||
        "...signal interrupted...";

        return res.status(200).json({
            reply
        });

    }

    catch (err) {

        return res.status(500).json({

            reply:
            "[ SYSTEM ] Connection failed"

        });

    }

    }

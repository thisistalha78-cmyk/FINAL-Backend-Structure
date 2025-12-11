import fetch from "node-fetch";

export default async function generateSummary(text) {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            console.log("❌ OPENROUTER_API_KEY missing!");
            return "Missing API key.";
        }

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://yourdomain.com",
                "X-Title": "DealFury Summary"
            },
            body: JSON.stringify({
                model: "google/gemma-2-9b-it:free",
                messages: [
                    { role: "system", content: "Summarize the shopping deals clearly." },
                    { role: "user", content: text }
                ]
            })
        });

        const data = await res.json();

        return data?.choices?.[0]?.message?.content || "Summary unavailable.";

    } catch (err) {
        console.error("OpenRouter Error:", err);
        return "Summary generation failed.";
    }
}

async function getQuote() {
  const theme = document.getElementById("theme").value;
  const category = document.getElementById("category").value;

  const responseDiv = document.getElementById("response");
  responseDiv.innerHTML = "Thinking...";

  const prompt = `Suggest a reflective quote based on this theme: ${theme} and this source type: ${category}. Include the quote, author, and source.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100
    })
  });

  const data = await res.json();
  const quote = data.choices?.[0]?.message?.content || "Something went wrong.";
  responseDiv.innerHTML = quote;
}

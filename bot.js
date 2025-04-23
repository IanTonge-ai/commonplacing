const res = await fetch("/.netlify/functions/getQuote", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ theme, category }),
});

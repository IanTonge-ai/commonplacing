async function getQuote() {
  console.log("getQuote triggered");

  const theme = document.getElementById("theme").value;
  const category = document.getElementById("category").value;
  const responseDiv = document.getElementById("response");

  responseDiv.innerHTML = "Thinking...";

  const res = await fetch("/.netlify/functions/getQuote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ theme, category }),
  });

  const data = await res.json();
  const quote = data.quote || "Something went wrong.";
  responseDiv.innerHTML = quote;
}

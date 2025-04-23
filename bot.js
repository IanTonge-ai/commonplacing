async function getQuote() {
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
  responseDiv.innerHTML = data.quote || "Something went wrong.";
}

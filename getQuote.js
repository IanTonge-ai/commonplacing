
const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { theme, category } = JSON.parse(event.body);
    console.log("Received theme:", theme);
    console.log("Received category:", category);

    const prompt = `Suggest a reflective quote based on this theme: ${theme} and this source type: ${category}. Include the quote, author, and source.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", JSON.stringify(data));

    if (!data.choices || !data.choices[0]) {
      throw new Error("Invalid response structure from OpenAI");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        quote: data.choices[0].message.content.trim(),
      }),
    };

  } catch (error) {
    console.error("Error in getQuote function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error. Check function logs for details." }),
    };
  }
};

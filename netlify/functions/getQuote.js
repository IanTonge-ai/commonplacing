
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { theme, category } = JSON.parse(event.body);

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
  return {
    statusCode: 200,
    body: JSON.stringify({
      quote: data.choices?.[0]?.message?.content || 'No quote found.',
    }),
  };
};


/**
 * Placeholder Gemini client.
 * For real usage replace endpoint and auth with the correct Gemini/Google generative models API you're authorized to use.
 * If GEMINI_API_KEY isn't provided, the worker uses a mock planner.
 */

const fetch = require('node-fetch');

async function plan(idea, platform) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null; // signals worker to use mock
  const resp = await fetch('https://api.example.com/gemini/flash', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
    body: JSON.stringify({ prompt: `Create a structured plan for: ${idea}`, max_tokens: 800 })
  });
  const data = await resp.json();
  return data.plan;
}

module.exports = { plan };

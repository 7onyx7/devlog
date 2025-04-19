require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1';

/**
 * Summarize a git diff using Generative Language REST API.
 * @param {string} diffText
 * @returns {Promise<string>}
 */
async function summarizeDiff(diffText) {
  // Use latest stable version of Gemini API
  const url = `${BASE_URL}/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Summarize the following code diff in a concise bullet list:\n${diffText}`
          }
        ]
      }
    ],
    generation_config: {
      temperature: 0.3,
      max_output_tokens: 150
    }
  };
  try {
    const res = await axios.post(url, payload);
    console.log('API Response:', JSON.stringify(res.data).slice(0, 100) + '...');
    // Extract text content from response
    return res.data.candidates?.[0]?.content?.parts?.[0]?.text.trim() || '';
  } catch (err) {
    console.error('Gemini API error:', err.response?.data?.error?.message || err.message);
    return '';
  }
}

module.exports = { summarizeDiff };
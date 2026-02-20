// Nilai — XML Response Parser
// Extracts structured sections from AI response

/**
 * Parse XML-tagged response from the AI into structured sections
 * @param {string} text - Raw AI response with XML tags
 * @returns {Object} - Parsed sections
 */
function parseResponse(text) {
  if (!text) return { raw: '' };

  const sections = {
    thinking: extractTag(text, 'thinking'),
    alignment: extractTag(text, 'alignment'),
    response: extractTag(text, 'response'),
    provisions: extractTag(text, 'provisions'),
    empowerment: extractTag(text, 'empowerment'),
    raw: text
  };

  // If no tags found, treat entire response as the main response
  if (!sections.response && !sections.alignment) {
    sections.response = text
      .replace(/<thinking>[\s\S]*?<\/thinking>/gi, '')
      .trim();
  }

  return sections;
}

/**
 * Extract content between XML tags
 * @param {string} text - Full text
 * @param {string} tag - Tag name to extract
 * @returns {string|null} - Content between tags, or null
 */
function extractTag(text, tag) {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

module.exports = { parseResponse };

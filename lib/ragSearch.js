// ARAM — Adaptive RAG Search Engine v2
// Semantic search with synonym expansion, n-gram matching, and concept awareness
// No external API needed — runs entirely on the server

const { constitutionalData } = require('../data/constitution');
const { loadLawsFromMarkdown } = require('../data/loadLaws');

// ═══════════════════════════════════════════════════════════════
// LOAD ALL KNOWLEDGE — Constitution + MD Law Files
// ═══════════════════════════════════════════════════════════════

const mdLawEntries = loadLawsFromMarkdown();
const allKnowledgeData = [...constitutionalData, ...mdLawEntries];
console.log(`[ARAM RAG] Knowledge base: ${constitutionalData.length} constitutional + ${mdLawEntries.length} MD law entries = ${allKnowledgeData.length} total`);

// ═══════════════════════════════════════════════════════════════
// SYNONYM EXPANSION — Maps everyday language to constitutional terms
// ═══════════════════════════════════════════════════════════════

const SYNONYM_MAP = {
  // Employment
  'fired': ['terminated', 'dismissed', 'employment', 'job', 'work', 'retrenchment', 'labour'],
  'job': ['employment', 'work', 'occupation', 'livelihood', 'profession', 'labour'],
  'salary': ['wage', 'pay', 'remuneration', 'compensation', 'earnings', 'income'],
  'boss': ['employer', 'management', 'company', 'factory', 'establishment'],
  'overtime': ['working hours', 'labour', 'just conditions', 'humane', 'work'],

  // Police / Crime
  'arrest': ['detention', 'custody', 'personal liberty', 'habeas corpus', 'Article 22'],
  'police': ['law enforcement', 'arrest', 'custody', 'FIR', 'station', 'complaint'],
  'jail': ['prison', 'custody', 'detention', 'imprisoned', 'confinement'],
  'beat': ['torture', 'cruel', 'inhuman', 'force', 'violence', 'custodial'],
  'fir': ['first information report', 'complaint', 'police', 'cognizable'],

  // Education
  'school': ['education', 'institution', 'learning', 'RTE', 'Article 21A', 'teacher'],
  'college': ['education', 'university', 'higher education', 'institution', 'admission'],
  'exam': ['examination', 'assessment', 'merit', 'selection', 'qualification'],
  'fees': ['tuition', 'charges', 'cost', 'education', 'capitation'],

  // Health
  'hospital': ['medical', 'health', 'treatment', 'doctor', 'patient', 'care'],
  'sick': ['illness', 'disease', 'health', 'medical', 'treatment', 'unwell'],
  'doctor': ['medical', 'physician', 'hospital', 'treatment', 'health', 'negligence'],
  'medicine': ['drug', 'treatment', 'health', 'pharmaceutical', 'prescription'],

  // Property
  'house': ['property', 'shelter', 'home', 'residence', 'dwelling', 'housing'],
  'land': ['property', 'acquisition', 'compensation', 'Article 300A', 'immovable'],
  'rent': ['tenant', 'landlord', 'lease', 'eviction', 'dwelling'],
  'evict': ['eviction', 'removal', 'displacement', 'shelter', 'right to shelter'],

  // Family
  'divorce': ['separation', 'marriage', 'maintenance', 'alimony', 'personal law'],
  'dowry': ['demand', 'harassment', 'bride', 'marriage', 'cruelty', '498A'],
  'husband': ['spouse', 'marriage', 'domestic', 'maintenance', 'family'],
  'wife': ['spouse', 'marriage', 'domestic', 'maintenance', 'women', 'family'],

  // Rights generic
  'right': ['fundamental right', 'constitutional', 'entitlement', 'protection', 'freedom'],
  'freedom': ['liberty', 'right', 'fundamental', 'Article 19', 'Article 21'],
  'equal': ['equality', 'discrimination', 'Article 14', 'non-discrimination', 'uniform'],
  'fair': ['justice', 'fairness', 'equality', 'impartial', 'reasonable', 'just'],
  'unfair': ['discrimination', 'inequality', 'unjust', 'arbitrary', 'unreasonable', 'bias'],
  'protest': ['assembly', 'demonstration', 'rally', 'strike', 'march', 'Article 19'],
  'vote': ['election', 'franchise', 'ballot', 'democracy', 'electoral', 'voting'],

  // Digital / Tech
  'internet': ['online', 'digital', 'cyber', 'technology', 'access', 'web'],
  'hack': ['cyber crime', 'data breach', 'unauthorized access', 'IT Act', 'security'],
  'troll': ['harassment', 'cyberbullying', 'abuse', 'online', 'social media'],
  'photo': ['image', 'picture', 'visual', 'photograph', 'privacy', 'consent'],

  // Environment
  'pollution': ['environment', 'contamination', 'clean', 'toxic', 'emission', 'Article 21'],
  'forest': ['environment', 'ecology', 'deforestation', 'wildlife', 'Article 48A'],
  'water': ['clean water', 'drinking', 'sanitation', 'Article 21', 'pollution'],

  // Governance
  'corruption': ['bribery', 'misuse', 'abuse of power', 'lokpal', 'RTI', 'transparency'],
  'rti': ['right to information', 'transparency', 'public authority', 'disclosure', 'accountability'],
  'pil': ['public interest litigation', 'writ', 'Article 32', 'Article 226', 'court'],

  // General concepts
  'money': ['compensation', 'wages', 'finance', 'payment', 'economic', 'income'],
  'tax': ['taxation', 'levy', 'duty', 'GST', 'income tax', 'fiscal'],
  'food': ['nutrition', 'hunger', 'mid-day meal', 'PDS', 'Article 21', 'right to food'],
  'poor': ['poverty', 'below poverty line', 'economically weaker', 'destitute', 'welfare'],

  // New Criminal Laws (BNS / BNSS / BSA)
  'bns': ['bharatiya nyaya sanhita', 'new ipc', 'indian penal code replacement', 'criminal law 2023'],
  'bnss': ['bharatiya nagarik suraksha sanhita', 'new crpc', 'criminal procedure replacement'],
  'bsa': ['bharatiya sakshya adhiniyam', 'new evidence act', 'evidence law replacement'],
  'ipc': ['indian penal code', 'bns', 'bharatiya nyaya sanhita', 'penal', 'criminal'],
  'crpc': ['criminal procedure', 'bnss', 'bharatiya nagarik suraksha sanhita', 'procedure'],
  'murder': ['homicide', 'killing', 'death', 'section 103', 'bns 103', 'section 302'],
  'sedition': ['sovereignty', 'section 152', 'bns 152', 'treason', 'anti-national'],
  'lynching': ['mob violence', 'group killing', 'mob lynching', 'section 103'],
  'community service': ['punishment', 'minor offence', 'bns section 4'],
  'zero fir': ['fir', 'police', 'complaint', 'any station', 'bnss'],

  // Data Protection (DPDP)
  'dpdp': ['data protection', 'digital personal data', 'privacy', 'dpdp act'],
  'data breach': ['leak', 'hack', 'unauthorized access', 'security breach', 'dpdp'],
  'data privacy': ['personal data', 'consent', 'data protection', 'dpdp', 'privacy'],
  'consent': ['permission', 'agree', 'data collection', 'dpdp', 'data fiduciary'],
};

/**
 * Expand query with synonyms for broader matching
 */
function expandQuery(query) {
  const tokens = tokenize(query);
  const expanded = new Set(tokens);

  for (const token of tokens) {
    // Check exact match
    if (SYNONYM_MAP[token]) {
      for (const syn of SYNONYM_MAP[token]) {
        for (const synToken of tokenize(syn)) {
          expanded.add(synToken);
        }
      }
    }
    // Check partial match (e.g., "arrested" matches "arrest")
    for (const [key, syns] of Object.entries(SYNONYM_MAP)) {
      if (token.startsWith(key) || key.startsWith(token)) {
        for (const syn of syns) {
          for (const synToken of tokenize(syn)) {
            expanded.add(synToken);
          }
        }
      }
    }
  }

  return [...expanded];
}

/**
 * Generate n-grams (bigrams and trigrams) from tokens for phrase matching
 */
function generateNgrams(tokens, n = 2) {
  const ngrams = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
}

/**
 * Tokenize and normalize text for search
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

/**
 * Calculate relevance score — now with synonym expansion and n-gram matching
 */
function calculateScore(query, doc, expandedTokens) {
  const queryTokens = tokenize(query);
  const docText = `${doc.title} ${doc.text} ${doc.keywords.join(' ')}`.toLowerCase();
  const docTokens = tokenize(docText);
  const docTokenSet = new Set(docTokens);

  let score = 0;

  // 1. Direct keyword matches (highest weight)
  for (const keyword of doc.keywords) {
    if (query.toLowerCase().includes(keyword.toLowerCase())) {
      score += 10;
    }
  }

  // 2. Original token overlap
  for (const token of queryTokens) {
    if (docTokenSet.has(token)) {
      score += 3;
    }
    if (docText.includes(token)) {
      score += 1;
    }
  }

  // 3. SYNONYM-EXPANDED token overlap (NEW)
  for (const token of expandedTokens) {
    if (!queryTokens.includes(token)) { // Only bonus for expanded words
      if (docTokenSet.has(token)) {
        score += 2;
      }
      if (docText.includes(token)) {
        score += 0.5;
      }
    }
  }

  // 4. N-gram / phrase matching (NEW)
  const queryBigrams = generateNgrams(queryTokens, 2);
  for (const bigram of queryBigrams) {
    if (docText.includes(bigram)) {
      score += 4;
    }
  }

  // 5. Partial stem matching (NEW) — "arrested" matches "arrest", "discrimination" matches "discriminat"
  for (const token of queryTokens) {
    for (const docToken of docTokens) {
      if (token.length >= 4 && docToken.length >= 4) {
        const stem = token.substring(0, Math.min(token.length, 5));
        if (docToken.startsWith(stem) && token !== docToken) {
          score += 1.5;
          break;
        }
      }
    }
  }

  // 6. Article number mentions
  const articleMatch = query.match(/article\s*(\d+)/i);
  if (articleMatch) {
    const artNum = articleMatch[1];
    if (doc.id.includes(`art${artNum}`) || doc.text.includes(`Article ${artNum}`)) {
      score += 20;
    }
  }

  // 7. Case name mentions
  const caseNames = ['kesavananda', 'maneka', 'vishaka', 'puttaswamy', 'navtej', 'bommai', 'golaknath', 'minerva', 'indra sawhney', 'shayara', 'bandhua', 'mehta', 'lalita'];
  for (const caseName of caseNames) {
    if (query.toLowerCase().includes(caseName) && doc.text.toLowerCase().includes(caseName)) {
      score += 15;
    }
  }

  // 8. Category boost
  const categoryBoosts = {
    'arrest|police|jail|bail|custody|fir|detained': 'Procedural Rights',
    'equality|discrimination|caste|reservation': 'Fundamental Rights',
    'speech|expression|press|media|protest': 'Fundamental Rights',
    'life|liberty|dignity|privacy|health': 'Fundamental Rights',
    'women|gender|harassment|dowry|domestic': 'Rights of Women',
    'child|children|education|school|rte': 'Rights of Children',
    'sc\\b|st\\b|dalit|tribal|adivasi|untouchability': 'Rights of SC/ST',
    'obc|backward|mandal|creamy layer': 'Rights of OBC',
    'minority|muslim|christian|sikh|religious': 'Rights of Minorities',
    'emergency|article 356|president rule': 'Emergency Provisions',
    'amendment|amend': 'Key Amendments',
    'case|judgment|verdict|court': 'Landmark Cases',
    'property|land|acquisition|eviction|house|home': 'Procedural Rights',
    'consumer|product|defective|complaint|buy': 'Procedural Rights',
    'labour|worker|wage|factory|employee|job|work|salary|fired': 'Procedural Rights',
    'rti|information|transparency': 'Contemporary Issues',
    'pil|public interest': 'Contemporary Issues',
    'religion|temple|mosque|church|pray|faith': 'Fundamental Rights',
    'panchayat|village|local|gram sabha': 'Local Government',
    'parliament|rajya|lok sabha|legislation': 'Parliament',
    'supreme court|high court|judiciary|judge|writ': 'Judiciary',
    'president|prime minister|executive': 'The Union Executive',
    'federal|centre state|cooperative': 'Federalism',
    'internet|cyber|online|digital|technology|hack': 'Contemporary Issues',
    'environment|pollution|forest|wildlife|ngt|climate': 'Fundamental Rights',
    'marriage|divorce|family|domestic|maintenance': 'Rights of Women',
  };

  for (const [pattern, category] of Object.entries(categoryBoosts)) {
    if (new RegExp(pattern, 'i').test(query) && doc.category === category) {
      score += 5;
    }
  }

  return score;
}

/**
 * Search the constitutional knowledge base
 * Returns the top N most relevant passages for a given query
 *
 * @param {string} query - The user's question
 * @param {number} topN - Number of results to return (default: 5)
 * @returns {Array} - Array of relevant constitutional passages with scores
 */
function searchConstitution(query, topN = 5) {
  if (!query || query.trim().length === 0) return [];

  // Expand query with synonyms for broader matching
  const expandedTokens = expandQuery(query);

  const scored = allKnowledgeData.map(doc => ({
    ...doc,
    score: calculateScore(query, doc, expandedTokens)
  }));

  // Sort by score descending and return top N
  scored.sort((a, b) => b.score - a.score);

  // Only return passages with a minimum relevance score
  return scored
    .filter(doc => doc.score > 0)
    .slice(0, topN)
    .map(doc => ({
      id: doc.id,
      title: doc.title,
      text: doc.text,
      category: doc.category,
      score: doc.score
    }));
}

/**
 * Format search results into a context string for the AI prompt
 */
function formatContext(results) {
  if (!results || results.length === 0) {
    return '<context>No specific constitutional provisions found for this query. Use your general constitutional knowledge.</context>';
  }

  const passages = results.map((r, i) =>
    `[${i + 1}] ${r.title}\n${r.text}`
  ).join('\n\n');

  return `<context>\nThe following constitutional provisions, cases, and principles are relevant to the user's question:\n\n${passages}\n</context>`;
}

module.exports = { searchConstitution, formatContext };

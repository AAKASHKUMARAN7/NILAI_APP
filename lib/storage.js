// Nilai — localStorage Memory Manager
// Saves and loads user's past conversations and learned patterns

const MEMORY_KEY = 'nilai_memory';
const LEARNING_KEY = 'nilai_learned';
const MAX_MEMORY = 50; // Max past questions to remember

/**
 * Load saved memory from localStorage
 */
function loadMemory() {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(MEMORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Save a new question-answer pair to memory
 */
function saveMemory(question, answerSummary) {
  if (typeof window === 'undefined') return;
  try {
    const memory = loadMemory();
    memory.unshift({
      question,
      summary: answerSummary,
      timestamp: Date.now()
    });

    // Keep only recent entries
    if (memory.length > MAX_MEMORY) {
      memory.length = MAX_MEMORY;
    }

    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
  } catch {
    // localStorage might be full
  }
}

/**
 * Clear all memory
 */
function clearMemory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(MEMORY_KEY);
  localStorage.removeItem(LEARNING_KEY);
}

/**
 * Get memory count
 */
function getMemoryCount() {
  return loadMemory().length;
}

// ═══ DYNAMIC LEARNING SYSTEM ═══
// Nilai learns from user interactions and improves over time

/**
 * Load learned patterns
 */
function loadLearned() {
  if (typeof window === 'undefined') return { patterns: [], feedback: [] };
  try {
    const data = localStorage.getItem(LEARNING_KEY);
    return data ? JSON.parse(data) : { patterns: [], feedback: [] };
  } catch {
    return { patterns: [], feedback: [] };
  }
}

/**
 * Record a user interaction for learning
 * Tracks what questions users ask most and what topics recur
 */
function recordInteraction(question, topics, wasHelpful) {
  if (typeof window === 'undefined') return;
  try {
    const learned = loadLearned();

    // Track topic frequency
    for (const topic of topics) {
      const existing = learned.patterns.find(p => p.topic === topic);
      if (existing) {
        existing.count += 1;
        existing.lastSeen = Date.now();
      } else {
        learned.patterns.push({
          topic,
          count: 1,
          lastSeen: Date.now()
        });
      }
    }

    // Track feedback
    if (wasHelpful !== undefined) {
      learned.feedback.push({
        question: question.substring(0, 100),
        helpful: wasHelpful,
        timestamp: Date.now()
      });
    }

    // Keep patterns manageable
    learned.patterns.sort((a, b) => b.count - a.count);
    if (learned.patterns.length > 100) learned.patterns.length = 100;
    if (learned.feedback.length > 200) learned.feedback.length = 200;

    localStorage.setItem(LEARNING_KEY, JSON.stringify(learned));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Get the most frequently asked topics
 */
function getTopPatterns(n = 5) {
  const learned = loadLearned();
  return learned.patterns
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

/**
 * Get learning stats
 */
function getLearningStats() {
  const learned = loadLearned();
  const memory = loadMemory();
  return {
    totalQuestions: memory.length,
    topicsLearned: learned.patterns.length,
    topPatterns: getTopPatterns(5),
    feedbackCount: learned.feedback.length,
    positiveRate: learned.feedback.length > 0
      ? Math.round((learned.feedback.filter(f => f.helpful).length / learned.feedback.length) * 100)
      : 0
  };
}

module.exports = {
  loadMemory,
  saveMemory,
  clearMemory,
  getMemoryCount,
  recordInteraction,
  getTopPatterns,
  getLearningStats,
  loadLearned
};

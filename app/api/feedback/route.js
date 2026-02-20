// ARAM — API Route: User Feedback for Dynamic Learning
// Records what was helpful/unhelpful to improve over time

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const FEEDBACK_DIR = join(process.cwd(), 'data', 'feedback');
const FEEDBACK_FILE = join(FEEDBACK_DIR, 'interactions.json');

function loadFeedbackData() {
  try {
    if (existsSync(FEEDBACK_FILE)) {
      return JSON.parse(readFileSync(FEEDBACK_FILE, 'utf-8'));
    }
  } catch {
    // ignore
  }
  return { interactions: [], topicFrequency: {}, totalQuestions: 0 };
}

function saveFeedbackData(data) {
  try {
    if (!existsSync(FEEDBACK_DIR)) {
      mkdirSync(FEEDBACK_DIR, { recursive: true });
    }
    writeFileSync(FEEDBACK_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to save feedback:', err);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { question, topics, helpful, sessionId } = body;

    const data = loadFeedbackData();

    // Record the interaction
    data.interactions.push({
      question: (question || '').substring(0, 200),
      topics: topics || [],
      helpful: helpful !== undefined ? helpful : null,
      sessionId: sessionId || 'unknown',
      timestamp: new Date().toISOString()
    });

    // Update topic frequency
    if (topics && Array.isArray(topics)) {
      for (const topic of topics) {
        data.topicFrequency[topic] = (data.topicFrequency[topic] || 0) + 1;
      }
    }

    data.totalQuestions += 1;

    // Keep last 1000 interactions on disk
    if (data.interactions.length > 1000) {
      data.interactions = data.interactions.slice(-1000);
    }

    saveFeedbackData(data);

    return Response.json({ success: true, totalLearned: data.totalQuestions });

  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = loadFeedbackData();

    // Return learning stats
    const stats = {
      totalQuestions: data.totalQuestions,
      topTopics: Object.entries(data.topicFrequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([topic, count]) => ({ topic, count })),
      recentQuestions: data.interactions.slice(-5).map(i => ({
        question: i.question,
        helpful: i.helpful,
        timestamp: i.timestamp
      }))
    };

    return Response.json(stats);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

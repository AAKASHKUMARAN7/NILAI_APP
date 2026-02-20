// ARAM — API Route: Chat with Local Constitutional Reasoning Engine
// Custom-built model + RAG retrieval from constitutional knowledge base
// No external API keys needed — runs entirely on your server

import { searchConstitution } from '../../../lib/ragSearch';
import { runInference } from '../../../lib/localModel';

export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body.message || '';
    const conversationHistory = body.messages || [];

    // ═══ RAG STEP: Search constitutional knowledge base ═══
    const relevantPassages = searchConstitution(userMessage, 5);

    // ═══ LOCAL MODEL INFERENCE ═══
    // Run ARAM's own constitutional reasoning engine
    const text = runInference(userMessage, relevantPassages, conversationHistory);

    return Response.json({
      text,
      sources: relevantPassages.map(p => ({
        title: p.title,
        category: p.category,
        score: p.score
      }))
    });

  } catch (err) {
    console.error('Server error:', err);
    return Response.json(
      { text: 'Server error: ' + err.message },
      { status: 500 }
    );
  }
}

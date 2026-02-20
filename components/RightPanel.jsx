'use client';

import { useState } from 'react';

// ARAM — Right Panel
// Tab 1: Reasoning Trace (shows AI's chain of thought)
// Tab 2: About ARAM

export default function RightPanel({ thinkingTrace, sources }) {
  const [activeTab, setActiveTab] = useState('reasoning');

  return (
    <aside className="right-panel">
      {/* Tab buttons */}
      <div className="panel-tabs">
        <button
          className={`panel-tab ${activeTab === 'reasoning' ? 'active' : ''}`}
          onClick={() => setActiveTab('reasoning')}
        >
          🧠 Reasoning
        </button>
        <button
          className={`panel-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          🪔 About
        </button>
      </div>

      {/* Reasoning Tab */}
      {activeTab === 'reasoning' && (
        <div className="panel-content">
          {thinkingTrace ? (
            <>
              <h3 className="panel-section-title">Chain of Thought</h3>
              <div className="thinking-trace">
                {thinkingTrace.split('\n').map((line, i) => (
                  <p key={i} className="trace-line">{line}</p>
                ))}
              </div>
              {sources && sources.length > 0 && (
                <>
                  <h3 className="panel-section-title">RAG Sources Retrieved</h3>
                  <div className="sources-list-panel">
                    {sources.map((s, i) => (
                      <div key={i} className="source-item-panel">
                        <span className="source-category">{s.category}</span>
                        <span className="source-title-panel">{s.title}</span>
                        <span className="source-score">Score: {s.score}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="panel-empty">
              <p>🧠 Reasoning trace will appear here after you ask a question.</p>
              <p className="panel-empty-hint">
                ARAM shows its constitutional reasoning chain — how it identified values,
                matched provisions, and arrived at its answer.
              </p>
            </div>
          )}
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="panel-content">
          <h3 className="panel-section-title">About அறம் ARAM</h3>

          <div className="about-section">
            <h4>What is ARAM?</h4>
            <p>
              ARAM (அறம்) means Dharma, Righteousness, and Virtue in Tamil.
              It is a Constitutional Intelligence AI that helps every Indian understand
              how the Constitution applies to their real-life situation.
            </p>
          </div>

          <div className="about-section">
            <h4>How is ARAM Different?</h4>
            <p>
              Most legal tools work like a search engine: keyword → matching articles.
              ARAM is different. It <strong>reasons</strong> through constitutional values,
              identifies what&apos;s at stake, and then maps to specific provisions.
            </p>
          </div>

          <div className="about-section">
            <h4>RAG Knowledge Base</h4>
            <p>
              ARAM uses a built-in knowledge base containing the full Indian Constitution —
              all major Articles, Schedules, Amendments, and Landmark Supreme Court cases.
              When you ask a question, ARAM searches this knowledge base first, then reasons
              using the most relevant passages.
            </p>
          </div>

          <div className="about-section">
            <h4>Dynamic Learning</h4>
            <p>
              ARAM learns from every interaction. It tracks which topics are asked most,
              records feedback on helpfulness, and uses this to improve over time.
              The more you use ARAM, the smarter it gets.
            </p>
          </div>

          <div className="about-section">
            <h4>The Logo</h4>
            <p>
              The golden elder&apos;s footprint beside the small ivory child&apos;s footprint
              represents the Constitution&apos;s promise: to protect every generation — from
              the child taking first steps to the elder who has walked this republic for decades.
            </p>
          </div>

          <div className="about-section">
            <h4>Architecture</h4>
            <ul className="about-list">
              <li><strong>Layer 1:</strong> Constitutional deep knowledge in system prompt</li>
              <li><strong>Layer 2:</strong> RAG retrieval from 80+ constitutional passages</li>
              <li><strong>Layer 3:</strong> Landmark case reasoning patterns</li>
              <li><strong>Layer 4:</strong> Dynamic learning from user interactions</li>
            </ul>
          </div>

          <div className="about-quote">
            &quot;We, the people of India… secure to all citizens Justice, Liberty, Equality and Fraternity&quot;
          </div>

          <div className="about-credits">
            <p>Stack: Next.js + Groq + RAG</p>
            <p>Cost: ₹0</p>
          </div>
        </div>
      )}
    </aside>
  );
}

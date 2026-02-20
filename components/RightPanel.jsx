'use client';

import { useState } from 'react';

// Nilai — Right Panel
// Tab 1: Reasoning Trace (shows AI's chain of thought)
// Tab 2: About Nilai

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
          Reasoning
        </button>
        <button
          className={`panel-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
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
              <p>Reasoning trace will appear here after you ask a question.</p>
              <p className="panel-empty-hint">
                Nilai shows its constitutional reasoning chain — how it identified values,
                matched provisions, and arrived at its answer.
              </p>
            </div>
          )}
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="panel-content">
          <h3 className="panel-section-title">About நிலை Nilai</h3>

          <div className="about-section">
            <h4>What is Nilai?</h4>
            <p>
              Nilai (நிலை) means "State of Being" in Tamil.
              It is a Constitutional Intelligence AI that helps every Indian understand
              how the Constitution applies to their real-life situation.
              Body, Mind, and Action — when these three align, that is நிலை.
            </p>
          </div>

          <div className="about-section">
            <h4>How is Nilai Different?</h4>
            <p>
              Most legal tools work like a search engine: keyword → matching articles.
              Nilai is different. It <strong>reasons</strong> through constitutional values,
              identifies what&apos;s at stake, and then maps to specific provisions.
            </p>
          </div>

          <div className="about-section">
            <h4>RAG Knowledge Base</h4>
            <p>
              Nilai uses a built-in knowledge base containing the full Indian Constitution —
              all major Articles, Schedules, Amendments, and Landmark Supreme Court cases.
              When you ask a question, Nilai searches this knowledge base first, then reasons
              using the most relevant passages.
            </p>
          </div>

          <div className="about-section">
            <h4>Dynamic Learning</h4>
            <p>
              Nilai learns from every interaction. It tracks which topics are asked most,
              records feedback on helpfulness, and uses this to improve over time.
              The more you use Nilai, the smarter it gets.
            </p>
          </div>

          <div className="about-section">
            <h4>The Logo</h4>
            <p>
              The equilateral triangle with a center dot represents three aspects of
              human existence: Body, Mind, and Action. The dot at the center represents
              the unmoving state of being — the stillness, balance, and inner calm
              that is நிலை.
            </p>
          </div>

          <div className="about-section">
            <h4>What Nilai Can Do</h4>
            <ul className="about-list">
              <li><strong>Explain</strong> any Article, Amendment, or Schedule of the Constitution</li>
              <li><strong>Analyze</strong> real-life situations and identify your constitutional rights</li>
              <li><strong>Guide</strong> you on legal remedies, helplines, and where to file complaints</li>
              <li><strong>Reference</strong> landmark Supreme Court judgments for deeper understanding</li>
            </ul>
          </div>

          <div className="about-quote">
            &quot;We, the people of India… secure to all citizens Justice, Liberty, Equality and Fraternity&quot;
          </div>

          <div className="about-credits">
            <p>Nilai — Constitutional Intelligence</p>
          </div>
        </div>
      )}
    </aside>
  );
}

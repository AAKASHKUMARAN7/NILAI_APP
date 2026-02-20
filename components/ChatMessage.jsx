'use client';

import { useState } from 'react';

// ARAM — Chat Message Component
// Renders user messages (blue) and ARAM responses (gold structured cards)

export default function ChatMessage({ message, onFeedback }) {
  const [feedbackGiven, setFeedbackGiven] = useState(null);

  if (message.role === 'user') {
    return (
      <div className="message-row user-row">
        <div className="message user-message">
          <p>{message.content}</p>
        </div>
      </div>
    );
  }

  // ARAM's response — structured sections
  const sections = message.parsed || {};
  const sources = message.sources || [];

  const handleFeedback = (helpful) => {
    setFeedbackGiven(helpful);
    if (onFeedback) onFeedback(helpful);
  };

  return (
    <div className="message-row aram-row">
      <div className="message aram-message">

        {/* Constitutional Alignment Banner */}
        {sections.alignment && (
          <div className="section alignment-section">
            <div className="section-icon">⚖️</div>
            <div className="section-label">Constitutional Alignment</div>
            <p className="alignment-text">{sections.alignment}</p>
          </div>
        )}

        {/* Main Response */}
        {sections.response && (
          <div className="section response-section">
            <div className="section-label">🪔 ARAM's Response</div>
            <div className="response-text">
              {sections.response.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* Provisions & Cases */}
        {sections.provisions && (
          <div className="section provisions-section">
            <div className="section-label">📜 Provisions & Cases</div>
            <div className="provisions-text">
              {sections.provisions.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* Empowerment — Your Constitutional Power */}
        {sections.empowerment && (
          <div className="section empowerment-section">
            <div className="section-label">💪 Your Constitutional Power</div>
            <div className="empowerment-text">
              {sections.empowerment.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* RAG Sources */}
        {sources.length > 0 && (
          <div className="section sources-section">
            <div className="section-label">📚 Knowledge Sources Used</div>
            <div className="sources-list">
              {sources.map((s, i) => (
                <span key={i} className="source-tag">
                  {s.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Fallback: if no sections parsed, show raw */}
        {!sections.response && !sections.alignment && (
          <div className="section response-section">
            <div className="response-text">
              {(sections.raw || message.content || '').split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}

        {/* Feedback buttons */}
        <div className="feedback-row">
          {feedbackGiven === null ? (
            <>
              <span className="feedback-label">Was this helpful?</span>
              <button
                className="feedback-btn helpful"
                onClick={() => handleFeedback(true)}
                title="Helpful"
              >
                👍
              </button>
              <button
                className="feedback-btn not-helpful"
                onClick={() => handleFeedback(false)}
                title="Not helpful"
              >
                👎
              </button>
            </>
          ) : (
            <span className="feedback-thanks">
              {feedbackGiven ? '🙏 Thank you! ARAM learns from your feedback.' : '🙏 Thank you. ARAM will improve.'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

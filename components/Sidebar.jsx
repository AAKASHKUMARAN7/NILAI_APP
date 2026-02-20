'use client';

import { useState } from 'react';
import NilaiLogo from './NilaiLogo';

// Nilai — Left Sidebar
// Shows constitutional topics and session memory indicator
export default function Sidebar({ topics, onTopicClick, memoryCount, onClearMemory, learningStats }) {
  const [showStats, setShowStats] = useState(false);

  return (
    <aside className="sidebar">
      {/* Logo and title */}
      <div className="sidebar-header">
        <NilaiLogo size={36} color="#8B7355" />
        <div>
          <div className="sidebar-title">நிலை Nilai</div>
          <div className="sidebar-tagline">State of Being</div>
        </div>
      </div>

      {/* Memory indicator */}
      <div className="memory-indicator">
        <span className="memory-dot" />
        <span className="memory-text">
          {memoryCount > 0
            ? `${memoryCount} past question${memoryCount > 1 ? 's' : ''} remembered`
            : 'No session memory yet'}
        </span>
        {memoryCount > 0 && (
          <button className="clear-memory-btn" onClick={onClearMemory} title="Clear memory">
            ✕
          </button>
        )}
      </div>

      {/* Learning Stats Toggle */}
      <button
        className="learning-toggle"
        onClick={() => setShowStats(!showStats)}
      >
        {showStats ? 'Hide' : 'Show'} Learning Stats
      </button>

      {showStats && learningStats && (
        <div className="learning-stats">
          <div className="stat-item">
            <span className="stat-label">Questions processed:</span>
            <span className="stat-value">{learningStats.totalQuestions || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Topics learned:</span>
            <span className="stat-value">{learningStats.topicsLearned || 0}</span>
          </div>
          {learningStats.positiveRate > 0 && (
            <div className="stat-item">
              <span className="stat-label">Helpful rate:</span>
              <span className="stat-value">{learningStats.positiveRate}%</span>
            </div>
          )}
          {learningStats.topPatterns && learningStats.topPatterns.length > 0 && (
            <div className="top-patterns">
              <span className="stat-label">Most asked topics:</span>
              {learningStats.topPatterns.map((p, i) => (
                <span key={i} className="pattern-tag">{p.topic} ({p.count})</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Topics */}
      <div className="topics-header">Constitutional Domains</div>
      <div className="topics-list">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className="topic-button"
            onClick={() => onTopicClick(topic.prompt)}
            title={topic.description}
          >
            <span className="topic-name">{topic.name}</span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>நிலை — Your Constitutional Guide</p>
      </div>
    </aside>
  );
}

'use client';

import AramLogo from './AramLogo';

// ARAM — Welcome Screen (shown before first message)
export default function WelcomeScreen({ starters, onStarterClick }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-logo">
        <AramLogo size={80} />
      </div>

      <h1 className="welcome-title">அறம்</h1>
      <h2 className="welcome-subtitle">ARAM · Constitutional Intelligence</h2>

      <p className="welcome-desc">
        Describe your situation — I&apos;ll reason through the Indian Constitution 
        to help you understand your rights.
      </p>

      <div className="welcome-features">
        <div className="feature">
          <span className="feature-icon">🧠</span>
          <span>RAG-powered knowledge: Full Constitution + Landmark Cases</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🪔</span>
          <span>Context-based reasoning, not keyword search</span>
        </div>
        <div className="feature">
          <span className="feature-icon">📖</span>
          <span>Dynamic learning: ARAM improves from every interaction</span>
        </div>
      </div>

      <div className="starters-grid">
        <p className="starters-label">Try asking:</p>
        {starters.map((s) => (
          <button
            key={s.id}
            className="starter-card"
            onClick={() => onStarterClick(s.text)}
          >
            <span className="starter-icon">{s.icon}</span>
            <span className="starter-text">{s.text}</span>
            <span className="starter-topic">{s.topic}</span>
          </button>
        ))}
      </div>

      <p className="welcome-footer">
        &quot;We, the people of India… secure to all citizens Justice, Liberty, Equality and Fraternity&quot;
      </p>
    </div>
  );
}

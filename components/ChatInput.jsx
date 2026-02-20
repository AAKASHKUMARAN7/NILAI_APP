'use client';

import { useState } from 'react';

// Nilai — Chat Input Bar (bottom of center panel)
export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-bar">
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your situation... Nilai will find the constitutional answer"
          disabled={isLoading}
          className="chat-input"
          autoFocus
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="send-button"
          title="Send"
        >
          {isLoading ? (
            <span className="spinner">⟳</span>
          ) : (
            <span>➤</span>
          )}
        </button>
      </div>
      <p className="input-hint">
        Nilai uses the Indian Constitution, landmark cases & RAG knowledge base to reason about your rights
      </p>
    </form>
  );
}

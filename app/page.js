'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import WelcomeScreen from '../components/WelcomeScreen';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import RightPanel from '../components/RightPanel';
import { STARTER_QUESTIONS } from '../constants/starters';
import { TOPICS } from '../constants/topics';
import { SYSTEM_PROMPT } from '../constants/systemPrompt';
import { parseResponse } from '../lib/parseResponse';
import {
  loadMemory,
  saveMemory,
  clearMemory,
  getMemoryCount,
  recordInteraction,
  getLearningStats
} from '../lib/storage';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memoryCount, setMemoryCount] = useState(0);
  const [thinkingTrace, setThinkingTrace] = useState(null);
  const [currentSources, setCurrentSources] = useState([]);
  const [learningStats, setLearningStats] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef(null);

  // Load memory on mount
  useEffect(() => {
    setMemoryCount(getMemoryCount());
    setLearningStats(getLearningStats());
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message to the Nilai API
  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build conversation history (last 10 messages for context)
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.role === 'user' ? m.content : (m.parsed?.raw || m.content)
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages: history,
          system: SYSTEM_PROMPT
        })
      });

      const data = await res.json();
      const parsed = parseResponse(data.text);
      const sources = data.sources || [];

      const nilaiMsg = {
        role: 'assistant',
        content: data.text,
        parsed,
        sources
      };

      setMessages(prev => [...prev, nilaiMsg]);
      setThinkingTrace(parsed.thinking);
      setCurrentSources(sources);

      // Save to memory
      const summary = parsed.alignment || parsed.response?.substring(0, 100) || '';
      saveMemory(text, summary);
      setMemoryCount(getMemoryCount());

      // Record for learning (extract topics from alignment/provisions)
      const topics = [];
      if (parsed.alignment) {
        const topicMatches = parsed.alignment.match(/Article \d+[A-Z]?/gi);
        if (topicMatches) topics.push(...topicMatches);
      }
      recordInteraction(text, topics, undefined);
      setLearningStats(getLearningStats());

      // Send feedback to server for persistent learning
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: text,
            topics,
            sessionId: 'session-' + Date.now()
          })
        });
      } catch {
        // Non-critical
      }

    } catch (err) {
      const errorMsg = {
        role: 'assistant',
        content: `Connection error: ${err.message}. Please check if the server is running.`,
        parsed: { response: `Connection error: ${err.message}. Please check if the server is running.` }
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  // Handle feedback on a message
  const handleFeedback = useCallback(async (messageIndex, helpful) => {
    const msg = messages[messageIndex - 1]; // user message before the response
    if (msg && msg.role === 'user') {
      recordInteraction(msg.content, [], helpful);
      setLearningStats(getLearningStats());

      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: msg.content,
            helpful,
            sessionId: 'session-' + Date.now()
          })
        });
      } catch {
        // Non-critical
      }
    }
  }, [messages]);

  // Clear memory
  const handleClearMemory = useCallback(() => {
    clearMemory();
    setMemoryCount(0);
    setLearningStats(getLearningStats());
  }, []);

  // Handle starter question or topic click
  const handleQuickSend = useCallback((text) => {
    sendMessage(text);
  }, [sendMessage]);

  const hasMessages = messages.length > 0;

  return (
    <div className="nilai-app">
      {/* Mobile sidebar toggle */}
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Left Sidebar */}
      <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar
          topics={TOPICS}
          onTopicClick={(prompt) => {
            setSidebarOpen(false);
            handleQuickSend(prompt);
          }}
          memoryCount={memoryCount}
          onClearMemory={handleClearMemory}
          learningStats={learningStats}
        />
      </div>

      {/* Center Chat */}
      <main className="chat-main">
        <div className="chat-scroll">
          {!hasMessages ? (
            <WelcomeScreen
              starters={STARTER_QUESTIONS}
              onStarterClick={handleQuickSend}
            />
          ) : (
            <div className="messages-list">
              {messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  message={msg}
                  onFeedback={msg.role === 'assistant' ? (helpful) => handleFeedback(i, helpful) : undefined}
                />
              ))}
              {isLoading && (
                <div className="message-row nilai-row">
                  <div className="message nilai-message loading-message">
                    <div className="loading-dots">
                      <span className="dot dot1">●</span>
                      <span className="dot dot2">●</span>
                      <span className="dot dot3">●</span>
                    </div>
                    <p className="loading-text">Nilai is reasoning through the Constitution...</p>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input bar */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </main>

      {/* Right Panel */}
      <RightPanel
        thinkingTrace={thinkingTrace}
        sources={currentSources}
      />
    </div>
  );
}

# Directory Structure
```
public/
  index.html
src/
  client/
    components/
      ChatInterface.tsx
      Header.tsx
      LoadingScreen.tsx
    App.tsx
    main.tsx
  input.css
  output.css
  server.ts
bunfig.toml
package.json
tailwind.config.ts
tsconfig.json
```

# Files

## File: public/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CIPHER - LLM Interface</title>
    <!-- Reference TailwindCSS in your HTML -->
    <link rel="stylesheet" href="tailwindcss" />
    <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'cipher-gold': '#C5A572',
            'cipher-dark': '#1a1a1a',
            'cipher-gray': '#2a2a2a'
          },
          fontFamily: {
            'mono': ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace']
          }
        }
      }
    };
    </script>
    <style>
    body {
      background-color: #000;
      background-image:
        linear-gradient(rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.8)),
        radial-gradient(circle at 25% 25%, rgba(197, 165, 114, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(197, 165, 114, 0.1) 0%, transparent 50%);
    }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/client/main.tsx"></script>
  </body>
</html>
```

## File: src/client/components/ChatInterface.tsx
```typescript
import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../App";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) -> void;
  isProcessing: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isProcessing
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-8">
      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="mb-8 max-h-96 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg font-mono text-sm ${
                  message.role === "user"
                    ? "bg-cipher-gold/20 text-white border border-cipher-gold/40"
                    : "bg-cipher-gray/50 text-cipher-gold border border-cipher-gray"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs opacity-60 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-cipher-gray/50 text-cipher-gold border border-cipher-gray px-4 py-2 rounded-lg font-mono text-sm">
                <div className="flex items-center space-x-2">
                  <span>Processing</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-cipher-gold rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-cipher-gold rounded-full animate-pulse delay-100" />
                    <div className="w-1 h-1 bg-cipher-gold rounded-full animate-pulse delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isProcessing}
              className="w-full bg-cipher-gray/30 border border-cipher-gold/30 rounded-lg px-6 py-4
                         text-white placeholder-cipher-gold/60 font-mono text-lg
                         focus:outline-none focus:border-cipher-gold/60 focus:bg-cipher-gray/50
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="ml-4 bg-cipher-gold hover:bg-cipher-gold/80 disabled:bg-cipher-gold/30
                       text-black font-mono font-bold px-8 py-4 rounded-lg
                       transition-colors duration-200 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </form>
      </div>

      {/* Bottom Status */}
      <div className="flex justify-between items-center mt-6 text-xs font-mono text-cipher-gold/60">
        <div>
          {messages.length > 0 ? `${messages.length} messages` : "Ready to chat"}
        </div>
        <div className="flex space-x-4">
          <span>Translate</span>
          <span>Support</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
```

## File: src/client/components/Header.tsx
```typescript
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-cipher-gold/20">
        <div className="flex items-center space-x-2">
          <span className="text-cipher-gold text-sm font-mono">POWERED BY</span>
          <div className="w-6 h-6 bg-cipher-gold/20 rounded border border-cipher-gold/40" />
        </div>

        <nav className="flex space-x-8">
          <a
            href="#"
            className="text-cipher-gold hover:text-white transition-colors text-sm font-mono tracking-wide"
          >
            HOME
          </a>
          <a
            href="#"
            className="text-cipher-gold hover:text-white transition-colors text-sm font-mono tracking-wide"
          >
            AGENTS
          </a>
          <a
            href="#"
            className="text-cipher-gold hover:text-white transition-colors text-sm font-mono tracking-wide"
          >
            CONCEPTS
          </a>
          <a
            href="#"
            className="text-cipher-gold hover:text-white transition-colors text-sm font-mono tracking-wide"
          >
            FORGE
          </a>
        </nav>

        <div className="bg-cipher-gray px-4 py-2 rounded border border-cipher-gold/30">
          <span className="text-cipher-gold text-sm font-mono">SELECT WALLET</span>
        </div>
      </div>

      {/* Main Logo */}
      <div className="flex justify-center py-16">
        <div className="border-2 border-cipher-gold/40 px-12 py-8">
          <h1 className="text-8xl font-mono tracking-widest text-cipher-gold">
            CIPHER
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

## File: src/client/components/LoadingScreen.tsx
```typescript
import React from "react";

interface LoadingScreenProps {
  progress: number;
  status: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, status }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-cipher-dark/80 to-black/90" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cipher-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cipher-gold/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="border-2 border-cipher-gold/40 px-8 py-6 mb-12">
          <h1 className="text-6xl font-mono tracking-widest text-cipher-gold">
            CIPHER
          </h1>
        </div>

        {/* Loading Status */}
        <div className="space-y-6">
          <div className="text-cipher-gold font-mono text-lg">
            {status}
          </div>

          {/* Progress Bar */}
          <div className="w-80 mx-auto">
            <div className="bg-cipher-gray/30 border border-cipher-gold/30 rounded-full h-2">
              <div
                className="bg-cipher-gold h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-cipher-gold/60 font-mono text-sm mt-2">
              {progress}%
            </div>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-2 h-2 bg-cipher-gold rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-cipher-gold rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-cipher-gold rounded-full animate-bounce delay-200" />
          </div>

          <div className="text-cipher-gold/60 font-mono text-sm mt-8">
            Initializing Large Language Model...
            <br />
            This may take a few minutes on first load.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
```

## File: src/client/App.tsx
```typescript
import { CreateMLCEngine, type MLCEngineInterface } from '@mlc-ai/web-llm';
import React, { useCallback, useEffect, useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const App: React.FC = () => {
  const [engine, setEngine] = useState<MLCEngineInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('Initializing...');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const initializeEngine = useCallback(async () => {
    try {
      const selectedModel = 'gemma-3-1b-it-q4bf16_1-MLC';

      const initProgressCallback = (progress: any) => {
        console.log(progress);
        if (progress.progress !== undefined) {
          setLoadingProgress(Math.round(progress.progress * 100));
        }
        if (progress.text) {
          setLoadingStatus(progress.text);
        }
      };

      setLoadingStatus('Loading model...');
      const mlcEngine = await CreateMLCEngine(selectedModel, { initProgressCallback });

      setEngine(mlcEngine);
      setIsLoading(false);
      setLoadingStatus('Ready');
    } catch (error) {
      console.error('Failed to initialize WebLLM:', error);
      setLoadingStatus('Failed to load model');
    }
  }, []);

  useEffect(() => {
    initializeEngine();
  }, [initializeEngine]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!engine || isProcessing) return;

    const userMessage: ChatMessage = { role: 'user', content: message, timestamp: Date.now() };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const chatHistory = [...messages, userMessage].map(msg => ({ role: msg.role, content: msg.content }));

      const reply = await engine.chat.completions.create({ messages: chatHistory, temperature: 0.7, max_tokens: 1000 });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: reply.choices[0]!.message.content || 'No response',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  }, [engine, messages, isProcessing]);

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} status={loadingStatus} />;
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='absolute inset-0 bg-gradient-to-br from-cipher-dark/80 to-black/90' />
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-cipher-gold/5 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cipher-gold/5 rounded-full blur-3xl' />
      </div>

      <div className='relative z-10'>
        <Header />
        <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default App;
```

## File: src/client/main.tsx
```typescript
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);
root.render(<App />);
```

## File: src/input.css
```css
@import "tailwindcss";
```

## File: src/output.css
```css
/*! tailwindcss v4.1.13 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-xs: 20rem;
    --container-md: 28rem;
    --container-4xl: 56rem;
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-6xl: 3.75rem;
    --text-6xl--line-height: 1;
    --text-8xl: 6rem;
    --text-8xl--line-height: 1;
    --font-weight-bold: 700;
    --tracking-wide: 0.025em;
    --tracking-widest: 0.1em;
    --radius-lg: 0.5rem;
    --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    --animate-bounce: bounce 1s infinite;
    --blur-3xl: 64px;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .absolute {
    position: absolute;
  }
  .relative {
    position: relative;
  }
  .static {
    position: static;
  }
  .inset-0 {
    inset: calc(var(--spacing) * 0);
  }
  .top-1\/4 {
    top: calc(1/4 * 100%);
  }
  .right-1\/4 {
    right: calc(1/4 * 100%);
  }
  .bottom-1\/4 {
    bottom: calc(1/4 * 100%);
  }
  .left-1\/4 {
    left: calc(1/4 * 100%);
  }
  .z-10 {
    z-index: 10;
  }
  .container {
    width: 100%;
    @media (width >= 40rem) {
      max-width: 40rem;
    }
    @media (width >= 48rem) {
      max-width: 48rem;
    }
    @media (width >= 64rem) {
      max-width: 64rem;
    }
    @media (width >= 80rem) {
      max-width: 80rem;
    }
    @media (width >= 96rem) {
      max-width: 96rem;
    }
  }
  .mx-auto {
    margin-inline: auto;
  }
  .mt-1 {
    margin-top: calc(var(--spacing) * 1);
  }
  .mt-2 {
    margin-top: calc(var(--spacing) * 2);
  }
  .mt-6 {
    margin-top: calc(var(--spacing) * 6);
  }
  .mt-8 {
    margin-top: calc(var(--spacing) * 8);
  }
  .mb-8 {
    margin-bottom: calc(var(--spacing) * 8);
  }
  .mb-12 {
    margin-bottom: calc(var(--spacing) * 12);
  }
  .ml-4 {
    margin-left: calc(var(--spacing) * 4);
  }
  .flex {
    display: flex;
  }
  .h-1 {
    height: calc(var(--spacing) * 1);
  }
  .h-2 {
    height: calc(var(--spacing) * 2);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
  }
  .h-96 {
    height: calc(var(--spacing) * 96);
  }
  .h-full {
    height: 100%;
  }
  .max-h-96 {
    max-height: calc(var(--spacing) * 96);
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-1 {
    width: calc(var(--spacing) * 1);
  }
  .w-2 {
    width: calc(var(--spacing) * 2);
  }
  .w-6 {
    width: calc(var(--spacing) * 6);
  }
  .w-80 {
    width: calc(var(--spacing) * 80);
  }
  .w-96 {
    width: calc(var(--spacing) * 96);
  }
  .w-full {
    width: 100%;
  }
  .max-w-4xl {
    max-width: var(--container-4xl);
  }
  .max-w-xs {
    max-width: var(--container-xs);
  }
  .flex-1 {
    flex: 1;
  }
  .animate-bounce {
    animation: var(--animate-bounce);
  }
  .animate-pulse {
    animation: var(--animate-pulse);
  }
  .flex-col {
    flex-direction: column;
  }
  .items-center {
    align-items: center;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .space-y-4 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-6 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-x-1 {
    :where(& > :not(:last-child)) {
      --tw-space-x-reverse: 0;
      margin-inline-start: calc(calc(var(--spacing) * 1) * var(--tw-space-x-reverse));
      margin-inline-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-x-reverse)));
    }
  }
  .space-x-2 {
    :where(& > :not(:last-child)) {
      --tw-space-x-reverse: 0;
      margin-inline-start: calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));
      margin-inline-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)));
    }
  }
  .space-x-4 {
    :where(& > :not(:last-child)) {
      --tw-space-x-reverse: 0;
      margin-inline-start: calc(calc(var(--spacing) * 4) * var(--tw-space-x-reverse));
      margin-inline-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-x-reverse)));
    }
  }
  .space-x-8 {
    :where(& > :not(:last-child)) {
      --tw-space-x-reverse: 0;
      margin-inline-start: calc(calc(var(--spacing) * 8) * var(--tw-space-x-reverse));
      margin-inline-end: calc(calc(var(--spacing) * 8) * calc(1 - var(--tw-space-x-reverse)));
    }
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-2 {
    border-style: var(--tw-border-style);
    border-width: 2px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .bg-black {
    background-color: var(--color-black);
  }
  .bg-gradient-to-br {
    --tw-gradient-position: to bottom right in oklab;
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
  .to-black\/90 {
    --tw-gradient-to: color-mix(in srgb, #000 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-gradient-to: color-mix(in oklab, var(--color-black) 90%, transparent);
    }
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .px-8 {
    padding-inline: calc(var(--spacing) * 8);
  }
  .px-12 {
    padding-inline: calc(var(--spacing) * 12);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .py-4 {
    padding-block: calc(var(--spacing) * 4);
  }
  .py-6 {
    padding-block: calc(var(--spacing) * 6);
  }
  .py-8 {
    padding-block: calc(var(--spacing) * 8);
  }
  .py-16 {
    padding-block: calc(var(--spacing) * 16);
  }
  .pb-8 {
    padding-bottom: calc(var(--spacing) * 8);
  }
  .text-center {
    text-align: center;
  }
  .font-mono {
    font-family: var(--font-mono);
  }
  .text-6xl {
    font-size: var(--text-6xl);
    line-height: var(--tw-leading, var(--text-6xl--line-height));
  }
  .text-8xl {
    font-size: var(--text-8xl);
    line-height: var(--tw-leading, var(--text-8xl--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .tracking-wide {
    --tw-tracking: var(--tracking-wide);
    letter-spacing: var(--tracking-wide);
  }
  .tracking-widest {
    --tw-tracking: var(--tracking-widest);
    letter-spacing: var(--tracking-widest);
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }
  .text-black {
    color: var(--color-black);
  }
  .text-white {
    color: var(--color-white);
  }
  .opacity-60 {
    opacity: 60%;
  }
  .blur-3xl {
    --tw-blur: blur(var(--blur-3xl));
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .delay-100 {
    transition-delay: 100ms;
  }
  .delay-200 {
    transition-delay: 200ms;
  }
  .delay-700 {
    transition-delay: 700ms;
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .duration-300 {
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
  .hover\:text-white {
    &:hover {
      @media (hover: hover) {
        color: var(--color-white);
      }
    }
  }
  .focus\:outline-none {
    &:focus {
      --tw-outline-style: none;
      outline-style: none;
    }
  }
  .disabled\:cursor-not-allowed {
    &:disabled {
      cursor: not-allowed;
    }
  }
  .disabled\:opacity-50 {
    &:disabled {
      opacity: 50%;
    }
  }
  .lg\:max-w-md {
    @media (width >= 64rem) {
      max-width: var(--container-md);
    }
  }
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-space-x-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-gradient-position {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-via {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-to {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-via-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0%;
}
@property --tw-gradient-via-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 50%;
}
@property --tw-gradient-to-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-tracking {
  syntax: "*";
  inherits: false;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-space-y-reverse: 0;
      --tw-space-x-reverse: 0;
      --tw-border-style: solid;
      --tw-gradient-position: initial;
      --tw-gradient-from: #0000;
      --tw-gradient-via: #0000;
      --tw-gradient-to: #0000;
      --tw-gradient-stops: initial;
      --tw-gradient-via-stops: initial;
      --tw-gradient-from-position: 0%;
      --tw-gradient-via-position: 50%;
      --tw-gradient-to-position: 100%;
      --tw-font-weight: initial;
      --tw-tracking: initial;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-duration: initial;
    }
  }
}
```

## File: src/server.ts
```typescript
import { serve } from "bun";

const server = serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);

    // Handle API routes
    if (url.pathname.startsWith("/api")) {
      return handleApiRoute(request, url);
    }

    // Serve static files
    return handleStaticFile(url.pathname);
  },
});

async function handleApiRoute(request: Request, url: URL): Promise<Response> {
  if (url.pathname === "/api/health") {
    return new Response(JSON.stringify({ status: "ok" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Not Found", { status: 404 });
}

async function handleStaticFile(pathname: string): Promise<Response> {
  // Serve index.html for all routes (SPA)
  if (pathname === "/" || !pathname.includes(".")) {
    const file = Bun.file("public/index.html");
    return new Response(file);
  }

  // Serve static assets
  const file = Bun.file(`public${pathname}`);
  const exists = await file.exists();

  if (exists) {
    return new Response(file);
  }

  return new Response("Not Found", { status: 404 });
}

console.log(`Server running at http://localhost:${server.port}`);
```

## File: bunfig.toml
```toml
[serve.static]
plugins = ["bun-plugin-tailwind"]
```

## File: package.json
```json
{
  "name": "wasm-llm-experiment",
  "module": "index.ts",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "bun run --watch src/server.ts",
    "build": "bun build --target=browser --outdir=./dist --minify src/client/main.tsx",
    "build:server": "bun build --target=bun --outdir=./dist src/server.ts",
    "format": "dprint fmt",
    "format:check": "dprint check",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@types/bun": "latest"
  },
  "peerDependencies": {
    "typescript": "^5"
  },
  "dependencies": {
    "@mlc-ai/web-llm": "^0.2.79",
    "@tailwindcss/cli": "^4.1.13",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "bun-plugin-tailwind": "^0.0.15",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "tailwindcss": "^4.1.13"
  }
}
```

## File: tailwind.config.ts
```typescript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: { 'cipher-gold': '#C5A572', 'cipher-dark': '#1a1a1a', 'cipher-gray': '#2a2a2a' },
      fontFamily: { 'mono': ['Monaco', 'Menlo', 'Ubuntu Mono', 'monospace'] }
    }
  },
  plugins: []
};
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    // Environment setup & latest features
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "Preserve",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,
    // Bundler mode
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    // Best practices
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    // Some stricter flags (disabled by default)
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false,
    "types": ["bun-types"]
  }
}
```

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
      const selectedModel = 'Hermes-3-Llama-3.2-3B-q4f32_1-MLC';
      // const selectedModel = 'gemma-3-1b-it-q0f16-MLC';
      // const selectedModel = 'Hermes-3-Llama-3.1-8B-q4f32_1-MLC';
      // const selectedModel = 'gemma-2-2b-it-q4f32_1-MLC-1k';

      const initProgressCallback = (progress: any) => {
        console.log('Loading progress:', progress);
        if (progress.progress !== undefined) {
          setLoadingProgress(Math.round(progress.progress * 100));
        }
        if (progress.text) {
          setLoadingStatus(progress.text);
        }
      };

      setLoadingStatus('Loading model...');
      console.log('Starting WebLLM engine initialization...');

      const mlcEngine = await CreateMLCEngine(selectedModel, { initProgressCallback, logLevel: 'INFO' });

      console.log('WebLLM engine initialized successfully');
      setEngine(mlcEngine);
      setIsLoading(false);
      setLoadingStatus('Ready');
    } catch (error) {
      console.error('Failed to initialize WebLLM:', error);
      setLoadingStatus('Failed to load model - check console for details');
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

      console.log('Sending message to WebLLM:', message);
      const reply = await engine.chat.completions.create({ messages: chatHistory, temperature: 0.7, max_tokens: 1000 });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: reply.choices[0]?.message?.content || 'No response',
        timestamp: Date.now()
      };

      console.log('Received response from WebLLM:', assistantMessage.content);
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
      {/* Background gradients - moved to inline styles to ensure they work */}
      <div
        className='absolute inset-0'
        style={{
          background: `
            linear-gradient(rgba(26, 26, 26, 0.8), rgba(26, 26, 26, 0.8)),
            radial-gradient(circle at 25% 25%, rgba(197, 165, 114, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(197, 165, 114, 0.1) 0%, transparent 50%)
          `
        }} />

      {/* Content */}
      <div className='relative z-10'>
        <Header />
        <ChatInterface messages={messages} onSendMessage={handleSendMessage} isProcessing={isProcessing} />
      </div>
    </div>
  );
};

export default App;

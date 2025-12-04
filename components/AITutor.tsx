
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, User } from '../types';
import { generateTutorResponse } from '../services/geminiService';
import { INITIAL_TUTOR_MESSAGE } from '../constants';
import { CyberButton, CyberCard, CyberIcon } from './CyberComponents';

interface AITutorProps {
  user: User;
  variant?: 'full' | 'widget';
  onClose?: () => void;
}

export const AITutor: React.FC<AITutorProps> = ({ user, variant = 'full', onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: INITIAL_TUTOR_MESSAGE,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachment, setAttachment] = useState<{name: string, type: 'doc' | 'image'} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !attachment) return;
    if (loading) return;

    let textToSend = input;
    if (attachment) {
      textToSend = `[ATTACHMENT: ${attachment.name}] ${input}`;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachment(null);
    setLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await generateTutorResponse(history, userMsg.text, "User is currently enrolled in MBA-601, MBA-604, MBA-609.");

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAttachment({ name: file.name, type: 'doc' });
    }
    event.target.value = '';
  };

  const simulateUploadImage = () => {
      const names = ['Diagram_Scan_001.png', 'Whiteboard_Session.jpg'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      setAttachment({ name: randomName, type: 'image' });
  };

  const simulateAudio = () => {
      setInput("Explain the concept of Elasticity in Supply Chain...");
  };

  const isWidget = variant === 'widget';

  return (
    <div className={`flex flex-col ${isWidget ? 'h-full' : 'h-[calc(100vh-8rem)]'}`}>
      
      {/* Header Area */}
      {isWidget ? (
         <div className="flex items-center justify-between bg-black/90 p-3 border-b border-cyber-purple/50 rounded-t-lg">
             <div className="flex items-center">
                <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse mr-2"></div>
                <span className="text-sm font-display font-bold text-white tracking-wider">NETRUNNER AI 🤖</span>
             </div>
             {onClose && (
                 <button onClick={onClose} className="text-gray-400 hover:text-white">
                     <CyberIcon name="close" className="w-4 h-4" />
                 </button>
             )}
         </div>
      ) : (
        <div className="mb-6 flex items-center justify-between border-b border-gray-700 pb-4">
            {/* Full Screen Header Content */}
            <div className="flex items-center group cursor-default">
                <div className="relative w-16 h-16 mr-5">
                    <div className="absolute inset-0 bg-cyber-purple clip-path-slant opacity-20 translate-x-1 translate-y-1 animate-pulse"></div>
                    <div className="absolute inset-0 bg-cyber-cyan clip-path-slant opacity-20 -translate-x-1 -translate-y-1 animate-pulse delay-100"></div>
                    <div className="absolute inset-0 bg-black/80 clip-path-slant border-2 border-cyber-purple flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center translate-x-[-2px] opacity-50 animate-glitch">
                            <CyberIcon name="robot" className="w-8 h-8 text-cyber-cyan" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center translate-x-[2px] opacity-50 animate-glitch delay-75">
                            <CyberIcon name="robot" className="w-8 h-8 text-cyber-pink" />
                        </div>
                        <CyberIcon name="robot" className="w-8 h-8 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] relative z-10" />
                    </div>
                </div>
                <div>
                <h2 className="text-4xl font-display font-black text-white italic tracking-tighter uppercase relative">
                    <span className="absolute -left-0.5 -top-0.5 text-cyber-cyan opacity-50 mix-blend-screen animate-glitch">NETRUNNER 🤖</span>
                    <span className="absolute left-0.5 top-0.5 text-cyber-pink opacity-50 mix-blend-screen animate-glitch delay-100">NETRUNNER 🤖</span>
                    <span className="relative z-10 bg-gradient-to-r from-cyber-purple via-white to-cyber-cyan bg-clip-text text-transparent">NETRUNNER 🤖</span>
                </h2>
                <p className="text-cyber-cyan text-[10px] font-mono tracking-[0.4em] uppercase font-bold flex items-center">
                    <span className="w-1.5 h-1.5 bg-cyber-cyan rounded-full mr-2 animate-pulse"></span>
                    Neural Assistant v3.4
                </p>
                </div>
            </div>
            <div className="text-right">
                <div className="text-[10px] text-gray-500 font-mono">SERVER STATUS</div>
                <div className="text-green-500 text-xs font-bold font-mono flex items-center justify-end">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div> ONLINE
                </div>
            </div>
        </div>
      )}

      {/* Chat UI Container */}
      <div className={`flex-1 bg-black/60 border border-gray-700 backdrop-blur-md flex flex-col overflow-hidden relative ${isWidget ? 'rounded-b-lg border-t-0' : 'rounded-lg shadow-2xl'}`}>
        {!isWidget && (
           <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(0,243,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        )}

        {/* Chat Area */}
        <div className={`flex-1 overflow-y-auto space-y-4 relative z-10 custom-scrollbar ${isWidget ? 'p-3' : 'p-6'}`}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-6 h-6 bg-cyber-purple/20 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0 border border-cyber-purple">
                   <CyberIcon name="robot" className="w-3 h-3 text-cyber-purple"/>
                </div>
              )}

              <div className={`max-w-[80%] rounded-lg p-3 text-xs font-sans leading-relaxed shadow-lg
                  ${msg.role === 'user' 
                    ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-white rounded-tr-none' 
                    : 'bg-gray-800/80 border border-gray-600 text-gray-200 rounded-tl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start w-full">
               <div className="w-6 h-6 mr-2"></div>
               <div className="bg-gray-800/80 border border-gray-600 rounded-lg p-3 rounded-tl-none flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-cyber-purple rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-cyber-purple rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-cyber-purple rounded-full animate-bounce delay-200"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Attachment Preview */}
        {attachment && (
            <div className="bg-gray-900 px-3 py-1 flex items-center justify-between border-t border-gray-700">
                <div className="flex items-center text-[10px] text-cyber-cyan font-mono">
                    <CyberIcon name={attachment.type === 'doc' ? 'paperclip' : 'image'} className="w-3 h-3 mr-1" />
                    {attachment.name}
                </div>
                <button onClick={() => setAttachment(null)} className="text-gray-500 hover:text-red-400">
                    <CyberIcon name="close" className="w-3 h-3" />
                </button>
            </div>
        )}

        {/* Input Area */}
        <div className={`bg-gray-900/90 border-t border-gray-700 z-20 ${isWidget ? 'p-2' : 'p-4'}`}>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".pdf, .docx, .txt" 
            onChange={handleFileUpload}
          />
          <div className="flex items-center space-x-2">
             <div className="flex space-x-1 border-r border-gray-700 pr-2">
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload"
                    className="p-1.5 text-gray-400 hover:text-cyber-cyan hover:bg-gray-800 rounded transition-colors"
                >
                    <CyberIcon name="upload" className="w-4 h-4"/>
                </button>
                <button 
                    onClick={simulateUploadImage}
                    title="Image"
                    className="p-1.5 text-gray-400 hover:text-cyber-pink hover:bg-gray-800 rounded transition-colors"
                >
                    <CyberIcon name="image" className="w-4 h-4"/>
                </button>
             </div>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query..."
              className="flex-1 bg-black border border-gray-600 rounded p-2 text-white text-xs focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all font-sans"
              disabled={loading}
            />
            <button 
              onClick={handleSend} 
              disabled={loading}
              className={`bg-cyber-cyan hover:bg-white text-cyber-black font-bold rounded transition-colors flex items-center justify-center ${isWidget ? 'w-8 h-8' : 'w-12 h-12 px-6'}`}
            >
              <CyberIcon name="send" className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

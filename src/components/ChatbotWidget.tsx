import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Minimize2,
  Maximize2,
  Bot,
  User,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { PropertyRecord, LanguageCode } from '../types';
import { translations } from '../data/translations';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface ChatbotWidgetProps {
  mode: 'floating' | 'fullscreen';
  properties: PropertyRecord[];
  language: LanguageCode;
  onCloseFloating?: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  mode,
  properties,
  language,
  onCloseFloating,
}) => {
  const t = translations[language] || translations.en;

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: t.advisorWelcome,
      timestamp: 'Just now',
    },
  ]);

  // When language changes, update the initial greeting if there's only 1 message
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'msg-welcome') {
        return [
          {
            id: 'msg-welcome',
            sender: 'assistant',
            text: t.advisorWelcome,
            timestamp: 'Just now',
          },
        ];
      }
      return prev;
    });
  }, [language, t.advisorWelcome]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    t.question1,
    t.question2,
    t.question3,
    t.question4,
    t.question5,
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          propertiesContext: properties,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Information retrieved from Uganda Land Act registry records.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      // Local fallback with land legal rules
      let fallbackText = `According to the Ugandan Land Act (Cap 227) and Ministry of Lands guidelines:
- Mailo land grants perpetual ownership subject to statutory rights of lawful and bona fide occupants (Bibanja holders).
- Before completing any purchase, verify the White Page at the Zonal Ministry Office, check for caveats, and inspect boundary beacons with a registered surveyor.`;

      if (textToSend.toLowerCase().includes('mailo') || textToSend.toLowerCase().includes('freehold')) {
        fallbackText = `Under Ugandan law:
1. Mailo Land: Unique to Buganda, where ownership is registered with perpetual rights, but Bibanja occupants possess legally protected occupancy rights.
2. Freehold Title: Outright registered ownership with full development rights, typical in former crown lands and urban areas.
3. Customary: Governed by local clan customs, without individual titles unless converted.
4. Leasehold: Time-limited tenure (e.g. 49 or 99 years) granted by KCCA or private owners.`;
      } else if (textToSend.toLowerCase().includes('escrow')) {
        fallbackText = `The Clear Title Uganda Escrow mechanism with Stanbic Bank deposits 100% of your purchase funds into a custodial trust account. Funds cannot be released until:
1. Cadastral boundary survey matches registry coordinates.
2. LC1 and neighboring parcel owners sign boundary confirmation.
3. Official Ministry title transfer instrument is registered in the buyer's name.`;
      }

      const assistantMessage: ChatMessage = {
        id: `asst-fallback-${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const isFloating = mode === 'floating';

  return (
    <div
      className={`flex flex-col bg-white overflow-hidden transition-all duration-200 ${
        isFloating
          ? 'fixed bottom-4 right-4 z-50 w-96 h-[540px] rounded-2xl shadow-2xl border border-blue-200'
          : 'max-w-4xl mx-auto h-[calc(100vh-140px)] rounded-2xl border border-blue-100 shadow-md my-4'
      }`}
    >
      {/* Chatbot Header */}
      <div className="bg-[#0b1e36] text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4 text-blue-200" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{t.advisorTitle}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </h3>
            <p className="text-[10px] text-blue-200">
              Uganda Land Act &amp; Registry Specialist
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {isFloating && onCloseFloating && (
            <button
              onClick={onCloseFloating}
              className="p-1 text-blue-300 hover:text-white rounded-lg hover:bg-blue-900/60 transition"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-2.5 bg-blue-50/50 border-b border-blue-100 shrink-0 overflow-x-auto whitespace-nowrap space-x-1.5 scrollbar-none flex">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-[11px] font-medium text-blue-900 bg-white hover:bg-blue-100/70 border border-blue-200 px-2.5 py-1 rounded-full transition shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/30">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-blue-800 text-white'
                    : 'bg-blue-100 text-blue-900 border border-blue-200'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-blue-800 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1 ${
                    isUser ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-blue-800 font-semibold p-2">
            <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce delay-100"></div>
            <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce delay-200"></div>
            <span className="text-[11px] text-slate-500">Checking Uganda Land Act &amp; case files...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.askAdvisorPlaceholder}
          disabled={isLoading}
          className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-700 text-slate-800"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 bg-blue-800 hover:bg-blue-900 disabled:bg-slate-300 text-white rounded-xl transition shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

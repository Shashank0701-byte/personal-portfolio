'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, X, Maximize2, Minimize2 } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from './terminal-context';

type HistoryItem = {
  id: string;
  type: 'command' | 'output';
  content: React.ReactNode;
};

const FAKE_BOOT_SEQUENCE = [
  'Loading CoreX kernel...',
  'Initializing VGA Mode 13h...',
  'Mounting virtual filesystem... [OK]',
  'Starting memory manager... [OK]',
  'Loading user shell...',
  'Welcome to CoreX OS v1.0.0',
];

const CoreXBootSequence = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev, FAKE_BOOT_SEQUENCE[index]]);
      index++;
      if (index === FAKE_BOOT_SEQUENCE.length) {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 text-green-400">
      {lines.map((line, i) => (
        <span key={i}>{line}</span>
      ))}
    </div>
  );
};

export function TerminalWidget() {
  const { isOpen, closeTerminal } = useTerminal();
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init',
      type: 'output',
      content: `Welcome to Shashank's Terminal. Type "help" to see available commands.`,
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (!trimmedCmd) return;

    const newHistory: HistoryItem[] = [
      ...history,
      { id: Date.now().toString(), type: 'command', content: cmd },
    ];

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    let output: React.ReactNode = '';

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1">
            <span className="text-gray-300">Available commands:</span>
            <span><strong className="text-green-400">help</strong>       - List available commands</span>
            <span><strong className="text-green-400">whoami</strong>     - Brief bio</span>
            <span><strong className="text-green-400">projects</strong>   - List of my technical projects</span>
            <span><strong className="text-green-400">skills</strong>     - List of my skills</span>
            <span><strong className="text-green-400">experience</strong> - My professional experience</span>
            <span><strong className="text-green-400">contact</strong>    - Contact information</span>
            <span><strong className="text-green-400">clear</strong>      - Clear the terminal screen</span>
          </div>
        );
        break;
      case 'whoami':
        output = 'Shashank Chakraborty - Backend Developer building systems that scale. Specialized in Python, Node.js, and Graph Databases (Neo4j). I focus on security, observability, and high-performance backend architectures.';
        break;
      case 'projects':
        output = (
          <div className="flex flex-col gap-2">
            <span>🚀 <strong>Shadow Permission Analyzer</strong>: Graph-based AWS IAM privilege escalation detector using Neo4j and boto3.</span>
            <span>🚀 <strong>SystemCraft</strong>: Real-time system design simulation platform with Gemini 2.0 AI evaluation.</span>
            <span>🚀 <strong>Interview Prep AI</strong>: Intelligent learning platform with voice practice and spaced repetition.</span>
            <span>🚀 <strong>DocuFlow</strong>: Event-driven invoice ingestion pipeline with Celery and Redis.</span>
            <a href="#projects" className="text-blue-400 hover:underline mt-2 inline-block">View all on main site &rarr;</a>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="flex flex-col gap-1">
            <span>• <strong>Backend</strong>: FastAPI, Node.js, Express, Python, REST APIs, WebSockets</span>
            <span>• <strong>Databases</strong>: PostgreSQL, MongoDB, Redis, Neo4j, MySQL, Celery</span>
            <span>• <strong>Infrastructure</strong>: Docker, AWS, GitHub Actions, Nginx, Linux, CI/CD</span>
            <span>• <strong>Frontend</strong>: React, Next.js, TypeScript, Tailwind CSS, Framer Motion</span>
          </div>
        );
        break;
      case 'experience':
        output = (
          <div className="flex flex-col gap-1">
            <span>• Built production backend for vertex.dsce.club serving 200+ members.</span>
            <span>• Designed RESTful APIs for event registration and admin dashboards with NextAuth.</span>
            <span>• Implemented RBAC and optimized API latency by 40% via Redis caching.</span>
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="flex flex-col gap-1">
            <a href="mailto:shashankchakraborty71@gmail.com" className="text-blue-400 hover:underline">📧 Email: shashankchakraborty71@gmail.com</a>
            <a href="https://github.com/Shashank0701-byte" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">🐙 GitHub: @Shashank0701-byte</a>
            <a href="https://linkedin.com/in/shashank-chakraborty" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">💼 LinkedIn: Connect</a>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'corex':
        output = <CoreXBootSequence />;
        break;
      case 'cat resume.pdf':
        output = (
          <a href="/Shashank%27s%20CV.pdf" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline inline-block border border-green-400 px-2 py-1 mt-1">
            [📄 Download Shashank_CV.pdf]
          </a>
        );
        break;
      case 'ssh shashank':
        output = <span className="text-red-400">Access denied. Nice try.</span>;
        break;
      case 'sudo rm -rf /':
        output = <span className="text-red-400">Nice try! This incident will be reported to the cyber police.</span>;
        break;
      default:
        output = <span className="text-red-400">Command not found: {cmd}. Type "help" for a list of commands.</span>;
    }

    setHistory([...newHistory, { id: (Date.now() + 1).toString(), type: 'output', content: output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`fixed z-[100] bg-black/90 backdrop-blur-xl border border-[var(--text-3)] shadow-2xl rounded-lg overflow-hidden flex flex-col font-mono text-sm hidden md:flex transition-all duration-300 ${isExpanded ? 'inset-4' : 'bottom-6 right-6 w-[500px] h-[400px]'
            }`}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-[var(--text-3)] select-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--text-2)]" />
              <span className="text-[var(--text-2)] text-xs font-bold uppercase tracking-wider">shashank@portfolio: ~</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsExpanded(!isExpanded)} className="text-[var(--text-2)] hover:text-white transition-colors">
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={closeTerminal} className="text-[var(--text-2)] hover:text-red-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            className="flex-1 p-4 overflow-y-auto text-[var(--text-2)] flex flex-col gap-3 custom-scrollbar"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item) => (
              <div key={item.id} className="flex flex-col">
                {item.type === 'command' ? (
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-green-500 font-bold">➜</span>
                    <span className="text-blue-400 font-bold">~</span>
                    <span>{item.content}</span>
                  </div>
                ) : (
                  <div className="ml-4 break-words">{item.content}</div>
                )}
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2 text-white">
              <span className="text-green-500 font-bold">➜</span>
              <span className="text-blue-400 font-bold">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white caret-white"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={endOfMessagesRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

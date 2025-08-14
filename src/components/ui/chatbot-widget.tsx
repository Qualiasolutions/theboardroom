"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotWidgetProps {
  className?: string;
}

// Boardroom knowledge base - used implicitly in generateResponse function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const boardroomKnowledge = {
  platform: {
    name: "Boardroom",
    description: "An invitation-only founder community for strategic discussions and networking",
    access: "Invite code required (Demo: 'DEMO')",
    membership: "€50,000 annual membership fee"
  },
  features: {
    dashboard: "Activity overview with stats and recent threads",
    rooms: "Strategic discussion spaces with tabs for Threads, Chat, Briefings, and Members",
    introductions: "Network connection requests and approvals",
    briefings: "Scheduled strategic sessions and presentations",
    membership: "Exclusive founder membership with payment processing"
  },
  navigation: {
    public: ["Landing page (/)", "Membership payment (/membership)", "Payment success (/membership/success)"],
    authenticated: ["Dashboard (/dashboard)", "Rooms (/rooms)", "Introductions (/introductions)", "Briefings (/briefings)"]
  },
  design: {
    theme: "Dark-first design with black/gold/white color palette",
    style: "Zero border radius, corporate-grade interface",
    colors: {
      background: "#0B0B0C (deep black)",
      panel: "#111214 (elevated surfaces)",
      accent: "#D4AF37 (gold)",
      text: "#F5F6F7 (near white)"
    }
  }
};

// Simple AI response generator
const generateResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  // Greetings
  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    return "Hello! Welcome to Boardroom. I'm here to help you navigate our exclusive founder community. What would you like to know?";
  }
  
  // Platform info
  if (lowerInput.includes("what is") || lowerInput.includes("about boardroom") || lowerInput.includes("platform")) {
    return `Boardroom is an invitation-only founder community designed for strategic discussions and high-level networking. Access requires an invite code, and membership is €50,000 annually. Our platform features discussion rooms, briefings, introductions, and a comprehensive dashboard.`;
  }
  
  // Access and login
  if (lowerInput.includes("login") || lowerInput.includes("access") || lowerInput.includes("invite code")) {
    return `To access Boardroom, you need an invite code. For the demo, use the code 'DEMO' on the landing page. Full membership requires approval and a €50,000 annual fee.`;
  }
  
  // Features
  if (lowerInput.includes("features") || lowerInput.includes("what can")) {
    return `Boardroom offers several key features:
• Dashboard - Activity overview and recent discussions
• Rooms - Strategic discussion spaces with threads, chat, briefings, and member lists
• Introductions - Network with other founders through connection requests
• Briefings - Scheduled strategic sessions and presentations
• Membership - Exclusive access management and payment processing`;
  }
  
  // Navigation help
  if (lowerInput.includes("navigate") || lowerInput.includes("how to") || lowerInput.includes("use")) {
    return `Navigation is simple:
• Use the sidebar on the left to access main sections
• Dashboard shows your activity overview
• Rooms contain strategic discussions with multiple tabs
• Introductions help you connect with other founders
• Briefings show scheduled strategic sessions
The interface is optimized for both desktop and mobile use.`;
  }
  
  // Rooms
  if (lowerInput.includes("rooms") || lowerInput.includes("discussions")) {
    return `Rooms are strategic discussion spaces where founders engage in high-level conversations. Each room has four tabs:
• Threads - Ongoing discussions and topics
• Chat - Real-time messaging
• Briefings - Scheduled presentations and sessions
• Members - Room participants and their profiles`;
  }
  
  // Design and interface
  if (lowerInput.includes("design") || lowerInput.includes("interface") || lowerInput.includes("dark")) {
    return `Boardroom features a distinctive corporate design:
• Dark-first interface with professional aesthetics
• Black (#0B0B0C) background with gold (#D4AF37) accents
• Zero border radius for sharp, modern appearance
• Inter font family for clean typography
• Responsive design that works on all devices`;
  }
  
  // Membership
  if (lowerInput.includes("membership") || lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("50")) {
    return `Boardroom membership is exclusive and costs €50,000 annually. This premium pricing ensures a high-quality founder community. The membership includes access to all strategic discussions, networking opportunities, briefings, and exclusive events.`;
  }
  
  // Technical
  if (lowerInput.includes("technical") || lowerInput.includes("built") || lowerInput.includes("technology")) {
    return `Boardroom is built with modern web technologies:
• Next.js 15.4 with App Router and TypeScript
• Tailwind CSS v4 for styling
• Radix UI components for accessibility
• Framer Motion for animations
• Dark-first responsive design`;
  }
  
  // Help and support
  if (lowerInput.includes("help") || lowerInput.includes("support") || lowerInput.includes("problem")) {
    return `I'm here to help! You can ask me about:
• Platform features and navigation
• How to access different sections
• Membership information
• Design and interface questions
• Technical details about the platform
What specific area would you like assistance with?`;
  }
  
  // Default responses
  const defaultResponses = [
    "I'm here to help you with Boardroom! You can ask me about platform features, navigation, membership, or how to use specific sections.",
    "As your Boardroom assistant, I can provide information about our exclusive founder community. What would you like to know?",
    "I have knowledge about all Boardroom features including rooms, briefings, introductions, and membership. How can I assist you?",
    "Feel free to ask me about navigating Boardroom, understanding our features, or getting the most out of your founder community experience."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

export function ChatbotWidget({ className }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to Boardroom! I'm your AI assistant. I can help you navigate our exclusive founder community, understand features, and answer questions about membership. How can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-boardroom-gold hover:bg-boardroom-gold-soft text-boardroom-black shadow-lg transition-all duration-300 hover:scale-105"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <div className="bg-boardroom-black-panel border border-boardroom-white/20 shadow-2xl w-80 h-96 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-boardroom-white/20">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-boardroom-gold flex items-center justify-center">
                <Bot className="h-4 w-4 text-boardroom-black" />
              </div>
              <div>
                <h3 className="font-semibold text-boardroom-white text-sm">Boardroom Assistant</h3>
                <p className="text-xs text-boardroom-white-mid">Always here to help</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-boardroom-white-mid hover:text-boardroom-white hover:bg-boardroom-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2 max-w-[85%]",
                  message.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div className={cn(
                  "h-6 w-6 flex items-center justify-center flex-shrink-0",
                  message.sender === "user" 
                    ? "bg-boardroom-gold" 
                    : "bg-boardroom-white/10"
                )}>
                  {message.sender === "user" ? (
                    <User className="h-3 w-3 text-boardroom-black" />
                  ) : (
                    <Bot className="h-3 w-3 text-boardroom-white" />
                  )}
                </div>
                <div className={cn(
                  "px-3 py-2 text-sm",
                  message.sender === "user"
                    ? "bg-boardroom-gold text-boardroom-black"
                    : "bg-boardroom-white/10 text-boardroom-white"
                )}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 max-w-[85%] mr-auto">
                <div className="h-6 w-6 bg-boardroom-white/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3 w-3 text-boardroom-white" />
                </div>
                <div className="bg-boardroom-white/10 text-boardroom-white px-3 py-2 text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-boardroom-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-boardroom-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-boardroom-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-boardroom-white/20">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Boardroom..."
                className="flex-1 bg-boardroom-black border-boardroom-white/20 text-boardroom-white placeholder:text-boardroom-white-mid focus:border-boardroom-gold"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="bg-boardroom-gold hover:bg-boardroom-gold-soft text-boardroom-black disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
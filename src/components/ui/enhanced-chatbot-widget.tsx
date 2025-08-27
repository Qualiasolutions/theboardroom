"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Bot, User, Lightbulb, Target, FileText, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export function EnhancedChatbotWidget() {
  const router = useRouter();
  const pathname = usePathname();
  const { addBoardItem, addNotification, addBoard } = useAppStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your strategic planning assistant. I can help you with boardroom planning, OKRs, SWOT analysis, and more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Context-aware suggestions based on current page
  const getContextualSuggestions = () => {
    const baseSuggestions = [
      { text: "Help me create a SWOT analysis", icon: Target },
      { text: "Set up OKRs for next quarter", icon: TrendingUp },
      { text: "Create a strategic roadmap", icon: FileText }
    ];
    
    if (pathname === '/boardroom') {
      return [
        { text: "Add a new strategic objective", icon: Target, action: "add_objective" },
        { text: "Create SWOT template", icon: Lightbulb, action: "load_swot" },
        { text: "Help with board planning", icon: FileText, action: "board_help" }
      ];
    }
    
    if (pathname === '/dashboard') {
      return [
        { text: "How to interpret my metrics?", icon: TrendingUp },
        { text: "Navigate to Strategic Boardroom", icon: Target, action: "go_boardroom" },
        { text: "Create my first post", icon: MessageSquare, action: "create_post" }
      ];
    }
    
    return baseSuggestions;
  };

  const handleSendMessage = async (customMessage?: string) => {
    const messageText = customMessage || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response with typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add_objective':
        if (pathname === '/boardroom') {
          addBoardItem({
            id: Date.now().toString(),
            type: 'objective',
            title: 'New Strategic Objective',
            content: 'Define your strategic objective here...',
            position: { x: Math.random() * 300, y: Math.random() * 200 },
            color: 'green',
            priority: 'high',
            status: 'todo',
            assignee: 'Abdelrahman',
            tags: [],
            comments: [],
            connections: []
          });
          addNotification('New objective added to board!');
          handleSendMessage('I\'ve added a new strategic objective to your board');
        }
        break;
      case 'load_swot':
        handleSendMessage('Load SWOT analysis template');
        break;
      case 'go_boardroom':
        router.push('/boardroom');
        addNotification('Navigating to Strategic Boardroom');
        break;
      case 'create_post':
        addNotification('Use the "New Post" button to create a post!');
        break;
    }
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Context-aware responses
    if (pathname === '/boardroom' && input.includes('objective')) {
      return 'Perfect! I notice you\'re in the Strategic Boardroom. I can help you create objectives directly on your board. Use the "Objective" button in the toolbar, or I can add one for you right now with smart defaults.';
    }
    
    if (input.includes('load swot') || input.includes('swot template')) {
      return 'Excellent choice! SWOT analysis is perfect for strategic assessment. Go to the Templates tab and select "SWOT Analysis" - it will automatically create four sections: Strengths, Weaknesses, Opportunities, and Threats with smart positioning.';
    }
    
    if (input.includes('swot')) {
      return 'SWOT Analysis is crucial for strategic planning! It helps identify internal Strengths & Weaknesses, plus external Opportunities & Threats. I can guide you through creating one - would you like me to load the SWOT template for you?';
    }
    
    if (input.includes('okr')) {
      return 'OKRs (Objectives and Key Results) drive focused execution! Structure: 1 ambitious Objective + 2-3 measurable Key Results. Pro tip: Objectives inspire, Key Results measure. Want me to help you create an OKR framework on your board?';
    }
    
    if (input.includes('roadmap')) {
      return 'Strategic roadmaps visualize your journey! Best practices: Organize by quarters, include dependencies, set clear milestones. The Boardroom has a roadmap template with Q1-Q4 structure. Shall I help you get started?';
    }
    
    if (input.includes('drag') || input.includes('move')) {
      return 'Great question! All board items are draggable. Simply click and drag any card to reposition it. This helps you organize ideas spatially - group related items, create workflows, or arrange by priority!';
    }
    
    if (input.includes('export') || input.includes('save')) {
      return 'Smart planning includes backup! Use the Export button to download your board as JSON. You can also use the "Saved Boards" tab to manage multiple strategic plans. All your work persists automatically!';
    }
    
    if (input.includes('collaborate') || input.includes('team')) {
      return 'Collaboration amplifies strategy! Check the Collaboration tab to see team members and activity. You can share board links, assign items to team members, and track collective progress on strategic initiatives.';
    }
    
    if (input.includes('priority') || input.includes('status')) {
      return 'Excellent focus on execution! Click the status indicator (circle) on any item to cycle through: Todo → In Progress → Completed → Blocked. Priority levels help you focus on what matters most first.';
    }
    
    if (input.includes('new') || input.includes('create') || input.includes('add')) {
      return `I can help you create strategic content! Current options:\n\n• Notes for insights\n• Objectives for goals\n• Tasks for actions\n• Ideas for innovation\n\nWhat type of strategic item would you like to add?`;
    }
    
    if (input.includes('help') || input.includes('how') || input.includes('guide')) {
      return `I'm your strategic planning companion! Here's what I can help with:\n\n✨ **Board Management**: Creating, organizing, and exporting boards\n🎯 **Strategic Frameworks**: SWOT, OKRs, Roadmaps\n📋 **Item Management**: Adding objectives, notes, tasks, ideas\n🤝 **Collaboration**: Team features and sharing\n📊 **Best Practices**: Strategic planning tips\n\nWhat specific area interests you most?`;
    }
    
    // Contextual suggestions based on location
    const contextualTips = pathname === '/boardroom' 
      ? 'Since you\'re in the Boardroom, try dragging items around or using the template system!' 
      : pathname === '/dashboard' 
      ? 'From the Dashboard, you can navigate to the Strategic Boardroom for visual planning!' 
      : 'Navigate to the Strategic Boardroom for hands-on planning tools!';
    
    return `That's an insightful question! I'm here to help with strategic planning and boardroom optimization. ${contextualTips}\n\nFeel free to ask about SWOT analysis, OKRs, roadmaps, or any strategic frameworks you'd like to explore.`;
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gold hover:bg-gold-soft text-background shadow-lg z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 bg-panel border-border shadow-xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
        <CardTitle className="text-sm flex items-center gap-2">
          <Bot className="h-4 w-4 text-gold" />
          Strategic Assistant
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-64">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === 'bot' && (
                <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-3 w-3 text-background" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[70%] px-3 py-2 text-sm whitespace-pre-wrap",
                  message.sender === 'user'
                    ? "bg-gold text-background ml-auto"
                    : "bg-background border border-border"
                )}
              >
                {message.content}
              </div>
              
              {message.sender === 'user' && (
                <div className="w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="h-3 w-3 text-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-3 w-3 text-background" />
              </div>
              <div className="bg-background border border-border px-3 py-2 text-sm max-w-[70%]">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 border-b border-border">
            <div className="text-xs text-mid mb-2">Quick Actions:</div>
            <div className="flex flex-wrap gap-1">
              {getContextualSuggestions().map((suggestion, i) => {
                const Icon = suggestion.icon;
                return (
                  <Button
                    key={i}
                    onClick={() => {
                      if ('action' in suggestion && suggestion.action) {
                        handleQuickAction(suggestion.action);
                      } else {
                        handleSendMessage(suggestion.text);
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 px-2"
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {suggestion.text.length > 20 ? suggestion.text.slice(0, 17) + '...' : suggestion.text}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about strategic planning..."
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSendMessage()}
              size="sm"
              disabled={!inputValue.trim() || isTyping}
              className="bg-gold hover:bg-gold-soft text-background disabled:opacity-50"
            >
              {isTyping ? (
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 bg-background rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-background rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-1 bg-background rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
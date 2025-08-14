"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export function ChatbotWidget() {
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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('swot')) {
      return 'SWOT Analysis is great for strategic planning! I can help you create a SWOT template in the Boardroom. It includes Strengths, Weaknesses, Opportunities, and Threats sections. Would you like me to guide you through setting one up?';
    }
    
    if (input.includes('okr') || input.includes('objective')) {
      return 'OKRs (Objectives and Key Results) are perfect for goal setting! Each objective should be ambitious and qualitative, with 2-3 measurable key results. I can help you structure these in your strategic board.';
    }
    
    if (input.includes('roadmap')) {
      return 'Product roadmaps help visualize your strategic timeline! I recommend organizing by quarters with clear milestones. The Boardroom has a roadmap template you can use. Would you like tips on milestone planning?';
    }
    
    if (input.includes('board') || input.includes('planning')) {
      return 'The Strategic Boardroom is perfect for visual planning! You can create notes, objectives, tasks, and ideas. Try using the templates for structured frameworks like SWOT or OKRs.';
    }
    
    if (input.includes('help') || input.includes('how')) {
      return 'I can help you with strategic planning, boardroom features, templates, and best practices. Some things I can assist with:\n\n• Setting up SWOT analysis\n• Creating OKRs\n• Building roadmaps\n• Strategic planning tips\n\nWhat would you like to explore?';
    }
    
    return 'That\'s an interesting question! I\'m here to help with strategic planning and boardroom features. Feel free to ask about SWOT analysis, OKRs, roadmaps, or any planning frameworks you\'d like to explore.';
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
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about strategic planning..."
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-gold hover:bg-gold-soft text-background"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
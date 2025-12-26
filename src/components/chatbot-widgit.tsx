"use client";

import { useState, useRef, useEffect } from "react";

import { MessageCircle, X, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! 👋 How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  const generateBotResponse = (userInput: string): string => {
    const responses = [
      "That's interesting! Tell me more.",
      "I understand. How can I assist you further?",
      "Great question! I'm here to help.",
      "Let me think about that... What else would you like to know?",
      "I'm always happy to chat! What's on your mind?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-primary text-primary-foreground shadow-lg hover:shadow-xl",
          "z-40 transition-all duration-300 ease-out",
          "hover:scale-110 active:scale-95",
          isOpen && "pointer-events-none scale-0",
        )}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed right-6 bottom-6 h-[500px] w-96 rounded-2xl",
          "bg-card text-card-foreground shadow-2xl",
          "border-border flex flex-col border",
          "z-50 transition-all duration-300 ease-out",
          "origin-bottom-right",
          isOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0",
        )}
      >
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full font-bold">
              A
            </div>
            <div>
              <h3 className="text-sm font-semibold">Chat Assistant</h3>
              <p className="text-muted-foreground text-xs">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-muted rounded-lg p-2 transition-colors"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="bg-background/50 flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "animate-in fade-in slide-in-from-bottom-2 flex gap-3",
                message.sender === "user" && "flex-row-reverse",
              )}
            >
              {message.sender === "bot" && (
                <div className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                  <span className="text-xs font-bold">A</span>
                </div>
              )}
              <div
                className={cn(
                  "max-w-xs rounded-lg px-4 py-2 text-sm",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none",
                )}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                <span className="text-xs font-bold">A</span>
              </div>
              <div className="bg-muted text-muted-foreground rounded-lg rounded-bl-none px-4 py-2">
                <div className="flex gap-1">
                  <div className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full" />
                  <div
                    className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="bg-muted-foreground h-2 w-2 animate-bounce rounded-full"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-border bg-card border-t px-4 py-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/20" onClick={() => setIsOpen(false)} aria-hidden="true" />}
    </>
  );
}

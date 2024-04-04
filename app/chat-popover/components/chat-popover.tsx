"use client";
import { useChat } from "ai/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import ChatInput from "./chat-input";
import { cn } from "@/lib/utils";
import ChatMessage from "./chat-message";

const ChatPopover = () => {
  const [streaming, setStreaming] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      onResponse(response) {
        setStreaming(false);
      },
    });

  useEffect(() => {
    scrollerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon">
          <MessageSquare size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={16}
        className="h-[32rem] w-[25rem] p-0"
      >
        <div className="flex flex-col grow h-full">
          <div className="flex justify-between shrink-0 py-2.5 px-4 border-b">
            <p className="text-xl font-bold">ChatBot</p>
            <button onClick={() => setOpen((o) => !o)}>
              <X size={20} />
            </button>
          </div>
          <div className="grow flex flex-col p-2.5 gap-1.5 overflow-y-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {streaming && (
              <ChatMessage
                message={{
                  content: "Thinking...",
                  role: "assistant",
                  id: "loading",
                }}
              />
            )}

            <div ref={scrollerRef}></div>
          </div>

          <div className="p-2.5 border-t">
            <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                setStreaming(true);
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatPopover;

"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { FC, useRef } from "react";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const ChatInput: FC<ChatInputProps> = ({
  handleInputChange,
  handleSubmit,
  input,
  isLoading,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="relative">
        <Textarea
          rows={1}
          maxRows={5}
          value={input}
          onChange={handleInputChange}
          autoFocus
          placeholder="Send message..."
          className="h-auto resize-none min-h-max py-3"
          onKeyDown={(e) => {
            if (e.key === "Enter" && input) {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
        />
        <Button
          className="absolute h-8 w-8 top-1/2 -translate-y-1/2 right-1.5"
          size="icon"
          disabled={!input || isLoading}
        >
          <SendHorizonal size={16} />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;

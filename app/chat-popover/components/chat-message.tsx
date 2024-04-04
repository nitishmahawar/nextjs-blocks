// import Markdown from "@/components/markdown";
import { cn } from "@/lib/utils";
import { Message } from "ai";
import React, { FC } from "react";
import Markdown from "markdown-to-jsx";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={cn(
        "flex",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div className="space-y-0.5">
        <p
          className={cn(
            "text-xs font-medium",
            message.role == "user" ? "text-right mr-1" : "ml-1"
          )}
        >
          {message.role === "user" ? "You" : "AI"}
        </p>
        <p
          className={cn(
            "px-4 py-2 rounded-md max-w-xs prose",
            message.role == "user" ? "bg-blue-500 text-white" : "bg-gray-100 "
          )}
        >
          <Markdown>{message.content}</Markdown>
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;

import React from "react";
import ChatPopover from "./components/chat-popover";

const Page = () => {
  return (
    <div className="h-svh relative">
      <div className="fixed bottom-6 right-6">
        <ChatPopover />
      </div>
    </div>
  );
};

export default Page;

"use client";

import React, { useState } from "react";
import ChatWindow from "../../components/Chat/Chat";
import MessageInput from "../../components/ChatInput/ChatInput";
import ChatList from "../../components/ChatList/ChatList";
import TopNav from "../../components/ChatNavigation/NavigationBar";
import ForumComponent from "../../components/Forum/Forum";

const Networking = () => {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' or 'forum'

  return (
    <div className="h-full flex">
      {activeTab === "chat" && <ChatList />}
      <div
        className={`flex flex-col ${
          activeTab === "forum" ? "w-full" : "flex-grow"
        }`}
      >
        <TopNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
        {activeTab === "chat" ? (
          <>
            <ChatWindow />
            <MessageInput />
          </>
        ) : (
          <ForumComponent />
        )}
      </div>
    </div>
  );
};

export default Networking;

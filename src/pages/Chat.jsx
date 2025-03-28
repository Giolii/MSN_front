import ConversationInfo from "../components/conversations/ConversationInfo";
import MessageSender from "../components/messages/MessageSender";
import { useState } from "react";
import NewConversation from "../components/conversations/NewConversation";
import FilterConversations from "../components/conversations/FilterConversations";
import ShowConversations from "../components/conversations/ShowConversations";
import VisualizeMessages from "../components/messages/VisualizeMessages";
import { useConversation } from "../contexts/ConversationsContext";
import FriendsList from "../components/conversations/FriendsList";
import NoConversations from "../components/conversations/NoConversations";

export const Chat = () => {
  const [allConversations, setAllConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const { conversationSelected } = useConversation();

  return (
    <div className="w-full flex items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900">
      <div className="flex-1 flex items-center justify-center h-full w-full overflow-hidden rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 max-w-7xl bg-white dark:bg-zinc-800">
        {/* Left side */}
        <div className="w-4/10 flex flex-col h-full border-zinc-200 dark:border-zinc-700 max-w-md">
          <div className="flex flex-col p-2 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 top-0 shadow-sm pb-3">
            <div className="w-full mb-3">
              <FilterConversations allConversations={allConversations} />
            </div>
            <div className="flex items-center justify-around w-full">
              <NewConversation allConversations={allConversations} />
              <FriendsList allConversations={allConversations} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-900">
            <ShowConversations setAllConversations={setAllConversations} />
          </div>
        </div>

        {/* Right side */}
        <div className="w-6/10 flex flex-col h-full bg-white dark:bg-zinc-800 rounded-r-lg border-l border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-lg transition-all duration-200 ease-in-out">
          {conversationSelected ? (
            <>
              {/* Chat Header */}
              <div className="flex-shrink-0 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-700">
                <ConversationInfo />
              </div>

              {/* Messages Area - Flex-grow to take available space */}
              <div className="flex-grow overflow-hidden relative bg-zinc-50 dark:bg-zinc-900">
                <VisualizeMessages
                  messages={messages}
                  setMessages={setMessages}
                />
              </div>

              {/* Message Input Area */}
              <div className="flex-shrink-0 border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                <MessageSender setMessages={setMessages} />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full animate-fadeIn bg-zinc-50 dark:bg-zinc-900">
              <NoConversations />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

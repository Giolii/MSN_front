import { useEffect, useLayoutEffect, useRef, useState } from "react";
import fetchMessages from "../../utils/fetchMessages";
import { useConversation } from "../../contexts/ConversationsContext";
import SingleMessage from "./SingleMessage";
import formatDateHeader from "../../utils/FormatDateHeader";
import LoadingMessages from "../ui/LoadingMessages";
import { ArrowBigDown, MessagesSquare } from "lucide-react";

const VisualizeMessages = ({ messages, setMessages }) => {
  const { conversationSelected } = useConversation();
  const messagesContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [messageGroups, setMessageGroups] = useState([]);

  // Scroll to bottom function with smooth behavior
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Handle scroll events to show/hide scroll button
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  };

  // Fetch messages when conversation changes
  useEffect(() => {
    const handleFetchMessages = async () => {
      if (conversationSelected) {
        try {
          setIsLoading(true);
          setMessages([]); // Clear previous messages while loading
          const messagesData = await fetchMessages(conversationSelected);
          setMessages(messagesData);
        } catch (error) {
          console.error("Error fetching messages:", error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    handleFetchMessages();
  }, [conversationSelected, setMessages]);

  // Group messages by date
  useEffect(() => {
    if (!messages || messages.length === 0) {
      setMessageGroups([]);
      return;
    }

    const groups = [];
    let currentDate = null;
    let currentGroup = [];

    messages.forEach((message) => {
      const messageDate = new Date(message.createdAt);
      const messageDay = messageDate.toDateString();
      if (messageDay !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({
            date: currentDate,
            messages: currentGroup,
          });
        }
        currentDate = messageDay;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({
        date: currentDate,
        messages: currentGroup,
      });
    }

    setMessageGroups(groups);
  }, [messages]);

  // Scroll to bottom when messages change
  useLayoutEffect(() => {
    if (!isLoading && messages.length > 0) {
      scrollToBottom();
    }
  }, [messageGroups, messages]);

  // Add scroll event listener
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative flex flex-col h-full">
      {/* Messages container */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col h-full flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-track-transparent"
      >
        {isLoading ? (
          // Loading skeletons
          <LoadingMessages />
        ) : messageGroups.length > 0 ? (
          // Message groups by date
          messageGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              {/* Date separator */}
              <div className="flex items-center justify-center my-4">
                <div className="bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  {formatDateHeader(group.date)}
                </div>
              </div>

              {/* Messages in this group */}
              <div className="space-y-2">
                {group.messages.map((msg) => (
                  <SingleMessage
                    key={msg.id}
                    msg={msg}
                    setMessages={setMessages}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-5 mb-4">
              <MessagesSquare className="h-12 w-12 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              No messages yet
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-xs">
              Send a message to start the conversation
            </p>
          </div>
        )}
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={() => scrollToBottom()}
          className="absolute bottom-4 right-4 bg-indigo-500 dark:bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:ring-opacity-50"
          aria-label="Scroll to bottom"
        >
          <ArrowBigDown className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default VisualizeMessages;

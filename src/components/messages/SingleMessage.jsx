import { useAuth } from "../../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import fetchEditMessage from "../../utils/fetchEditMessage";
import deleteMessage from "../../utils/deleteMessage";
import { Loader, Trash2, Pencil } from "lucide-react";
import Notification from "./Notification";

const SingleMessage = ({ msg, setMessages }) => {
  const { currentUser } = useAuth();
  const [isHovered, setIsHovered] = useState();
  const [editMessage, setEditMessage] = useState(false);
  const [messageContent, setMessageContent] = useState(msg.content);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const isCurrentUser = currentUser.id === msg.sender?.id;

  useEffect(() => {
    if (editMessage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMessage]);

  const handleEditMessage = async (msgToUpdate) => {
    if (!msgToUpdate || !messageContent.trim()) return;

    try {
      setIsEditing(true);
      const msgUpdated = await fetchEditMessage(messageContent, msgToUpdate.id);

      setMessages((prev) => {
        const messageIndex = prev.findIndex((msg) => msg.id === msgToUpdate.id);
        const updatedMessages = [...prev];
        updatedMessages[messageIndex] = msgUpdated;
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error editing message:", error.message);
    } finally {
      setIsEditing(false);
      setEditMessage(false);
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!msgId) return;

    try {
      await deleteMessage(msgId);
      setMessages((prev) => {
        const messageIndex = prev.findIndex((msg) => msg.id === msgId);
        const updatedMessages = [...prev];
        updatedMessages.splice(messageIndex, 1);
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error deleting message:", error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleEditMessage(msg);
      e.preventDefault();
    }
    if (e.key === "Escape") {
      setEditMessage(false);
      setMessageContent(msg.content);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return;
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Notification Message
  if (msg.notification) return <Notification msg={msg} />;

  return (
    <div
      className={`flex ${
        isCurrentUser ? "justify-end" : "justify-start"
      } mb-4 px-3`}
    >
      {!isCurrentUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden mr-2 mt-1">
          {msg.sender?.avatar ? (
            <img
              src={msg.sender.avatar}
              alt={`${msg.sender.username}'s avatar`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className=" text-sm font-medium">
              {msg.sender?.username?.charAt(0)}
            </span>
          )}
        </div>
      )}

      <div
        className={`max-w-[75%] flex flex-col ${
          isCurrentUser ? "items-end" : "items-start"
        }`}
      >
        {!isCurrentUser && (
          <span className="text-xs text-zinc-600 dark:text-zinc-400 ml-1 mb-1">
            {msg.sender?.username}
          </span>
        )}
        <div
          className={`relative group ${isCurrentUser ? "ml-12" : "mr-12"}`}
          onMouseEnter={() => isCurrentUser && setIsHovered(true)}
          onMouseLeave={() => isCurrentUser && setIsHovered(false)}
        >
          <div
            className={`rounded-2xl p-3 ${
              isCurrentUser
                ? "bg-indigo-500 dark:bg-indigo-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50"
            } shadow-sm transition-all duration-200 break-words`}
          >
            {msg.imageUrl && (
              <div className="mb-2 rounded-lg overflow-hidden">
                <img
                  src={msg.imageUrl}
                  alt="Message attachment"
                  className="max-w-full max-h-60 object-contain"
                />
              </div>
            )}
            {editMessage ? (
              <div className="flex flex-col">
                <textarea
                  ref={inputRef}
                  className="w-full border rounded-lg p-2 text-zinc-900 dark:text-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isEditing}
                />
                <div className="flex justify-end mt-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditMessage(false);
                      setMessageContent(msg.content);
                    }}
                    className="px-3 py-1 text-xs rounded-md bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                    disabled={isEditing}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditMessage(msg)}
                    className="px-3 py-1 text-xs rounded-md bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors flex items-center"
                    disabled={isEditing}
                  >
                    {isEditing ? (
                      <>
                        <Loader className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" />
                        Saving
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{msg.content}</div>
            )}
          </div>

          {isCurrentUser && !editMessage && (
            <div
              className={`absolute -right-5 top-6 transform -translate-y-1/2 flex flex-col gap-1 transition-all duration-200 ${
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => setEditMessage(true)}
                className="p-1 rounded-full bg-white/80 hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                title="Edit message"
              >
                <Pencil className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="p-1 rounded-full bg-white/80 hover:bg-white dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                title="Delete message"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          )}

          <div
            className={`text-xs text-zinc-600 dark:text-zinc-400 mt-1 ${
              isCurrentUser ? "text-right" : "text-left"
            }`}
          >
            {formatTime(msg.timestamp || msg.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;

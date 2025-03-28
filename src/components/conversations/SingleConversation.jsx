import { useState } from "react";
import { useConversation } from "../../contexts/ConversationsContext";
import { useAuth } from "../../contexts/AuthContext";
import otherUserUsername from "../../utils/otherUserUsername";
import fetchLeaveConversation from "../../utils/fetchLeaveConversation";
import fetchSingleConv from "../../utils/fetchSingleConv";
import { Users } from "lucide-react";
import timeAgo from "../../utils/timeAgo";

const SingleConversation = ({ conv }) => {
  const { currentUser } = useAuth();
  const [isHover, setIsHover] = useState(false);
  const {
    conversationSelected,
    setConversationSelected,
    setFilteredConversations,
  } = useConversation();

  const isSelected = conv.id === conversationSelected.id;
  const otherUser = otherUserUsername(conv, currentUser);

  const handleLeaveConversation = async (e) => {
    e.stopPropagation();
    try {
      const leaveConversation = await fetchLeaveConversation(
        currentUser.username,
        conv.id
      );
      setFilteredConversations((prev) => {
        const conversationIndex = prev.findIndex(
          (conv) => conv.id === leaveConversation.conversationId
        );
        const updatedConversations = [...prev];
        updatedConversations.splice(conversationIndex, 1);
        return updatedConversations;
      });
      setConversationSelected("");
    } catch (error) {
      console.error("Error leaving conversation:", error.message);
    }
  };

  const handleClickConversation = async () => {
    try {
      const updatedConversation = await fetchSingleConv(conv.id);
      setConversationSelected(updatedConversation);
    } catch (error) {
      console.error(error.message);
    }
  };

  const lastMessageInfos = () => {
    if (conv.messages?.length > 0) return timeAgo(conv.messages[0].createdAt);
  };

  return (
    <div
      onClick={handleClickConversation}
      className={`px-2 py-2 rounded-lg transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 relative ${
        isSelected
          ? "bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500"
          : "border-l-4 border-transparent"
      }`}
      key={conv.id}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex items-center justify-between select-none">
        {/* Avatar and name section */}
        <div className="flex items-center mr-2 min-w-0">
          <div className="w-10 h-10 rounded-full flex-shrink-0 bg-zinc-200 dark:bg-zinc-700 overflow-hidden border border-zinc-200 dark:border-zinc-700">
            <img
              className="w-full h-full object-cover"
              src={
                conv.isGroup
                  ? conv.groupAvatar || "./img/msn2.png"
                  : otherUser?.user.avatar || "./img/msn2.png"
              }
              alt="Avatar"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-lg font-medium truncate text-zinc-900 dark:text-zinc-50">
              {conv.isGroup
                ? conv.name
                : otherUser?.user.username || "Unknown User"}
            </h3>
          </div>
          <p className="text-[10px] sm:text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-full">
            {lastMessageInfos()}
          </p>
        </div>
      </div>
      {/* Button that shows on hover when selected */}
      <button
        className={`
    transition-opacity duration-300 w-4 absolute top-1 right-1
    ${
      isHover && conv.id === conversationSelected.id
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
    cursor-pointer
  `}
        onClick={handleLeaveConversation}
      >
        <img
          className="w-full h-full object-cover"
          src="./img/leave.png"
          alt=""
        />
      </button>
    </div>
  );
};

export default SingleConversation;

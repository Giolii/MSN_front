import { useConversation } from "../../contexts/ConversationsContext";
import { useState } from "react";
import { X } from "lucide-react";
import GroupName from "./ConversationInfoModal/GroupName";
import Participants from "./ConversationInfoModal/Participants";
import GroupAvatar from "./GroupAvatar";

const ConvInfoModal = ({ setOpenModal }) => {
  const { conversationSelected } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className="z-50 fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl max-w-lg w-full animate-[fadeIn_0.5s_ease-in-out] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Group Information</h2>
            <button
              onClick={() => setOpenModal(false)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <GroupAvatar />

        {/* Content */}
        <div className="p-6">
          <GroupName setIsLoading={setIsLoading} />
          {/* Participants Section */}
          <Participants isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-700 p-4 text-sm text-zinc-600 dark:text-zinc-400 text-center">
          Group created on {formatDate(conversationSelected.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ConvInfoModal;

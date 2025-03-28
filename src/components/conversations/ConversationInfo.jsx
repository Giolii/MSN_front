import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationsContext";
import otherUserUsername from "../../utils/otherUserUsername";
import ConvInfoModal from "./ConvInfoModal";
import UserModal from "../user/UserModal";
import { ChevronDown } from "lucide-react";
import ParticipantCard from "./ConversationInfo/ParticipantCard";

const ConversationInfo = () => {
  const { currentUser } = useAuth();
  const { conversationSelected } = useConversation();
  const [openModal, setOpenModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  return (
    <>
      <div className="p-4 bg-white dark:bg-zinc-800 shadow-sm">
        {conversationSelected.isGroup ? (
          <div className="space-y-3">
            {/* Group conversation header */}
            <div
              className="flex items-center justify-center gap-2 cursor-pointer group"
              onClick={() => setOpenModal(true)}
            >
              <div className="w-10 h-10 mr-2 rounded-full flex-shrink-0 bg-zinc-200 dark:bg-zinc-700 overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <img
                  className="w-full h-full object-cover"
                  src={conversationSelected.groupAvatar || "./img/msn2.png"}
                  alt="Avatar"
                />
              </div>
              <h2 className="text-zinc-900 dark:text-zinc-50">
                {conversationSelected.name}
              </h2>
              <ChevronDown className="h-5 w-5 ml-2 text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-600 transition-colors duration-200" />
            </div>

            {/* Group participants */}
            <div className="relative">
              <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-track-transparent">
                {conversationSelected.participants
                  .filter((participant) => !participant.leftAt)
                  .map((participant) => (
                    <ParticipantCard
                      key={participant.id}
                      participant={participant}
                    />
                  ))}
              </div>

              {/* Fade effect on the right side */}
              <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white dark:from-zinc-800 to-transparent pointer-events-none"></div>
            </div>
          </div>
        ) : (
          // One-on-one conversation
          <div
            className="flex items-center justify-center py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors duration-200"
            onClick={() => setOpenProfileModal(true)}
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden border-2 border-indigo-200 dark:border-indigo-900">
                <img
                  className="w-full h-full object-cover"
                  src={
                    otherUserUsername(conversationSelected, currentUser).user
                      .avatar
                  }
                  alt={`${
                    otherUserUsername(conversationSelected, currentUser).user
                      .username
                  }'s avatar`}
                />
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {
                    otherUserUsername(conversationSelected, currentUser).user
                      .username
                  }
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {conversationSelected.lastActivity
                    ? `Active ${new Date(
                        conversationSelected.lastActivity
                      ).toLocaleDateString()}`
                    : "Click to view profile"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {openModal && <ConvInfoModal setOpenModal={setOpenModal} />}
      {openProfileModal && (
        <UserModal
          userConversation={otherUserUsername(
            conversationSelected,
            currentUser
          )}
          setOpenProfileModal={setOpenProfileModal}
        />
      )}
    </>
  );
};
export default ConversationInfo;

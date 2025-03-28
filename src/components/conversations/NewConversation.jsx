import { useState } from "react";
import ModalNewChat from "./ModalNewChat";
import { Plus } from "lucide-react";

const NewConversation = ({ allConversations }) => {
  const [openModal, setOpenModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          className="flex items-center justify-center p-2 bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white  rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:ring-opacity-50"
          onClick={() => setOpenModal(!openModal)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="New conversation"
        >
          <Plus className="h-5 w-5" />
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="z-1 absolute left-10 transform -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 dark:bg-zinc-700 text-white text-xs rounded whitespace-nowrap">
            New Conversation
          </div>
        )}
      </div>

      {openModal && (
        <ModalNewChat
          allConversations={allConversations}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default NewConversation;

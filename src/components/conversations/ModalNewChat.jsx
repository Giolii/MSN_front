import { useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import addConversation from "../../utils/addConversation";
import checkUsername from "../../utils/checkUsername";
import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationsContext";
import { Plus, X } from "lucide-react";
import ParticipantsBox from "./ModalNewChat/ParticipantsBox";

const ModalNewChat = ({ setOpenModal, allConversations }) => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [participants, setParticipants] = useState([]);
  const [currentParticipant, setCurrentParticipant] = useState("");
  const [groupName, setGroupName] = useState("");
  const { setFilteredConversations, setConversationSelected } =
    useConversation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddParticipant = async (e) => {
    e?.preventDefault();
    if (!currentParticipant.trim()) return;

    try {
      setError("");
      const userToAdd = await checkUsername(
        currentParticipant,
        currentUser,
        participants
      );
      setParticipants((prev) => [...prev, userToAdd]);
      setCurrentParticipant("");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const handleAddConversation = async () => {
    if (participants.length === 0) {
      setError("Please add at least one participant");
      return;
    }

    if (participants.length > 1 && !groupName.trim()) {
      setError("Please provide a group name");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Check for existing one-on-one conversation
      if (participants.length === 1) {
        const existingConversation = allConversations.find((conv) => {
          if (conv.isGroup || conv.participants.length !== 2) return false;
          const participantIds = conv.participants.map((p) => p.userId);
          return (
            participantIds.includes(currentUser.id) &&
            participantIds.includes(participants[0].id)
          );
        });

        if (existingConversation) {
          setConversationSelected(existingConversation);
          setOpenModal(false);
          return;
        }
      }

      const conversation = await addConversation(participants, groupName);
      setFilteredConversations((prev) => [conversation, ...prev]);
      setConversationSelected(conversation);
      setOpenModal(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isGroup = participants.length > 1;

  return (
    <div
      className="fixed z-10 inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-[fadeIn_0.5s_ease-in-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">New Conversation</h2>
            <button
              onClick={() => setOpenModal(false)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5">
          {/* Add participant form */}
          <form onSubmit={handleAddParticipant} className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-50"
            >
              Add participants by username
            </label>
            <div className="flex items-center">
              <div className="relative flex-1">
                <input
                  autoComplete="off"
                  id="username"
                  value={currentParticipant}
                  onChange={(e) => setCurrentParticipant(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent
                            bg-white dark:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-50"
                  type="text"
                  placeholder="Enter username"
                />
              </div>
              <button
                type="submit"
                className="ml-2 p-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-lg 
                          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
                aria-label="Add participant"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Error message */}
          {error && (
            <div className="mb-4">
              <ErrorMessage message={error} />
            </div>
          )}

          {/* Participants list */}
          <ParticipantsBox
            setParticipants={setParticipants}
            participants={participants}
            groupName={groupName}
            setGroupName={setGroupName}
          />

          {/* Action buttons */}
          <div className="flex justify-center mt-5">
            <button
              onClick={handleAddConversation}
              disabled={isSubmitting || participants.length === 0}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-lg 
                        transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500
                        disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Start Conversation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNewChat;

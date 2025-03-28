import { Crown, LogOut, UserCheck } from "lucide-react";
import { useConversation } from "../../../contexts/ConversationsContext";
import becomeAdmin from "../../../utils/becomeAdmin";
import removeUser from "../../../utils/removeUser";
import fetchConversations from "../../../utils/fetchConversations";
import { useAuth } from "../../../contexts/AuthContext";
import AddParticipants from "./AddParticipants";

const Participants = ({ setIsLoading, isLoading }) => {
  const { currentUser } = useAuth();
  const {
    conversationSelected,
    setConversationSelected,
    setFilteredConversations,
  } = useConversation();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isAdmin = () => {
    return conversationSelected.participants.some(
      (part) => part.user.id === currentUser.id && part.isAdmin === true
    );
  };

  const handleBecomeAdmin = async (participant) => {
    if (!isAdmin()) return;

    try {
      setIsLoading(true);
      const newAdmin = await becomeAdmin(
        participant.user.username,
        participant.userId,
        conversationSelected.id
      );

      setConversationSelected((prev) => {
        const updated = { ...prev };
        const index = updated.participants.findIndex(
          (part) => part.userId === participant.userId
        );
        updated.participants[index].isAdmin = true;
        return updated;
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveGroup = async (participant) => {
    if (!isAdmin() || participant.user.id === currentUser.id) return;

    try {
      setIsLoading(true);
      const userRemoved = await removeUser(
        participant.user.username,
        participant.userId,
        conversationSelected.id
      );

      setConversationSelected((prev) => {
        const updated = { ...prev };
        const partIndex = prev.participants.findIndex(
          (part) => part.userId === participant.userId
        );
        if (partIndex !== -1) {
          updated.participants = [...prev.participants];
          updated.participants.splice(partIndex, 1);
        }
        return updated;
      });

      const conversations = await fetchConversations();
      setFilteredConversations(conversations);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Participants
        </h3>

        {isAdmin() && <AddParticipants />}
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {conversationSelected.participants.filter((p) => !p.leftAt).length}{" "}
          members
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {conversationSelected.participants
          .filter((participant) => !participant.leftAt)
          .map((participant) => (
            <div
              key={participant.id}
              className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3 flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={participant.user.avatar}
                    alt={`${participant.user.username}'s avatar`}
                  />
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      {participant.user.username}
                    </span>
                    {participant.isAdmin && (
                      <div
                        className="ml-2 flex items-center text-amber-500"
                        title="Group Admin"
                      >
                        <Crown className="h-5 w-5" />
                      </div>
                    )}
                    {participant.user.id === currentUser.id && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Joined {formatDate(participant.joinedAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!participant.isAdmin && isAdmin() && (
                  <button
                    onClick={() => handleBecomeAdmin(participant)}
                    className="p-2 text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
                    disabled={isLoading}
                    title="Make admin"
                  >
                    <UserCheck className="h-5 w-5" />
                  </button>
                )}

                {isAdmin() && participant.user.id !== currentUser.id && (
                  <button
                    onClick={() => handleLeaveGroup(participant)}
                    className="p-2 text-rose-600 hover:text-rose-700 dark:text-rose-500 dark:hover:text-rose-400 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors duration-300"
                    disabled={isLoading}
                    title="Remove from group"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Participants;

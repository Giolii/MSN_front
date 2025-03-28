import { MessagesSquare, X } from "lucide-react";
import ProfileField from "./ProfileField";
import { useAuth } from "../../contexts/AuthContext";
import fetchConversations from "../../utils/fetchConversations";
import { useConversation } from "../../contexts/ConversationsContext";
import addConversation from "../../utils/addConversation";

const UserModal = ({ setOpenProfileModal, userConversation }) => {
  const { currentUser } = useAuth();
  const { setConversationSelected, setFilteredConversations } =
    useConversation();

  const handleAddConversation = async () => {
    try {
      const allConversations = await fetchConversations();
      const existingConversation = allConversations.find((conv) => {
        if (conv.isGroup || conv.participants.length !== 2) return false;
        const participantIds = conv.participants.map((p) => p.userId);
        return (
          participantIds.includes(currentUser.id) &&
          participantIds.includes(userConversation.user.id)
        );
      });

      if (existingConversation) {
        setConversationSelected(existingConversation);
        setOpenProfileModal(false);
        return;
      }

      const conversation = await addConversation([userConversation.user.id]);
      setFilteredConversations((prev) => [conversation, ...prev]);
      setConversationSelected(conversation);
      setOpenProfileModal(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setOpenProfileModal(false)}
    >
      <div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-[fadeIn_0.5s_ease-in-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {userConversation.user.username}'s Profile
            </h2>
            <button
              onClick={() => setOpenProfileModal(false)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              aria-label="Close profile"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Avatar section */}
        <div className="flex flex-col items-center mt-2 mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden relative shadow-lg -mt-12 ring-4 ring-white dark:ring-zinc-800">
            <img
              className="w-full h-full object-cover"
              src={userConversation.user.avatar}
              alt={`${userConversation.user.username}'s Avatar`}
            />
          </div>
        </div>

        {/* User information */}
        <div className="px-6 pb-6">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-indigo-500 dark:bg-indigo-600 p-4">
              <h3 className="text-lg font-semibold text-white">
                User Information
              </h3>
            </div>

            <div className="bg-white dark:bg-zinc-800 p-6 space-y-4">
              <ProfileField
                label={"name"}
                value={userConversation.user.name}
                labelValue={"Name"}
                edit={false}
              />
              <ProfileField
                label={"aboutMe"}
                value={userConversation.user.aboutMe}
                labelValue={"About me"}
                edit={false}
              />
              <ProfileField
                label={"email"}
                value={userConversation.user.email}
                labelValue={"Email"}
                edit={false}
              />
              <ProfileField
                label={"createdAt"}
                value={new Date(
                  userConversation.user.createdAt
                ).toLocaleDateString()}
                labelValue={"Joined"}
                edit={false}
              />
            </div>
          </div>
          {currentUser.id !== userConversation.user.id && (
            <div className="mt-6">
              <button
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg hover:brightness-110 active:brightness-90 transition-all duration-200 font-medium"
                aria-label="Send message"
                onClick={handleAddConversation}
              >
                <MessagesSquare className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;

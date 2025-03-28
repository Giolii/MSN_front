import { useEffect, useRef, useState } from "react";
import { useConversation } from "../../../contexts/ConversationsContext";
import { useAuth } from "../../../contexts/AuthContext";
import { Check, Pencil } from "lucide-react";
import updateGroupName from "../../../utils/updateGroupName";

const GroupName = ({ setIsLoading }) => {
  const {
    conversationSelected,
    setConversationSelected,
    setFilteredConversations,
  } = useConversation();
  const { currentUser } = useAuth();
  const [editGroupName, setEditGroupName] = useState(false);
  const [groupName, setGroupName] = useState(conversationSelected?.name);

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (conversationSelected?.name) {
      setGroupName(conversationSelected.name);
    }
  }, [conversationSelected]);

  useEffect(() => {
    if (editGroupName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editGroupName]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveGroupName();
    } else if (e.key === "Escape") {
      setEditGroupName(false);
      setGroupName(conversationSelected.name); // Reset to original name
    }
  };

  const handleSaveGroupName = async () => {
    if (groupName.trim() === "" || groupName === conversationSelected.name) {
      setEditGroupName(false);
      setGroupName(conversationSelected.name);
      return;
    }

    try {
      setIsLoading(true);
      const conversationUpdated = await updateGroupName(
        conversationSelected,
        groupName
      );

      setConversationSelected((prev) => {
        const updated = { ...prev };
        updated.name = groupName;
        return updated;
      });

      setEditGroupName(false);
      setFilteredConversations((prev) => {
        const oldConversations = prev.filter(
          (conv) => conv.id !== conversationSelected.id
        );
        return [conversationUpdated, ...oldConversations];
      });
    } catch (error) {
      console.error("Error updating conversation name:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = () => {
    return conversationSelected?.participants.some(
      (part) => part.user.id === currentUser.id && part.isAdmin === true
    );
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
        Group Name
      </label>
      <div className="flex items-center">
        {editGroupName ? (
          <div className="flex-1 relative">
            <input
              autoComplete="off"
              ref={nameInputRef}
              className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveGroupName}
              placeholder="Enter group name"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <button
                onClick={handleSaveGroupName}
                className="p-1 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                aria-label="Save group name"
              >
                <Check className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => isAdmin() && setEditGroupName(true)}
            className={`flex-1 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg font-medium flex items-center ${
              isAdmin()
                ? "cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
                : ""
            }`}
          >
            <span className="text-zinc-900 dark:text-zinc-50">
              {conversationSelected?.name}
            </span>
            {isAdmin() && (
              <Pencil className="h-4 w-4 ml-2 text-zinc-600 dark:text-zinc-400" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupName;

import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useConversation } from "../../../contexts/ConversationsContext";
import addConversation from "../../../utils/addConversation";
import { MessageCircle, Search, User } from "lucide-react";

const ListOfFriends = ({ allConversations, setOpenFriendsList }) => {
  const { currentUser } = useAuth();
  const { setFilteredConversations, setConversationSelected } =
    useConversation();
  const [searchValue, setSearchValue] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    setFriendsList(currentUser.friends);
  }, []);

  const handleInputChange = (e) => {
    const filter = e.target.value;
    setSearchValue(filter);

    if (filter.trim() === "") {
      setFriendsList(currentUser.friends);
    } else {
      const filtered = currentUser.friends.filter((user) => {
        return user.username.toLowerCase().includes(filter.toLowerCase());
      });
      setFriendsList(filtered);
    }
  };

  const handleClickFriend = async (friend) => {
    try {
      const existingConversation = allConversations.find((conv) => {
        if (conv.isGroup || conv.participants.length !== 2) return false;
        const participantIds = conv.participants.map((p) => p.userId);
        return (
          participantIds.includes(currentUser.id) &&
          participantIds.includes(friend.id)
        );
      });

      if (existingConversation) {
        setConversationSelected(existingConversation);
        setOpenFriendsList(false);
        return;
      }
      const conversation = await addConversation([friend]);
      setOpenFriendsList(false);
      setFilteredConversations((prev) => [conversation, ...prev], false);
      setConversationSelected(conversation);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>

        <input
          autoComplete="off"
          className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-700 border border-transparent 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:bg-white
                    dark:focus:bg-zinc-800 transition-colors duration-200 text-sm text-zinc-900 dark:text-zinc-50"
          type="text"
          placeholder="Search friends"
          onChange={handleInputChange}
          value={searchValue}
        />
      </div>

      {/* Friends List */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden overflow-y-scroll max-h-[50vh] p-1">
        {friendsList && friendsList.length > 0 ? (
          friendsList.map((friend) => (
            <div
              key={friend.id}
              onClick={() => handleClickFriend(friend)}
              className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200 mb-1"
            >
              {/* User Avatar */}
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3 text-indigo-700 dark:text-indigo-300 font-semibold flex-shrink-0">
                {friend.username.charAt(0).toUpperCase()}
              </div>

              {/* Username */}
              <div className="flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {friend.username}
                </p>
                {friend.status && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {friend.status}
                  </p>
                )}
              </div>

              {/* Chat Icon */}
              <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors">
                <MessageCircle className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 px-4 text-center">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-8 w-8 text-zinc-600 dark:text-zinc-400" />
            </div>
            <p className="text-zinc-900 dark:text-zinc-50 font-medium">
              No friends found
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
              {searchValue
                ? "Try a different search term"
                : "Add some friends to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListOfFriends;

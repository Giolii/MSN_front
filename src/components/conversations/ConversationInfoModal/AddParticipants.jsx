import { Loader, Plus, Search, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorMessage from "../../ui/ErrorMessage";
import fetchAllUsers from "../../../utils/fetchAllUsers";
import { useConversation } from "../../../contexts/ConversationsContext";
import addParticipantToConversation from "../../../utils/addParticipantToConversation";
import fetchSingleConv from "../../../utils/fetchSingleConv";

const AddParticipants = () => {
  const { conversationSelected, setConversationSelected } = useConversation();
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const handleFetchAllUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAllUsers();
        const usersWithoutParticipants = data.filter((user) => {
          return !conversationSelected.participants.some(
            (participant) =>
              participant.userId === user.id && !participant.leftAt
          );
        });

        setAllUsers(usersWithoutParticipants);
        setFilteredUsers(usersWithoutParticipants);
      } catch (error) {
        console.error(error.message);
        setError("Failed to load users. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchAllUsers();
  }, []);

  const handleInputChange = (e) => {
    const filter = e.target.value;
    setSearchValue(filter);
    if (filter.trim() === "") {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter((user) => {
        return user.username.toLowerCase().includes(filter.toLowerCase());
      });
      setFilteredUsers(filtered);
    }
  };

  const handleAddParticipant = async (user) => {
    try {
      const userConversation = await addParticipantToConversation(
        user.username,
        user.id,
        conversationSelected.id
      );
      setFilteredUsers((prev) => prev.filter((part) => part.id !== user.id));
      setAllUsers((prev) => prev.filter((part) => part.id !== user.id));
      const conversationUpdated = await fetchSingleConv(
        conversationSelected.id
      );
      setConversationSelected(conversationUpdated);
    } catch (error) {
      console.error(error);
      setError(error?.message);
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:ring-opacity-50"
        onClick={() => setOpenModal(true)}
      >
        <UserPlus className="w-5 h-5" />
      </button>

      {openModal && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpenModal(false)}
          ></div>

          <div
            className="z-50 bg-zinc-50 dark:bg-zinc-900 absolute transform -translate-x-1/2 p-2 border border-zinc-200 dark:border-zinc-700 rounded-xl min-w-3xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 relative b ">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                <Search className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
              </div>
              <input
                autoComplete="off"
                className="w-full pl-10 py-2 bg-white dark:bg-zinc-800 border border-transparent 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 
                    focus:bg-white dark:focus:bg-zinc-800 transition-colors duration-200 text-sm text-zinc-900 dark:text-zinc-50"
                type="text"
                placeholder="Search users..."
                onChange={handleInputChange}
                value={searchValue}
              />
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
              {isLoading && (
                <div className="flex items-center justify-center h-32">
                  <Loader className="animate-spin h-8 w-8 text-indigo-500 dark:text-indigo-600" />
                </div>
              )}
              {error && <ErrorMessage message={error} />}
              {filteredUsers.length === 0 ? (
                <div className="p-6 text-center text-zinc-600 dark:text-zinc-400">
                  No users found matching your search.
                </div>
              ) : (
                <div className="overflow-y-scroll h-60">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors duration-200 mb-1 border-b border-zinc-50 dark:border-zinc-900"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                          <img
                            className="w-full h-full object-cover"
                            src={user.avatar}
                            alt={`${user.username}'s avatar`}
                          />
                        </div>
                        <span className="font-medium text-zinc-900 dark:text-zinc-50 truncate">
                          {user.username}
                        </span>
                      </div>
                      <button
                        className="p-2 ml-2 text-indigo-500 dark:text-indigo-600 bg-white dark:bg-zinc-800 hover:text-white rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                        onClick={() => handleAddParticipant(user)}
                      >
                        <UserPlus className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddParticipants;

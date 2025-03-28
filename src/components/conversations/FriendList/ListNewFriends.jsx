import { useEffect, useState } from "react";
import fetchAllUsers from "../../../utils/fetchAllUsers";
import { useAuth } from "../../../contexts/AuthContext";
import isFriendAlready from "../../../utils/isFriendAlready";
import addFriend from "../../../utils/addFriend";
import removeFriend from "../../../utils/removeFriend";
import { Check, Plus, Search } from "lucide-react";

const ListNewFriends = () => {
  const { setCurrentUser, currentUser } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleFetchAllUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAllUsers();
        setAllUsers(data);
        setFilteredUsers(data);
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

  const handleAddFriend = async (friend) => {
    try {
      await addFriend(friend.id);
      setCurrentUser((prev) => ({
        ...prev,
        friends: [...prev.friends, friend],
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRemoveFriend = async (friend) => {
    try {
      await removeFriend(friend.id);
      setCurrentUser((prev) => ({
        ...prev,
        friends: prev.friends.filter((f) => f.id !== friend.id),
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full">
      {/* Search input */}
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <input
          autoComplete="off"
          className="w-full pl-10 py-2 bg-zinc-100 dark:bg-zinc-700 border border-transparent 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:bg-white
                    dark:focus:bg-zinc-800 transition-colors duration-200 text-sm text-zinc-900 dark:text-zinc-50"
          type="text"
          placeholder="Search users..."
          onChange={handleInputChange}
          value={searchValue}
        />
      </div>

      {/* Users list container */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden max-h-[50vh]">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 dark:border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-rose-500 dark:text-rose-400">
            {error}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 text-center text-zinc-600 dark:text-zinc-400">
            No users found matching your search.
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[50vh] p-1">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors duration-200 mb-1"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-medium text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">
                    {user.username}
                  </span>
                </div>

                {isFriendAlready(currentUser.friends, user.id) ? (
                  <button
                    onClick={() => handleRemoveFriend(user)}
                    className="flex items-center justify-center w-8 h-8 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900 dark:hover:bg-emerald-800 rounded-full text-emerald-600 dark:text-emerald-400 transition-colors duration-200"
                    aria-label="Remove friend"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddFriend(user)}
                    className="flex items-center justify-center w-8 h-8 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 rounded-full text-indigo-600 dark:text-indigo-400 transition-colors duration-200"
                    aria-label="Add friend"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNewFriends;

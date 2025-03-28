import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useConversation } from "../../contexts/ConversationsContext";
import { Search, X } from "lucide-react";

const FilterConversations = ({ allConversations }) => {
  const { currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState([]);
  const { setFilteredConversations } = useConversation();
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const filter = e.target.value;
    setSearchValue(filter);

    if (filter.trim() === "") {
      setFilteredConversations(allConversations);
    } else {
      const filtered = allConversations.filter((conversation) => {
        return conversation.name
          ? conversation.name.toLowerCase().includes(filter.toLowerCase())
          : conversation.participants.some(
              (userConv) =>
                userConv.user.id !== currentUser.id &&
                userConv.user.username
                  .toLowerCase()
                  .includes(filter.toLowerCase())
            );
      });
      setFilteredConversations(filtered);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setFilteredConversations(allConversations);
    inputRef.current.focus();
  };

  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
      </div>

      <input
        autoComplete="off"
        ref={inputRef}
        className="w-full pl-10 py-2 bg-zinc-100 dark:bg-zinc-700 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:bg-white dark:focus:bg-zinc-800 transition-colors duration-200 text-sm text-zinc-900 dark:text-zinc-50"
        type="text"
        placeholder="Search"
        onChange={(e) => handleInputChange(e)}
        value={searchValue}
      />
      {searchValue && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-4 w-4 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50" />
        </button>
      )}
    </div>
  );
};

export default FilterConversations;

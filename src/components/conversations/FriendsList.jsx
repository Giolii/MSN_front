import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ListOfFriends from "./FriendList/ListOfFriends";
import ListNewFriends from "./FriendList/ListNewFriends";
import { ArrowLeft, UserPlus, UserPlus2, Users, X } from "lucide-react";

const FriendsList = ({ allConversations }) => {
  const [openFriendsList, setOpenFriendsList] = useState(false);
  const [addNewFriend, setAddNewFriend] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          className="flex items-center justify-center p-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white  rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:ring-opacity-50"
          onClick={() => setOpenFriendsList(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Friends list"
        >
          <Users className="h-5 w-5" />
        </button>
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 dark:bg-zinc-700 text-white text-xs rounded whitespace-nowrap">
            Friends List
          </div>
        )}
      </div>

      {/* Friends List Modal */}
      {openFriendsList && (
        <div
          className="z-50 fixed inset-0 flex items-start pt-24 justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpenFriendsList(false)}
        >
          <div
            className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-[fadeIn_0.5s_ease-in-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 text-white">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">
                  {addNewFriend ? "Add New Friend" : "Friend List"}
                </h1>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    onClick={() => setAddNewFriend(!addNewFriend)}
                    aria-label={
                      addNewFriend ? "Back to friend list" : "Add new friend"
                    }
                  >
                    {addNewFriend ? (
                      <Users className="h-5 w-5" />
                    ) : (
                      <UserPlus className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    onClick={() => setOpenFriendsList(false)}
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 max-h-[70vh] overflow-y-auto">
              {addNewFriend ? (
                <ListNewFriends />
              ) : (
                <ListOfFriends
                  allConversations={allConversations}
                  setOpenFriendsList={setOpenFriendsList}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendsList;

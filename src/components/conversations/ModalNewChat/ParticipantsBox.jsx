import { X } from "lucide-react";

const ParticipantsBox = ({
  participants,
  groupName,
  setGroupName,
  setParticipants,
}) => {
  const isGroup = participants.length > 1;
  const handleRemoveParticipant = (userId) => {
    setParticipants(participants.filter((p) => p.id !== userId));
  };

  return (
    <>
      {participants.length > 0 && (
        <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 mb-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
              {isGroup ? "Group Participants" : "Participant"}
            </h3>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {participants.length}{" "}
              {participants.length === 1 ? "user" : "users"}
            </span>
          </div>

          {/* Group name input (only shown for group chats) */}
          {isGroup && (
            <div className="mb-4 bg-white dark:bg-zinc-800 p-3 rounded-md border border-zinc-200 dark:border-zinc-700">
              <label
                htmlFor="groupName"
                className="block text-sm font-medium mb-1 text-zinc-900 dark:text-zinc-50"
              >
                Group Name
              </label>
              <input
                autoComplete="off"
                className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md
                              focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent
                              bg-white dark:bg-zinc-800 transition-colors text-zinc-900 dark:text-zinc-50"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                type="text"
                id="groupName"
                placeholder="Enter group name"
              />
            </div>
          )}

          {/* Participants chips */}
          <div className="flex flex-wrap gap-2">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center bg-white dark:bg-zinc-800 px-3 py-2 rounded-full
                              border border-zinc-200 dark:border-zinc-700 group"
              >
                {participant.avatar && (
                  <img
                    src={participant.avatar}
                    alt={`${participant.username}'s avatar`}
                    className="w-6 h-6 object-cover rounded-full mr-2"
                  />
                )}
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {participant.username}
                </span>
                <button
                  onClick={() => handleRemoveParticipant(participant.id)}
                  className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400"
                  aria-label={`Remove ${participant.username}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipantsBox;

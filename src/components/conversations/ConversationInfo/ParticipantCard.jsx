import { useState } from "react";
import UserModal from "../../user/UserModal";

const ParticipantCard = ({ participant }) => {
  const [openGroupProfileModal, setOpenGroupProfileModal] = useState(false);

  return (
    <>
      <div
        key={participant.id}
        className="select-none flex flex-col items-center min-w-[60px] p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 bg-white dark:bg-zinc-800 transition-colors duration-200"
        onClick={() => setOpenGroupProfileModal(true)}
      >
        <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700">
          {participant.user.avatar && (
            <img
              className="w-full h-full object-cover"
              src={participant.user.avatar}
              alt={`${participant.user.username}'s avatar`}
            />
          )}
        </div>
        <p className="text-xs mt-1 font-medium truncate w-full text-center text-zinc-900 dark:text-zinc-50">
          {participant.user.username}
        </p>
      </div>
      {openGroupProfileModal && (
        <UserModal
          setOpenProfileModal={setOpenGroupProfileModal}
          userConversation={participant}
        />
      )}
    </>
  );
};

export default ParticipantCard;

import { useAuth } from "../../contexts/AuthContext";
import ProfileField from "./ProfileField";
import ProfilePicture from "./ProfilePicture";

const ProfileModal = ({ setOpenModal }) => {
  const { currentUser } = useAuth();

  return (
    <div
      className="z-50 fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-[fadeIn_0.5s_ease-in-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 text-white">
          <h2 className="text-2xl font-bold text-center">
            {currentUser.username}'s Profile
          </h2>
        </div>

        <div className="p-6 flex flex-col items-center">
          <ProfilePicture />

          <div className="w-full mt-6 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-indigo-500 dark:bg-indigo-600 p-4">
              <h3 className="text-lg font-semibold text-white">
                User Information
              </h3>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 space-y-4 w-full">
              <ProfileField
                label={"name"}
                value={currentUser.name}
                labelValue={"Name"}
                edit={true}
              />
              <ProfileField
                label={"aboutMe"}
                value={currentUser.aboutMe}
                labelValue={"About me"}
                edit={true}
              />
              <ProfileField
                label={"email"}
                value={currentUser.email}
                labelValue={"Email"}
                edit={false}
              />
              <ProfileField
                label={"createdAt"}
                value={new Date(currentUser.createdAt).toLocaleDateString()}
                labelValue={"Joined"}
                edit={false}
              />
            </div>
          </div>

          <button
            onClick={() => setOpenModal(false)}
            className="mt-6 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-50 font-medium py-2 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

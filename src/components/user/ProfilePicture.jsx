import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import updateUserAvatar from "../../utils/updateUserAvatar";

const ProfilePicture = () => {
  const { currentUser, setCurrentUser } = useAuth();

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    try {
      setIsUploading(true);
      const newAvatar = await updateUserAvatar(avatarFile);
      setCurrentUser((prev) => ({ ...prev, avatar: newAvatar.user.avatar }));
      setAvatarFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error(error.messagge);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-2">
      <div
        className="w-28 h-28 rounded-full overflow-hidden group relative shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-200 -mt-12 ring-4 ring-white dark:ring-zinc-800"
        onClick={handleAvatarClick}
      >
        <img
          className="w-full h-full object-cover"
          src={previewUrl || currentUser.avatar}
          alt="User Avatar"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
          <span className="text-white font-medium">Change</span>
        </div>
        <input
          autoComplete="off"
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {avatarFile && (
        <div className="mt-4 flex space-x-3">
          <button
            onClick={handleAvatarUpload}
            disabled={isUploading}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            {isUploading ? "Uploading..." : "Save Avatar"}
          </button>
          <button
            onClick={() => {
              setAvatarFile(null);
              setPreviewUrl(null);
            }}
            className="px-4 py-2 bg-zinc-600 text-white rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;

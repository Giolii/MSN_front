import { useState } from "react";
import updateProfile from "../../utils/updateProfile";
import { useAuth } from "../../contexts/AuthContext";
import { Check, Loader, Pencil, X } from "lucide-react";

const ProfileField = ({ label, labelValue, value, edit }) => {
  const { currentUser, setCurrentUser } = useAuth();
  const [editValue, setEditValue] = useState(false);
  const [newValue, setNewValue] = useState(value || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateProfile();
    }
    if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setNewValue(value || "");
    setEditValue(false);
    setError("");
  };

  const handleUpdateProfile = async () => {
    if (newValue.trim() === "") {
      setError("Field cannot be empty");
      return;
    }

    if (newValue === value) {
      setEditValue(false);
      return;
    }

    try {
      setIsUpdating(true);
      setError("");
      const update = { [label]: newValue };
      const profileUpdated = await updateProfile(update);
      setCurrentUser(profileUpdated);
      setEditValue(false);
    } catch (error) {
      setError(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex flex-col space-y-1">
        <label
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          htmlFor={`profile-field-${label}`}
        >
          {labelValue}
        </label>

        <div className="relative group">
          {/* View Mode */}
          {!editValue ? (
            <div className="flex items-center">
              <div className="flex-1 min-h-[38px] py-2 px-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                {value || (
                  <span className="text-zinc-400 dark:text-zinc-500 italic">
                    Not specified
                  </span>
                )}
              </div>

              {/* Edit Button */}
              {edit && (
                <button
                  type="button"
                  aria-label={`Edit ${labelValue}`}
                  className="ml-2 p-2 rounded-full text-zinc-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                  onClick={() => setEditValue(true)}
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            /* Edit Mode */
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <input
                  id={`profile-field-${label}`}
                  autoFocus
                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 outline-none transition-colors duration-200 dark:bg-zinc-800 dark:text-zinc-50 ${
                    error
                      ? "border-rose-500 dark:border-rose-500"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                  type="text"
                  value={newValue}
                  onChange={(e) => {
                    setNewValue(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={isUpdating}
                />

                {/* Action Buttons */}
                <div className="flex ml-2 space-x-1">
                  {/* Save Button */}
                  <button
                    type="button"
                    aria-label="Save changes"
                    className={`p-2 rounded-full text-white ${
                      isUpdating
                        ? "bg-indigo-400 dark:bg-indigo-500 cursor-not-allowed"
                        : "bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                    } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:ring-offset-2`}
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    aria-label="Cancel editing"
                    className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                    onClick={cancelEdit}
                    disabled={isUpdating}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-rose-500 dark:text-rose-400 text-sm">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileField;

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import ProfileModal from "../user/ProfileModal";
import { ThemeToggle } from "../ui/ThemeTOggle";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  return (
    <nav className="text-zinc-900 dark:text-zinc-50 bg-white dark:bg-zinc-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img className="h-9 w-auto" src="./img/msnbig.png" alt="msn logo" />
            <Link
              to="/"
              className="text-xl font-bold tracking-tight hover:opacity-90 transition-colors"
            >
              MSN
            </Link>
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-6">
                <div
                  className="select-none border border-zinc-200 dark:border-zinc-700 flex items-center space-x-3 py-2 px-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  onClick={() => setOpenModal(true)}
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden ring-2 ring-indigo-400/50 dark:ring-indigo-500/50">
                    <img
                      className="w-full h-full object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                  </div>
                  <p className="font-medium">{currentUser.username}</p>
                  <button
                    className="bg-rose-600 hover:bg-rose-500 dark:bg-rose-800 dark:hover:bg-rose-700 text-white font-medium cursor-pointer p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 w-8 h-8"
                    onClick={() => logout()}
                  >
                    <LogOut className="h-full w-full" />
                  </button>
                </div>
                <ThemeToggle />
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <Link
                  to="/register"
                  className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-zinc-700 hover:bg-zinc-800 dark:bg-zinc-600 dark:hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Login
                </Link>
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </div>
      {openModal && <ProfileModal setOpenModal={setOpenModal} />}
    </nav>
  );
};

export default Navbar;

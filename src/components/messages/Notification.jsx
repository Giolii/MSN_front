import { AlertTriangle, Bell, Crown } from "lucide-react";

const Notification = ({ msg }) => {
  if (msg.notification === "red")
    return (
      <div className="mx-auto my-2 max-w-lg px-4 py-2 flex items-center justify-center gap-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-300 dark:border-rose-800 rounded-full shadow-sm animate-fadeIn">
        <AlertTriangle className="h-4 w-4 text-rose-500 dark:text-rose-400 flex-shrink-0" />
        <span className="text-center text-sm font-medium text-rose-600 dark:text-rose-300 whitespace-pre-wrap">
          {msg.content}
        </span>
      </div>
    );
  if (msg.notification === "blue")
    return (
      <div className="mx-auto my-2 max-w-lg px-4 py-2 flex items-center justify-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-300 dark:border-indigo-800 rounded-full shadow-sm animate-fadeIn">
        <Bell className="h-4 w-4 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
        <span className="text-center text-sm font-medium text-indigo-600 dark:text-indigo-300 whitespace-pre-wrap">
          {msg.content}
        </span>
      </div>
    );
  if (msg.notification === "green")
    return (
      <div className="mx-auto my-2 max-w-lg px-4 py-2 flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-800 rounded-full shadow-sm animate-fadeIn">
        <Crown className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
        <span className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-300 whitespace-pre-wrap">
          {msg.content}
        </span>
      </div>
    );
};

export default Notification;

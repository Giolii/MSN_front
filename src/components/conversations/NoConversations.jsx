import { MessageCircleMore } from "lucide-react";

const NoConversations = () => {
  return (
    <div className="flex items-center justify-center h-full flex-col p-6 text-center">
      <div className="w-24 h-24 rounded-full bg-zinc-100 dark:bg-zinc-700 mb-4 flex items-center justify-center">
        <MessageCircleMore className="h-12 w-12 text-zinc-600 dark:text-zinc-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
        No Conversation Selected
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Select a conversation or start a new one to begin messaging
      </p>
    </div>
  );
};

export default NoConversations;

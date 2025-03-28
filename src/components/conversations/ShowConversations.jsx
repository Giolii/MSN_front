import { useEffect, useState } from "react";
import { useConversation } from "../../contexts/ConversationsContext";
import fetchConversations from "../../utils/fetchConversations";
import SingleConversation from "./SingleConversation";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";
import { MessageCircleMore } from "lucide-react";

const ShowConversations = ({ setAllConversations }) => {
  const { filteredConversations, setFilteredConversations } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const conversationsData = await fetchConversations();
        setAllConversations(conversationsData);
        setFilteredConversations(conversationsData);
      } catch (error) {
        console.error("Error fetching conversations:", error.message);
        setError("Failed to load conversations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-track-transparent px-1">
      {filteredConversations.length > 0 ? (
        <div className="py-2 space-y-1">
          {filteredConversations.map((conv) => (
            <SingleConversation key={conv.id} conv={conv} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-4 mb-4">
            <MessageCircleMore className="h-10 w-10 text-zinc-600 dark:text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
            No conversations yet
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xs text-sm">
            Start a new conversation or search for contacts to begin messaging
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowConversations;

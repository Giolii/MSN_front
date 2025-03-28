import { useRef, useState, useEffect } from "react";
import sendMessage from "../../utils/sendMessage";
import { useConversation } from "../../contexts/ConversationsContext";
import uploadImage from "../../utils/uploadImage";
import GifSearch from "./GifSearch";
import { ImagePlay, Loader, X, Send, Image } from "lucide-react";

const MessageSender = ({ setMessages }) => {
  const { conversationSelected, setFilteredConversations } = useConversation();
  const [messageToSend, setMessageToSend] = useState("");
  const [imageToSend, setImageToSend] = useState(null);
  const [imageToSendPreview, setImageToSendPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const [openGif, setOpenGif] = useState(false);

  const handleSendMessage = async () => {
    try {
      if ((!messageToSend.trim() || !conversationSelected) && !imageToSend) {
        return;
      }

      setIsSubmitting(true);
      const sendMessageData = await sendMessage(
        messageToSend,
        conversationSelected,
        imageToSend
      );

      setMessages((prev) => [...prev, sendMessageData]);
      setMessageToSend("");
      setFilteredConversations((prev) => {
        const oldConversations = prev.filter(
          (conv) => conv.id !== conversationSelected.id
        );
        return [conversationSelected, ...oldConversations];
      });

      setImageToSend(null);
      setImageToSendPreview(null);

      // Focus back on input after sending
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadImg = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const objUrl = URL.createObjectURL(file);
        setImageToSendPreview(objUrl);
        const imageUrl = await uploadImage(file);
        setImageToSend(imageUrl);
        // Focus on text input after uploading
        inputRef.current?.focus();
      } catch (error) {
        console.error("Error uploading image:", error.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  useEffect(() => {
    if (!isSubmitting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSubmitting]);

  if (openGif) {
    return (
      <GifSearch
        setOpenGif={setOpenGif}
        setImageToSendPreview={setImageToSendPreview}
        setImageToSend={setImageToSend}
      />
    );
  }

  return (
    <div className="p-3">
      {/* Image preview if an image is selected */}
      {imageToSendPreview && (
        <div className="mb-3 relative">
          <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 inline-block max-w-[200px] shadow-sm">
            <img
              src={imageToSendPreview}
              alt="Selected"
              className="max-h-40 object-contain"
            />
            <button
              onClick={() => {
                setImageToSendPreview(null);
                setImageToSend(null);
              }}
              className="absolute top-1 right-1 bg-zinc-800 bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Message input area */}
      <div className="flex items-center bg-zinc-100 dark:bg-zinc-700 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-700 pr-2">
        {/* Attachment buttons */}
        <div className="flex items-center">
          <button
            onClick={() => fileInputRef.current.click()}
            disabled={isUploading}
            className="p-1 sm:p-3 text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 relative rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
            aria-label="Upload image"
            title="Upload image"
          >
            {isUploading ? (
              <Loader className="animate-spin h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            ) : (
              <Image className="h-5 w-5" />
            )}
            <input
              autoComplete="off"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleUploadImg}
              ref={fileInputRef}
            />
          </button>

          <button
            onClick={() => setOpenGif(true)}
            className="p-1 sm:p-3 text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
            aria-label="Choose GIF"
            title="Choose GIF"
          >
            <ImagePlay className="w-5 h-5" />
          </button>
        </div>

        {/* Text input */}
        <div className="flex-1">
          <input
            ref={inputRef}
            name="content"
            className="w-full py-2 px-1 sm:px-3 bg-transparent border-none focus:outline-none focus:ring-0 text-zinc-900 dark:text-zinc-50 placeholder-zinc-600 dark:placeholder-zinc-400"
            type="text"
            placeholder="Type a message..."
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMessage()
            }
            autoComplete="off"
            disabled={isSubmitting}
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSendMessage}
          disabled={isSubmitting || (!messageToSend.trim() && !imageToSend)}
          className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600
                    ${
                      !messageToSend.trim() && !imageToSend
                        ? "bg-zinc-300 text-zinc-500 dark:bg-zinc-600 dark:text-zinc-400"
                        : "bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                    }`}
          aria-label="Send message"
        >
          {isSubmitting ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageSender;

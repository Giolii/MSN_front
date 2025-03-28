import React, { createContext, useState, useContext } from "react";

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [conversationSelected, setConversationSelected] = useState("");

  return (
    <ConversationContext.Provider
      value={{
        filteredConversations,
        setFilteredConversations,
        conversationSelected,
        setConversationSelected,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => useContext(ConversationContext);

const otherUserUsername = (conv, currentUser) => {
  if (conv.isGroup) return conv.name;
  const index = conv.participants.findIndex(
    (participant) => participant.userId !== currentUser.id
  );
  return conv.participants[index];
};

export default otherUserUsername;

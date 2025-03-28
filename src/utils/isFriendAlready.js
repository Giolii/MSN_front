const isFriendAlready = (friends, friendId) => {
  return friends.find((friend) => friend.id === friendId);
};

export default isFriendAlready;

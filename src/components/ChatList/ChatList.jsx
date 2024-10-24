const ChatList = () => {
  const users = [
    { name: "Darlene Black", avatar: "/path_to_avatar.jpg", online: true },
    { name: "Brandon Wilson", avatar: "/path_to_avatar.jpg", online: true },
    { name: "Kyle Fisher", avatar: "/path_to_avatar.jpg", online: false },
    { name: "Audrey Alexander", avatar: "/path_to_avatar.jpg", online: true },
  ];

  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-bold mb-4">CHATS</h2>
      {users.map((user, index) => (
        <div key={index} className="flex items-center space-x-3 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-900 font-medium">{user.name}</p>
            <div className="text-sm">
              {/* {user.online ? (
                <span className="text-green-500">● Online</span>
              ) : (
                <span className="text-gray-500">● Offline</span>
              )} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

const LoadingMessages = () => {
  return (
    <div className="flex flex-col space-y-4 py-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`flex ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`bg-gray-200 dark:bg-gray-700 rounded-lg p-3 animate-pulse ${
              index % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"
            }`}
          >
            <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingMessages;

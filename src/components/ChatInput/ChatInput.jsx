"use client";

const MessageInput = () => {
  return (
    <div className="flex items-center p-4 bg-white border-t">
      <button className="mr-2">
        <svg
          className="w-6 h-6 text-gray-500"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fillRule="evenodd" d="M19 6l-7 7-7-7" />
        </svg>
      </button>
      <input
        type="text"
        placeholder="Type a message"
        className="flex-grow px-4 py-2 border rounded-full focus:outline-none"
      />
      <button className="ml-2">
        <svg
          className="w-6 h-6 text-gray-500"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2.293 6.293a1 1 0 011.414 0l9 9a1 1 0 001.414 0l9-9a1 1 0 10-1.414-1.414L12 13.586 3.707 5.293a1 1 0 00-1.414 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;

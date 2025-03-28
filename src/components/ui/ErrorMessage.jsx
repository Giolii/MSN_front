import React, { useEffect, useState } from "react";

const ErrorMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(!!message);
  const [localMessage, setLocalMessage] = useState(message);
  const [height, setHeight] = useState(0);
  const [contentRef, setContentRef] = useState(null);

  // Update local message when prop changes
  useEffect(() => {
    if (message) {
      setLocalMessage(message);
      setIsVisible(true);

      // Auto-dismiss after 5 seconds
      const dismissTimer = setTimeout(() => {
        setIsVisible(false);
        // Delay clearing the message text until after transition completes
        setTimeout(() => setLocalMessage(""), 300);
      }, 3000);

      return () => clearTimeout(dismissTimer);
    }
  }, [message]);

  // Get the actual height of the error content
  useEffect(() => {
    if (contentRef) {
      setHeight(isVisible && localMessage ? contentRef.offsetHeight : 0);
    }
  }, [isVisible, localMessage, contentRef]);

  return (
    <div
      className={`
        w-full overflow-hidden transition-all duration-300 ease-in-out
      `}
      style={{ height: height }}
    >
      <div
        ref={setContentRef}
        className={`
          relative border border-red-400 text-red-700 px-4 py-2 rounded-lg
          text-center transition-all duration-300 ease-in-out 

          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }
        `}
      >
        <p className="w-full"> {localMessage}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;

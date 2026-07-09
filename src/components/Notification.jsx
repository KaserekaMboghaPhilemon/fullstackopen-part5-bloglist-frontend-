// src/components/Notification.jsx
import React from "react";

const Notification = ({ messageObj }) => {
  // If there is no message object or the text is empty, render nothing
  if (messageObj === null || !messageObj.text) {
    return null;
  }

  // Determine the CSS class based on the type ('success' or 'error')
  const notificationStyle =
    messageObj.type === "error" ? "error-msg" : "success-msg";

  return <div className={notificationStyle}>{messageObj.text}</div>;
};

export default Notification;

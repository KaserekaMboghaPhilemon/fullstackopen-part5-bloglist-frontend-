// src/components/Notification.jsx
import React from "react";

const Notification = ({ message, type = "success" }) => {
  // If there is no message, render nothing
  if (!message) {
    return null;
  }

  // Determine the CSS class based on the type ('success' or 'error')
  const notificationStyle = type === "error" ? "error-msg" : "success-msg";

  return <div className={notificationStyle}>{message}</div>;
};

export default Notification;

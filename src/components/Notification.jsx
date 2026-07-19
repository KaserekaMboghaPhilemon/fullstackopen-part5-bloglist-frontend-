import React from "react";
import styled from "styled-components";

const NotificationContainer = styled.div`
  padding: 16px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  font-weight: 500;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${(props) =>
    props.type === "error"
      ? `
    background: #fee2e2;
    border: 2px solid #ef4444;
    color: #991b1b;
  `
      : `
    background: #dcfce7;
    border: 2px solid #22c55e;
    color: #166534;
  `}
`;

const Notification = ({ message, type = "success" }) => {
  if (!message) {
    return null;
  }

  return <NotificationContainer type={type}>{message}</NotificationContainer>;
};

export default Notification;

import React from "react";
import styled from "styled-components";

const NotificationContainer = styled.div`
  padding: 16px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
  animation: slideInDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${(props) =>
    props.type === "error"
      ? `
    background: #fef2f2;
    border-color: #dc2626;
    color: #991b1b;
  `
      : `
    background: #f0fdf4;
    border-color: #16a34a;
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

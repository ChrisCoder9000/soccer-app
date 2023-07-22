import React from "react";
import { StyledButton } from "./StyledButton";

interface IButton {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ children, onClick }: IButton) => {
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onClick && onClick();
  };

  return (
    <StyledButton>
      <button onClick={handleOnClick}>{children}</button>
    </StyledButton>
  );
};

export default Button;

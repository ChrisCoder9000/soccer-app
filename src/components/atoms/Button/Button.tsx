import React from "react";
import { StyledButton } from "./StyledButton";

interface IButton {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, onClick, className }: IButton) => {
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onClick && onClick();
  };

  return (
    <StyledButton className={className}>
      <button onClick={handleOnClick}>{children}</button>
    </StyledButton>
  );
};

export default Button;

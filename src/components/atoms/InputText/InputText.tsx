import React, { useState } from "react";
import { StyledInputText } from "./StyledInputText";

interface IInputText {
  placeholder: string;
  secured?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputText = ({ placeholder, secured, onChange, value }: IInputText) => {
  const [cValue, setCValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <StyledInputText>
      <input
        value={cValue}
        placeholder={placeholder}
        type={secured ? "password" : "text"}
        onChange={handleChange}
      />
    </StyledInputText>
  );
};

export default InputText;

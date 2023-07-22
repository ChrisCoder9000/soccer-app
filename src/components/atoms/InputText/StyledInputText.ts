import { Colors } from "@/constants/Colors";
import { Borders } from "@/constants/Dimens";
import styled from "styled-components";

export const StyledInputText = styled.div`
  margin: 0.5rem;
  width: 100%;

  input {
    width: 100%;
    background-color: ${Colors.primary300}A0;
    border: 0.13rem solid transparent;
    padding: 1rem 1.5rem;
    backdrop-filter: 2px;
    border-radius: ${Borders.radius2};
    outline: none;
    transition: border 0.2s ease-in-out;
    color: ${Colors.black1};
    font-family: inherit;

    &:focus {
      border: 0.13rem solid ${Colors.primary500};
    }
  }
`;

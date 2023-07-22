import { Colors } from "@/constants/Colors";
import { Borders } from "@/constants/Dimens";
import styled from "styled-components";

export const StyledButton = styled.div`
  margin: 0.5rem;

  button {
    width: 100%;
    border: none;
    background-color: ${Colors.primary600};
    padding: 1rem 1.5rem;
    border-radius: ${Borders.radius2};
    font-family: inherit;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: ${Colors.primary500};
      transform: scale(1.05);
    }
  }
`;

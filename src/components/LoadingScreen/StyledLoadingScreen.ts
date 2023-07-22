import { Colors } from "@/constants/Colors";
import styled from "styled-components";

export const StyledLoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${Colors.secondary400}2A;
  backdrop-filter: blur(3px);
`;

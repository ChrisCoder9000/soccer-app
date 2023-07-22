import React from "react";
import { StyledLoadingScreen } from "./StyledLoadingScreen";
import { Loading } from "@nextui-org/react";

const LoadingScreen = () => {
  return (
    <StyledLoadingScreen>
      <Loading size="xl" />
    </StyledLoadingScreen>
  );
};

export default LoadingScreen;

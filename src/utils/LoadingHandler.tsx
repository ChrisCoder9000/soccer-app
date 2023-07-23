"use client";

import React from "react";
import { useRenderAfterHydration } from "./lifecycle";
import LoadingScreen from "@/components/LoadingScreen";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import styled from "styled-components";
import { Loading as NLoading } from "@nextui-org/react";

export default function Loading({ children }: { children: React.ReactNode }) {
  const isLoading = useSelector(
    (state: RootState) => state.mainSlice.isLoading
  );

  return useRenderAfterHydration(
    <StyledLoading active={isLoading}>
      <div>{children}</div>
      <div className="overlay">
        <NLoading size="xl" />
      </div>
    </StyledLoading>,
    <LoadingScreen />
  );
}

const StyledLoading = styled.div<{ active: boolean }>`
  .overlay {
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f509;
    backdrop-filter: blur(5px);
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    transform: ${({ active }) => (active ? "scale(1)" : "scale(0)")};
  }
`;

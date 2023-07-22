"use client";

import React from "react";
import { useRenderAfterHydration } from "./lifecycle";
import LoadingScreen from "@/components/LoadingScreen";

export default function Loading({ children }: { children: React.ReactNode }) {
  return useRenderAfterHydration(<div>{children}</div>, <LoadingScreen />);
}

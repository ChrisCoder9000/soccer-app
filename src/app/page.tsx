"use client";

import AuthPage from "@/components/pages/AuthPage";
import { FormProvider } from "@/components/pages/AuthPage/formState";
import HomePage from "@/components/pages/HomePage";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "@/store/thunks/main";

export default function Home() {
  const authenticatedUser = useSelector(
    (state: RootState) => state.mainSlice.authenticatedUser
  );
  const dispatchRedux = useDispatch<any>();

  useEffect(() => {
    dispatchRedux(verifyToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authenticatedUser) {
    return <HomePage />;
  } else {
    return (
      <FormProvider>
        <AuthPage />
      </FormProvider>
    );
  }
}

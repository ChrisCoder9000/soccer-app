import React, { useEffect, useState } from "react";
import { StyledHomePage } from "./StyledHomePage";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { userTypes } from "../../../../types/general";
import SoccerMainPage from "./components/SoccerMainPage";
import { FormProvider } from "./components/SoccerMainPage/formState";
import ScoutMainPage from "./components/ScountMainPage";

const HomePage = () => {
  const authenticatedUser = useSelector(
    (state: RootState) => state.mainSlice.authenticatedUser
  );

  if (authenticatedUser?.type === userTypes.SCOUT) {
    return <ScoutMainPage />;
  }

  if (authenticatedUser?.type === userTypes.SOCCER) {
    return (
      <FormProvider>
        <SoccerMainPage />
      </FormProvider>
    );
  }
};

export default HomePage;

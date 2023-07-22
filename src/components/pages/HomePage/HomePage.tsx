import React, { useEffect, useState } from "react";
import { StyledHomePage } from "./StyledHomePage";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { userTypes } from "../../../../types/general";
import SoccerMainPage from "./components/SoccerMainPage";

const HomePage = () => {
  const [component, setComponent] = useState<React.ReactNode>();

  const authenticatedUser = useSelector(
    (state: RootState) => state.mainSlice.authenticatedUser
  );

  useEffect(() => {
    if (authenticatedUser?.type === userTypes.SCOUT) {
    }

    if (authenticatedUser?.type === userTypes.SOCCER) {
      setComponent(SoccerMainPage);
    }
  }, [authenticatedUser?.type]);

  return <StyledHomePage>{component}</StyledHomePage>;
};

export default HomePage;

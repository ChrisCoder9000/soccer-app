import React, { useEffect, useState } from "react";
import { StyledScountMainPage } from "./StyledScoutMainPage";
import { useDispatch, useSelector } from "react-redux";
import { findUsers, getUsers, logout } from "@/store/thunks/main";
import { RootState } from "@/store/store";
import { userTypes } from "../../../../../../types/general";
import soccerImage from "@/assets/images/soccer.png";
import Image from "next/image";
import exitIcon from "@/assets/images/exit.png";

const ScoutMainPage = () => {
  const dispatchRedux = useDispatch<any>();
  const users = useSelector((state: RootState) => state.mainSlice.users);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    setSearchValue("");
    dispatchRedux(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    if (isSearching) {
      dispatchRedux(getUsers());
      setSearchValue(null);
      setIsSearching(false);
      return;
    }

    if (!searchValue) {
      console.log("ERROR MESSAGE!!!");
      return;
    }

    setIsSearching(true);
    dispatchRedux(
      findUsers({
        query: "name",
        value: searchValue,
      })
    );
  };

  const handleLogout = () => {
    dispatchRedux(logout());
  };

  if (!users) return <></>;

  return (
    <StyledScountMainPage>
      <div className="menu">
        <div className="search">
          <input
            value={searchValue ?? ""}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <p onClick={handleSearch}>{isSearching ? "Clear" : "Search"}</p>
        </div>
        <div className="logout">
          <Image onClick={handleLogout} src={exitIcon} alt="" />
        </div>
      </div>
      <div className="cards-list">
        {users
          .filter((u) => u.type === userTypes.SOCCER)
          .map((user, i) => {
            return (
              <div className="soccer-card" key={i}>
                <div className="first-section">
                  <Image src={soccerImage} alt="" />
                  <p className="name">
                    <span>Name</span>
                    {user.name ?? "unset"}
                  </p>
                </div>
                <div className="second-section">
                  <p>
                    <span>Kick Power</span>
                    {user.kickPower ?? "unset"}
                  </p>
                  <p>
                    <span>Speed</span>
                    {user.speed ?? "unset"}
                  </p>
                </div>
                <div className="third-section">
                  <div>Email</div>
                  <p>{user.email}</p>
                </div>
              </div>
            );
          })}
      </div>
    </StyledScountMainPage>
  );
};

export default ScoutMainPage;

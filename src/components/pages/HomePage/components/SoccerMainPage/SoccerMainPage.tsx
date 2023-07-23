import React, { useContext, useEffect } from "react";
import { StyledSoccerMainPage } from "./StyledSoccerMainPage";
import InputText from "@/components/atoms/InputText/InputText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Slider } from "@mui/material";
import Button from "@/components/atoms/Button";
import { formContext } from "./formState";
import { logout, updateProfile } from "@/store/thunks/main";

const SoccerMainPage = () => {
  const authenticatedUser = useSelector(
    (state: RootState) => state.mainSlice.authenticatedUser
  );
  const { formState, dispatchFormState } = useContext(formContext);
  const dispatchRedux = useDispatch<any>();
  const [success, setSuccess] = React.useState<"fail" | "idle" | "success">(
    "idle"
  );

  const handleUpdateSoccer = async () => {
    const response = await dispatchRedux(
      updateProfile({
        uid: authenticatedUser!.id,
        data: formState,
      })
    );
    if (response.payload.user) {
      setSuccess("success");
      setTimeout(() => {
        setSuccess("idle");
      }, 2000);
    }
    if (response.payload.error) {
      setSuccess("fail");
      setTimeout(() => {
        setSuccess("idle");
      }, 2000);
    }
  };

  useEffect(() => {
    if (
      authenticatedUser?.kickPower ||
      authenticatedUser?.speed ||
      authenticatedUser?.name
    ) {
      dispatchFormState({
        type: "init",
        value: {
          kickPower: authenticatedUser.kickPower,
          speed: authenticatedUser.speed,
          name: authenticatedUser.name,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticatedUser]);

  if (!authenticatedUser) {
    return <h1>Schermata di errore</h1>;
  }

  return (
    <StyledSoccerMainPage>
      <div className="main-form">
        <h3>Your Personal Details</h3>
        <div className="top-wrapper">
          <div className="account-details">
            <p>
              <span>EMAIL</span>
              {authenticatedUser.email}
            </p>
            <p>
              <span>USERNAME</span>
              {authenticatedUser.username}
            </p>
          </div>
          <InputText
            placeholder="Name"
            onChange={(e: any) =>
              dispatchFormState({
                type: "name",
                value: e.target.value,
              })
            }
            value={formState.name}
          />
        </div>
        <div className="sliders-wrapper">
          <div className="slider">
            <p>Kick Power</p>
            <Slider
              value={formState.kickPower}
              onChange={(e: any) =>
                dispatchFormState({
                  type: "kickPower",
                  value: e.target.value,
                })
              }
            />
          </div>
          <div className="slider">
            <p>Speed</p>
            <Slider
              value={formState.speed}
              onChange={(e: any) =>
                dispatchFormState({
                  type: "speed",
                  value: e.target.value,
                })
              }
            />
          </div>
        </div>
        <Button
          className={
            success === "success"
              ? "success"
              : success === "fail"
              ? "fail"
              : "idle"
          }
          onClick={handleUpdateSoccer}
        >
          {success === "success"
            ? "Success"
            : success === "fail"
            ? "Fail"
            : "Update"}
        </Button>
        <div className="logout-button-wrapper">
          <p className="logout-button" onClick={() => dispatchRedux(logout())}>
            Logout
          </p>
        </div>
      </div>
    </StyledSoccerMainPage>
  );
};

export default SoccerMainPage;

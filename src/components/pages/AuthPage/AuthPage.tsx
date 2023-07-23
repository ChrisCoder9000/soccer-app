import React, { useContext } from "react";
import { StyledAuthPage } from "./StyledAuthPage";
import InputText from "@/components/atoms/InputText/InputText";
import Button from "@/components/atoms/Button";
import { Switch, SwitchEvent } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { formContext } from "./formState";
import { userTypes } from "../../../../types/general";
import { ISignupData, login, signup } from "@/store/thunks/main";

const AuthPage = () => {
  const [authMode, setAuthMode] = React.useState<"login" | "register">("login");
  const { formState, dispatchFormState } = useContext(formContext);
  const [error, setError] = React.useState<string | null>(null);
  const dispatchRedux = useDispatch<any>();

  const handleChangeAuthMode = () => {
    setError(null);
    dispatchFormState({
      type: "switch-to-login",
    });
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  const handleAuthFormSubmit = async () => {
    try {
      switch (authMode) {
        case "login": {
          const response = await dispatchRedux(
            login({
              email: formState.email,
              password: formState.password,
            })
          );
          if (response.payload.response.status.toString().startsWith("4"))
            throw new Error(response.payload.response.data.message);
          break;
        }
        case "register": {
          const response = await dispatchRedux(
            signup({
              ...(formState as unknown as ISignupData),
              type:
                formState.type === userTypes.SCOUT
                  ? userTypes.SCOUT
                  : userTypes.SOCCER,
            })
          );
          if (response.payload.response.status.toString().startsWith("4"))
            throw new Error(response.payload.response.data.message);
          break;
        }
      }
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <StyledAuthPage>
      <div className="form-wrapper">
        <h2>Soccer Bay</h2>

        <div className="inner-wrapper">
          {authMode === "register" && (
            <InputText
              placeholder="Username"
              value={formState.username || ""}
              onChange={function (
                e: React.ChangeEvent<HTMLInputElement>
              ): void {
                dispatchFormState({
                  type: "username",
                  value: e.target.value,
                });
              }}
            />
          )}
          <InputText
            placeholder="Email"
            value={formState.email}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              dispatchFormState({
                type: "email",
                value: e.target.value,
              });
            }}
          />
          <InputText
            secured
            placeholder="Password"
            value={formState.password}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              dispatchFormState({
                type: "password",
                value: e.target.value,
              });
            }}
          />
          {authMode === "register" && (
            <>
              <InputText
                secured
                placeholder="Confirm Password"
                value={formState.passwordRepeat || ""}
                onChange={function (
                  e: React.ChangeEvent<HTMLInputElement>
                ): void {
                  dispatchFormState({
                    type: "passwordRepeat",
                    value: e.target.value,
                  });
                }}
              />
              <div className="switch-wrapper">
                <p>Are you a scout?</p>
                <Switch
                  onChange={(e: SwitchEvent) =>
                    dispatchFormState({
                      type: "type",
                      value: e.target.checked
                        ? userTypes.SCOUT
                        : userTypes.SOCCER,
                    })
                  }
                />
              </div>
            </>
          )}
          {error ? <p className="error-text">{error}</p> : null}
          <div className="buttons-wrapper">
            <p className="authmode-switcher" onClick={handleChangeAuthMode}>
              {authMode === "login" ? "Sign Up" : "Login"}
            </p>
            <Button onClick={handleAuthFormSubmit}>
              {authMode === "login" ? "Login" : "Sign Up"}
            </Button>
          </div>
        </div>
      </div>
    </StyledAuthPage>
  );
};

export default AuthPage;

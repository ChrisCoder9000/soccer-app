import React, { Dispatch } from "react";
import { ReactNode, createContext } from "react";

export const signupState = {
  name: "",
  kickPower: 0,
  speed: 0,
};

export const signupReducer = (state: typeof signupState, action: any) => {
  switch (action.type) {
    case "kickPower":
      return { ...state, kickPower: action.value };
    case "speed":
      return { ...state, speed: action.value };
    case "name":
      return { ...state, name: action.value };
    case "init":
      return { ...state, ...action.value };
    default:
      return state;
  }
};

interface IFormState {
  type: keyof typeof signupState | "init";

  value?: any;
}

export const formContext = createContext<{
  formState: typeof signupState;
  dispatchFormState: Dispatch<IFormState>;
}>({
  formState: signupState,
  dispatchFormState: () => null,
});

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formState, dispatch] = React.useReducer(signupReducer, signupState);

  return (
    <formContext.Provider
      value={{
        formState,
        dispatchFormState: dispatch,
      }}
    >
      {children}
    </formContext.Provider>
  );
};

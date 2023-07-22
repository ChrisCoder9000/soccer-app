import { userTypes } from "../../../../types/general";
import React, { Dispatch } from "react";
import { ReactNode, createContext } from "react";

export const signupState = {
  username: undefined,
  email: "",
  password: "",
  passwordRepeat: undefined,
  type: undefined,
};

export const signupReducer = (state: typeof signupState, action: any) => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.value };
    case "email":
      return { ...state, email: action.value };
    case "password":
      return { ...state, password: action.value };
    case "passwordRepeat":
      return { ...state, passwordRepeat: action.value };
    case "type":
      return { ...state, type: action.value };
    case "switch-to-login":
      return {
        ...state,
        ...{
          username: undefined,
          passwordRepeat: undefined,
          type: undefined,
        },
      };
    default:
      return state;
  }
};

interface IFormState {
  type: keyof typeof signupState | "switch-to-login";

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

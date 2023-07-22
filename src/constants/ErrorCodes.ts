export const ErrorCodes = {
  // SECTION: - Auth
  emailNotValid: {
    message: "Email not valid",
    code: "0001",
  },
  passwordNotConform: {
    message:
      "Password must contain at least 8 characters, one letter, one capitalized letter, one number and one symbol @$!%*?&",
    code: "0002",
  },
  passwordNotMatch: {
    message: "Passwords do not match",
    code: "0003",
  },
  usernameAlreadyExists: {
    message: "User with this username already exists",
    code: "11001",
  },
  emailAlreadyExists: {
    message: "This email is already registered",
    code: "11002",
  },
};

export const errorType = {
  UNAUTHORIZED: {
    message: "The user is not authorized!",
    status: 401,
  },
  WRONG_EMAIL: {
    message: "You have provided incorrect e-mail.",
    status: 400,
  },
  PASSWORD_MISSMATCH: {
    message: "Passwords are not same.",
    status: 400,
  },
  PASSWORD_STRENGTH: {
    message:
      "Password must have: 1 uppercase, 1 lowercase, 1 symbol, 1 digit, minimum length  6.",
    status: 400,
  },
  PASSWORD_REQUIRED: {
    message: "Password is required",
    status: 400,
  },
  PASSWORD_REPEATED_REQUIRED: {
    message: "Password repeated required.",
    status: 400,
  },
  PASSWORD_INCORRECT: {
    message: "Password incorrect.",
    status: 400,
  },
  EMAIL_REQUIRED: {
    message: "Email is required",
    status: 400,
  },
  PASSWORD_MIN_LENGTH: {
    message: "Password must have at least 6 characters.",
    status: 400,
  },
  USER_EXISTS: {
    message: "User with this e-mail address already exists.",
    status: 400,
  },
  USER_NOT_EXIST: {
    message: "User does not exist.",
    status: 400,
  },
  TRAINING_NOT_EXISTS: {
    message: "Training with given id does not exist.",
    status: 400,
  },
  TOO_MANY_CHARACTERS: {
    message: "One of the inputs have too many characters.",
    status: 400,
  },
  CANNOT_ANSWER_SAME_QUESTION: {
    message: "This question has been answered.",
    status: 400,
  },
  INTERNAL_SERVER_ERROR: {
    message: "Internal server error",
    status: 500,
  },
  ALL_INPUTS_REQUIRED: {
    message: "All inputs required",
    status: 400,
  },
  REFRESH_TOKEN_NOT_MATCH: {
    message: "Refresh token send is invalid",
    status: 403,
  },
  ENVIROMENT_VARIABLES_ERROR: {
    message: "Enviroment variables are not set",
    status: 500,
  },
};

// TODO: find better way to optimize this
export const findStatusByMessage = (message: string) => {
  const values = Object.values(errorType);
  const keys = Object.keys(errorType);
  for (let i = 0; i < keys.length; i++) {
    if (values[i].message === message) {
      return values[i].status;
    }
  }
  return 500;
};

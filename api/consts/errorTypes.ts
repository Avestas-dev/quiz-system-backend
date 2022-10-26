export const errorType = {
  UNAUTHORIZED: {
    message: "The user is not authorized!",
    status: 401,
  },
  TOKEN_NOT_PROVIDED: {
    message: "Token is not provided!",
    status: 401,
  },
  REFRESH_TOKEN_NOT_PROVIDED: {
    message: "Refresh token is not provided!",
    status: 403,
  },
  REFRESH_TOKEN_INVALID: {
    message: "Refresh token is invalid!",
    status: 403,
  },
  TOKEN_INVALID: {
    message: "Token is invalid!",
    status: 403,
  },
  TOKEN_EXPIRED: {
    message: "Token expired!",
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
    message: "Password is required.",
    status: 400,
  },
  PASSWORD_REPEATED_REQUIRED: {
    message: "Password repeated required.",
    status: 400,
  },
  PASSWORD_INCORRECT: {
    message: "Password incorrect.",
    status: 403,
  },
  EMAIL_REQUIRED: {
    message: "Email is required.",
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
  RESET_TIME_TOO_LOW: {
    message: "Password has been reset recently, and you must wait.",
    status: 400,
  },
  RESET_GUID_REQUIRED: {
    message: "Password has been reset recently, and you must wait.",
    status: 400,
  },
  RESET_PASSWORD_FAILED: {
    message: "Reset password failed.",
    status: 500,
  },
  RESET_TOKEN_WRONG: {
    message: "Reset token is incorrect.",
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
    message: "Internal server error.",
    status: 500,
  },
  ALL_INPUTS_REQUIRED: {
    message: "All inputs required.",
    status: 400,
  },
  GOOGLE_LOGIN_FAILED: {
    message: "Google login failed.",
    status: 400,
  },
  GOOGLE_REGISTER_FAILED: {
    message: "Google register failed.",
    status: 400,
  },
  ENVIROMENT_VARIABLES_ERROR: {
    message: "Enviroment variables are not set.",
    status: 500,
  },
  TRAINING_NAME_NOT_PROVIDED: {
    message: "Training name is not provided.",
    status: 400,
  },
  TRAINING_VISIBILITY_NOT_PROVIDED: {
    message: "Training visiblity not provided.",
    status: 400,
  },
  TRAINING_NAME_TOO_LONG: {
    message: "Training name too long - max. 100 characters.",
    status: 400,
  },
  TRAINING_NAME_TOO_SHORT: {
    message: "Training name too long - min. 3 characters.",
    status: 400,
  },
  TRAINING_NAME_ALREADY_EXIST: {
    message: "Training with this name already exists.",
    status: 400,
  },
  EDITED_TRAINING_NOT_FOUND: {
    message: "Edited training was not found.",
    status: 400,
  },
  TRAINING_NOT_FOUND: {
    message: "Training not found.",
    status: 400,
  },
  QUESTION_NOT_PROVIDED: {
    message: "Question not provided.",
    status: 400,
  },
  TRAINING_ID_NOT_PROVIDED: {
    message: "Training Id not provided.",
    status: 400,
  },
  QUESTION_TOO_LONG: {
    message: "Question too long - max. 500 characters.",
    status: 400,
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

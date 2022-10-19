// import swaggerAutogen from "swagger-autogen";

const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "Quiz System Api",
    description: "Project made for Internet Application classes.",
  },
  host: "localhost:8000",
  schemes: ["http"],
  definitions: {
    LoginRequest: {
      email: "kamilporeba@hotmail.com",
      password: "Kamil123!",
    },
    LoginResponse: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE2NjYxMDQzMTIsImV4cCI6MTc1MjEwNDMxMn0.H7E3TQPh8Nc0O5JWqPyMfRNHYoTPy57kc8z-2IJd0cc",
      refreshToken: "5f3c44c9-eac1-4ffd-a112-ae5a1fe38fed",
      email: "kamilporeba@hotmail.com",
    },
    LoginGoogleRequest: {
      idToken: "token",
    },
    LoginGoogleResponse: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE2NjYxMDQzMTIsImV4cCI6MTc1MjEwNDMxMn0.H7E3TQPh8Nc0O5JWqPyMfRNHYoTPy57kc8z-2IJd0cc",
      refreshToken: "5f3c44c9-eac1-4ffd-a112-ae5a1fe38fed",
    },
    RegisterGoogleResponse: {
      email: "kamilporeba@hotmail.com",
      googleSub: "googleSub",
      id: 1,
      password: "password",
      passwordResetDate: new Date(),
      passwordResetToken: "resetToken",
      refreshToken: "refreshToken",
    },

    RegisterGoogleRequest: {
      idToken: "token",
    },
    RegisterRequest: {
      email: "kamilporeba@hotmail.com",
      password: "Kamil123!",
      passwordRepeated: "Kamil123!",
    },
    RegisterResponse: {
      email: "kamilporeba@hotmail.com",
      googleSub: "googleSub",
      id: 1,
      password: "password",
      passwordResetDate: new Date(),
      passwordResetToken: "resetToken",
      refreshToken: "refreshToken",
    },
    ProfileResponse: {
      email: "kamilporeba@hotmail.com",
    },
    RefreshTokenResponse: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE2NjYxMDQzMTIsImV4cCI6MTc1MjEwNDMxMn0.H7E3TQPh8Nc0O5JWqPyMfRNHYoTPy57kc8z-2IJd0cc",
    },
    ResetStartRequest: {
      email: "kamilporeba@hotmail.com",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./api/routes/router"];
swaggerAutogen(outputFile, endpointsFiles, doc);

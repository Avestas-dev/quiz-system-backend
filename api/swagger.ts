import {
  AddQuestionAnswerRequestExample,
  AddQuestionAnswerResponseExample,
} from "./models/answer/addQuestionAnswerModel";
import { EditQuestionAnswerRequestExample } from "./models/answer/editQuestionAnswerModel";
import {
  LoginGoogleRequestExample,
  LoginGoogleResponseExample,
} from "./models/auth/loginGoogleModel";
import {
  LoginRequestExample,
  LoginResponseExample,
} from "./models/auth/loginModel";
import { RefreshTokenResponseExample } from "./models/auth/refreshTokenModel";
import {
  RegisterGoogleRequestExample,
  RegisterGoogleResponseExample,
} from "./models/auth/registerGoogleModel";
import {
  RegisterRequestExample,
  RegisterResponseExample,
} from "./models/auth/registerModel";
import { ResetPasswordRequestExample } from "./models/auth/resetPasswordModel";
import { ResetPasswordStartRequestExample } from "./models/auth/resetPasswordStartModel";
import { ProfileResponseExample } from "./models/profileModel";
import { AddQuestionRequestExample } from "./models/question/addQuestionModel";
import { AddQuestionWithAnswersRequestExample } from "./models/question/addQuestionWithAnswersModel";
import { EditQuestionRequestExample } from "./models/question/editQuestionModel";
import { GetQuestionRequestExample } from "./models/question/getQuestionModel";
import { GetQuestionsResponseExample } from "./models/question/getQuestionsModel";
import { AcceptTagRequestExample } from "./models/tags/acceptTagModel";
import { AddTagRequestExample } from "./models/tags/addTagModel";
import { EditTagRequestExample } from "./models/tags/editTagModel";
import { GetAllTagsForTrainingResponseExample } from "./models/tags/getAllTagsForTrainingModel";
import { GetAllTagsResponseExample } from "./models/tags/getAllTagsModel";
import { RejectTagRequestExample } from "./models/tags/rejectTagModel.ts";
import { AddTrainingRequestExample } from "./models/training/addTrainingModel";
import { EditTrainingRequestExample } from "./models/training/editTrainingModel";
import { GetAllTrainingsResponseExample } from "./models/training/getAllTrainingsModel";
import { GetOneTrainingResponseExample } from "./models/training/getOneTrainingModel";
import { EndTrainingSessionRequestExample } from "./models/trainingSession/endTrainingSessionModel";
import { GetTrainingSessionQuestionsResponseExample } from "./models/trainingSession/getTrainingSessionQuestionsModel";
import { GetUserTrainingSessionResponseExample } from "./models/trainingSession/getUserTrainingSessionModel";
import { GetUserTrainingSessionsResponseExample } from "./models/trainingSession/getUserTrainingSessionsModel";
import {
  StartTrainingSessionRequestExample,
  StartTrainingSessionResponseExample,
} from "./models/trainingSession/startTrainingSessionModel";
import { BlockUserRequestExample } from "./models/user/blockUserModel";
import { GetAllUsersResponseExample } from "./models/user/getAllUsersModel";
import { UnlockUserRequestExample } from "./models/user/unlockUserModel";
import { AddUserAnswerRequestExample } from "./models/userAnswer/addUserAnswerModel";
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Quiz System Api",
    description: "Project made for Internet Application classes.",
  },
  host: "localhost:8000",
  schemes: ["http"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Bearer token verification",
    },
  },
  definitions: {
    LoginRequest: LoginRequestExample,
    LoginResponse: LoginResponseExample,
    LoginGoogleRequest: LoginGoogleRequestExample,
    LoginGoogleResponse: LoginGoogleResponseExample,
    RegisterGoogleResponse: RegisterGoogleResponseExample,
    RegisterGoogleRequest: RegisterGoogleRequestExample,
    RegisterRequest: RegisterRequestExample,
    RegisterResponse: RegisterResponseExample,
    ProfileResponse: ProfileResponseExample,
    RefreshTokenResponse: RefreshTokenResponseExample,
    ResetStartRequest: ResetPasswordStartRequestExample,
    ResetPasswordRequest: ResetPasswordRequestExample,
    AddTrainingRequest: AddTrainingRequestExample,
    EditTrainingRequest: EditTrainingRequestExample,
    GetAllTrainingsResponse: GetAllTrainingsResponseExample,
    GetOneTrainingResponse: GetOneTrainingResponseExample,
    AddQuestionRequest: AddQuestionRequestExample,
    AddQuestionAnswerRequest: AddQuestionAnswerRequestExample,
    AddQuestionAnswerResponse: AddQuestionAnswerResponseExample,
    GetQuestionsResponse: GetQuestionsResponseExample,
    GetQuestionResponse: GetQuestionRequestExample,
    EditQuestionRequest: EditQuestionRequestExample,
    EditQuestionAnswerRequest: EditQuestionAnswerRequestExample,
    AddQuestionWithAnswersRequest: AddQuestionWithAnswersRequestExample,
    StartTrainingSessionRequest: StartTrainingSessionRequestExample,
    StartTrainingSessionResponse: StartTrainingSessionResponseExample,
    EndTrainingSessionRequest: EndTrainingSessionRequestExample,
    AddUserAnswerRequest: AddUserAnswerRequestExample,
    TagsResponse: GetAllTagsResponseExample,
    BlockUserRequest: BlockUserRequestExample,
    UnlockUserRequest: UnlockUserRequestExample,
    GetTrainingSessionQuestionsResponse:
      GetTrainingSessionQuestionsResponseExample,
    GetUserTrainingSessionsResponse: GetUserTrainingSessionsResponseExample,
    GetUserTrainingSessionResponse: GetUserTrainingSessionResponseExample,
    AddTagRequest: AddTagRequestExample,
    AddTagAdminRequest: AddTagRequestExample, // same as AddTag
    RejectTagRequest: RejectTagRequestExample,
    GetAllTagsForTrainingResponse: GetAllTagsForTrainingResponseExample,
    AcceptTagRequest: AcceptTagRequestExample,
    EditTagRequest: EditTagRequestExample,
    GetAllUsersResponse: GetAllUsersResponseExample,
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./api/routes/router"];
swaggerAutogen(outputFile, endpointsFiles, doc);

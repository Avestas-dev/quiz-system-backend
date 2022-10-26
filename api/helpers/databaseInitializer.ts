import { Question, QuestionAnswer, Training } from "@prisma/client";
import { NextFunction } from "express";
import { AuthResponse } from "../models/auth/authRequest";
import { prisma } from "./prisma";

const firstUserId = 1; // id of currently logged in user
const secondUserId = 2; // id of not logged in user

const initializerData = <
  {
    trainings: Array<Training>;
    questions: Array<Question>;
    answers: Array<QuestionAnswer>;
  }
>{
  trainings: [
    {
      name: "Init training 1",
      visibility: true,
      userId: firstUserId,
      id: 1000000,
    },
    {
      name: "Init training 2",
      visibility: false,
      userId: firstUserId,
      id: 1000001,
    },
    {
      name: "Init training 3",
      visibility: true,
      userId: secondUserId,
      id: 1000002,
    },
  ],
  questions: [
    {
      question: "Init question 1",
      trainingId: 1000000,
      id: 1000000,
    },
    {
      question: "Init question 2",
      trainingId: 1000000,
      id: 1000001,
    },
    {
      question: "Init question 3",
      trainingId: 1000000,
      id: 1000002,
    },
    {
      question: "Init question 4",
      trainingId: 1000001,
      id: 1000003,
    },
    {
      question: "Init question 5",
      trainingId: 1000001,
      id: 1000004,
    },
    {
      question: "Init question 6",
      trainingId: 1000002,
      id: 1000005,
    },
  ],
  answers: [
    {
      answer: "Init answer 1",
      isCorrect: true,
      questionId: 1000000,
      id: 1000000,
    },
    {
      answer: "Init answer 1",
      isCorrect: true,
      questionId: 1000000,
      id: 1000001,
    },
    {
      answer: "Init answer 2",
      isCorrect: true,
      questionId: 1000000,
      id: 1000002,
    },
    {
      answer: "Init answer 3",
      isCorrect: true,
      questionId: 1000000,
      id: 1000003,
    },
    {
      answer: "Init answer 4",
      isCorrect: true,
      questionId: 1000001,
      id: 1000004,
    },
    {
      answer: "Init answer 5",
      isCorrect: true,
      questionId: 1000001,
      id: 1000005,
    },
    {
      answer: "Init answer 6",
      isCorrect: true,
      questionId: 1000002,
      id: 1000006,
    },
    {
      answer: "Init answer 7",
      isCorrect: true,
      questionId: 1000002,
      id: 1000007,
    },
    {
      answer: "Init answer 8",
      isCorrect: true,
      questionId: 1000002,
      id: 1000008,
    },
    {
      answer: "Init answer 9",
      isCorrect: true,
      questionId: 1000002,
      id: 1000009,
    },
    {
      answer: "Init answer 10",
      isCorrect: true,
      questionId: 1000003,
      id: 1000010,
    },
    {
      answer: "Init answer 11",
      isCorrect: true,
      questionId: 1000003,
      id: 1000011,
    },
    {
      answer: "Init answer 12",
      isCorrect: true,
      questionId: 1000003,
      id: 1000012,
    },
    {
      answer: "Init answer 13",
      isCorrect: true,
      questionId: 1000003,
      id: 1000013,
    },
    {
      answer: "Init answer 14",
      isCorrect: true,
      questionId: 1000003,
      id: 1000014,
    },
    {
      answer: "Init answer 15",
      isCorrect: true,
      questionId: 1000004,
      id: 1000015,
    },
    {
      answer: "Init answer 16",
      isCorrect: true,
      questionId: 1000005,
      id: 1000016,
    },
    {
      answer: "Init answer 17",
      isCorrect: true,
      questionId: 1000005,
      id: 1000017,
    },
  ],
};

export const initializeDatabase = async (
  req: any,
  res: AuthResponse,
  next: NextFunction
) => {
  await prisma.training.deleteMany({
    where: {
      id: { gt: 500000 },
    },
  });
  await prisma.question.deleteMany({
    where: {
      id: { gt: 500000 },
    },
  });
  await prisma.questionAnswer.deleteMany({
    where: {
      id: { gt: 500000 },
    },
  });

  // create trainings
  await prisma.training.createMany({
    data: initializerData.trainings,
  });

  // create questions
  await prisma.question.createMany({
    data: initializerData.questions,
  });

  // create answered questions
  await prisma.questionAnswer.createMany({
    data: initializerData.answers,
  });

  return res.json();
};

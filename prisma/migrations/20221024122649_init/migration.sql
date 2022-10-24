/*
  Warnings:

  - You are about to drop the `AnsweredQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnsweredQuestion" DROP CONSTRAINT "AnsweredQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "AnsweredQuestion" DROP CONSTRAINT "AnsweredQuestion_trainingSessionId_fkey";

-- DropTable
DROP TABLE "AnsweredQuestion";

-- DropEnum
DROP TYPE "QuestionStatus";

-- CreateTable
CREATE TABLE "QuestionAnswer" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "QuestionAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" SERIAL NOT NULL,
    "trainingSessionId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "questionAnswerId" INTEGER NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionAnswer" ADD CONSTRAINT "QuestionAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_trainingSessionId_fkey" FOREIGN KEY ("trainingSessionId") REFERENCES "TrainingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_questionAnswerId_fkey" FOREIGN KEY ("questionAnswerId") REFERENCES "QuestionAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

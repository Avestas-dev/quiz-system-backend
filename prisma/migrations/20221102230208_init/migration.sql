-- CreateTable
CREATE TABLE "LikeTraining" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LikeTraining_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikeTraining" ADD CONSTRAINT "LikeTraining_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeTraining" ADD CONSTRAINT "LikeTraining_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

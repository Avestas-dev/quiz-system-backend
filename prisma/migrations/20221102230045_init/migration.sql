-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_trainingId_fkey";

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "trainingId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TagTraining" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagTraining_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagTraining" ADD CONSTRAINT "TagTraining_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagTraining" ADD CONSTRAINT "TagTraining_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

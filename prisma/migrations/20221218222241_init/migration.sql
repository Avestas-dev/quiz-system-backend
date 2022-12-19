-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "params" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

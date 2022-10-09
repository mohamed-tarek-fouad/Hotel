/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `ReservedRooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ReservedRooms_roomId_key` ON `ReservedRooms`(`roomId`);

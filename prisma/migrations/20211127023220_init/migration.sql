-- CreateTable
CREATE TABLE "Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Bug" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "priority" INTEGER NOT NULL,
    "reportedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportedBy" TEXT NOT NULL,
    "appID" INTEGER NOT NULL,
    CONSTRAINT "Bug_appID_fkey" FOREIGN KEY ("appID") REFERENCES "Application" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Solution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "solvedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "solvedBy" TEXT NOT NULL,
    "bugID" INTEGER NOT NULL,
    CONSTRAINT "Solution_bugID_fkey" FOREIGN KEY ("bugID") REFERENCES "Bug" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_name_key" ON "Application"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Application_url_key" ON "Application"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Solution_bugID_key" ON "Solution"("bugID");

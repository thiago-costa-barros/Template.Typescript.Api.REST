-- CreateIndex
CREATE INDEX "User_Username_DeletionDate_idx" ON "coresystem"."User"("Username", "DeletionDate");

-- CreateIndex
CREATE INDEX "User_Email_DeletionDate_idx" ON "coresystem"."User"("Email", "DeletionDate");

-- CreateIndex
CREATE INDEX "User_CreationDate_idx" ON "coresystem"."User"("CreationDate");

-- CreateIndex
CREATE INDEX "User_LastLogin_idx" ON "coresystem"."User"("LastLogin");

-- CreateIndex
CREATE INDEX "User_IsActive_idx" ON "coresystem"."User"("IsActive");

-- CreateIndex
CREATE INDEX "User_IsStaff_idx" ON "coresystem"."User"("IsStaff");

-- CreateIndex
CREATE INDEX "User_IsAdmin_idx" ON "coresystem"."User"("IsAdmin");

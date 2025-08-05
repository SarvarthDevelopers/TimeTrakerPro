-- CreateTable
CREATE TABLE "public"."Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."STATUSES" (
    "ID" TEXT NOT NULL,
    "CONTEXT" TEXT NOT NULL,
    "VALUE" TEXT NOT NULL,
    "LABEL" TEXT,
    "IS_FINAL" BOOLEAN NOT NULL DEFAULT false,
    "CREATED_AT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "STATUSES_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "public"."Team"("name");

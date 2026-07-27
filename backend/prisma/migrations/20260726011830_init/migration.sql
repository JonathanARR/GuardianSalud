-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PHYSICIAN', 'NURSE');

-- CreateEnum
CREATE TYPE "ShiftType" AS ENUM ('MORNING', 'AFTERNOON', 'NIGHT');

-- CreateEnum
CREATE TYPE "DoseStatus" AS ENUM ('PENDING', 'APPLIED', 'OMITTED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "specialties" TEXT,
    "preferred_shift" "ShiftType",

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "residents" (
    "id" UUID NOT NULL,
    "nickname" VARCHAR(100) NOT NULL,
    "room_location" VARCHAR(50) NOT NULL,
    "medical_condition" VARCHAR(150),
    "diet" VARCHAR(100),
    "allergies" TEXT,
    "special_care" TEXT,

    CONSTRAINT "residents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medications" (
    "id" UUID NOT NULL,
    "commercial_name" VARCHAR(100) NOT NULL,
    "active_ingredient" VARCHAR(100),
    "concentration" VARCHAR(50),
    "presentation" VARCHAR(50),
    "administration_route" VARCHAR(50) NOT NULL,
    "current_stock" INTEGER NOT NULL DEFAULT 0,
    "minimum_stock" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "medications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift_assignments" (
    "id" UUID NOT NULL,
    "staff_id" UUID NOT NULL,
    "shift_type" "ShiftType" NOT NULL,
    "shift_date" DATE NOT NULL,
    "assigned_area" VARCHAR(100),

    CONSTRAINT "shift_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment_assignments" (
    "id" UUID NOT NULL,
    "resident_id" UUID NOT NULL,
    "medication_id" UUID NOT NULL,
    "prescribed_by" UUID NOT NULL,
    "assigned_staff_id" UUID NOT NULL,
    "prescribed_dose" VARCHAR(50) NOT NULL,
    "frequency_hours" INTEGER NOT NULL,
    "start_time" TIME NOT NULL,
    "is_critical" BOOLEAN NOT NULL DEFAULT false,
    "ai_instructions" TEXT,
    "is_temporary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "treatment_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dose_logs" (
    "id" UUID NOT NULL,
    "treatment_id" UUID NOT NULL,
    "resident_id" UUID NOT NULL,
    "staff_id" UUID NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "administered_at" TIMESTAMP(3),
    "status" "DoseStatus" NOT NULL,
    "omission_reason" TEXT,

    CONSTRAINT "dose_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "staff_user_id_key" ON "staff"("user_id");

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shift_assignments" ADD CONSTRAINT "shift_assignments_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_assignments" ADD CONSTRAINT "treatment_assignments_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_assignments" ADD CONSTRAINT "treatment_assignments_medication_id_fkey" FOREIGN KEY ("medication_id") REFERENCES "medications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_assignments" ADD CONSTRAINT "treatment_assignments_prescribed_by_fkey" FOREIGN KEY ("prescribed_by") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatment_assignments" ADD CONSTRAINT "treatment_assignments_assigned_staff_id_fkey" FOREIGN KEY ("assigned_staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dose_logs" ADD CONSTRAINT "dose_logs_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dose_logs" ADD CONSTRAINT "dose_logs_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dose_logs" ADD CONSTRAINT "dose_logs_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

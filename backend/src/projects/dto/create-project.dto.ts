export class CreateProjectDto {
  name: string;
  description?: string;
  clientName?: string;
  budgetHours?: number;
  isBillable?: boolean;
  isArchived?: boolean;
  startDate?: Date;
  endDate?: Date;
}

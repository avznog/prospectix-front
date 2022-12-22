import { Prospect } from "src/app/models/prospect.model";

export interface sendEmailDto {
  clientName: string;
  mailTemplateId: number;
  prospect: Prospect;
}
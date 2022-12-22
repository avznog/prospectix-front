import { Prospect } from "src/app/models/prospect.model";

export interface sendMailDto {
  clientName: string;
  mailTemplateId: number;
  prospect: Prospect;
}
import { Prospect } from "src/app/models/prospect.model";

export interface SendEmailDto {
  clientName: string;
  mailTemplateId: number;
  mailTemplateModified?: string;
  prospect: Prospect;
  object: string;
  withPlaquetteJisep: boolean;
  withPlaquetteSkema: boolean;
}
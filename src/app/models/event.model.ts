import { EventType } from "../constants/event.type";

export interface Event {
  id: number;
  event: EventType;
  creationDate: Date;
}
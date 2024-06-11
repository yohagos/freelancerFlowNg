import { EventResponse } from "../../services/models"

export interface EventAdapter {
  category?: string
  event?: string
  companyName?: string
  name?: string
  email?: string
  projectName?: string
  recruiterName?: string
  startDate?: string
  endDate?: string
}

export interface PartialEventResponse {
  [key: string]: any
}

export function convertToEventAdapter(eventResponse: EventResponse): EventAdapter {
  return {
    category: eventResponse.category,
    event: eventResponse.event,
    companyName: eventResponse.companyName,
    name: eventResponse.name,
    email: eventResponse.email,
    projectName: eventResponse.projectName,
    recruiterName: eventResponse.recruiterName,
    startDate: eventResponse.startDate,
    endDate: eventResponse.endDate,
  };
}

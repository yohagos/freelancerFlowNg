export interface RecruiterTransform {
  agency: string
  email: string
  name: string
}

export interface ProjectTransform {
  projectName: string
  startDate: string
  endDate: string
}

export interface ClientTransform {
  clientName: string
  clientEmail: string
  companyName: string
}

export interface ContractTransform {
  projectName: string
  startDate: string;
  endDate: string;
}

export interface WorkLogTransform {
  workDate: string
  projectName: string
}


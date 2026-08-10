export type PatientStatus = 'Active' | 'Inactive' | 'Discharged';
export type AppointmentStatus = 'Scheduled' | 'Confirmed' | 'Checked In' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
export type EncounterStatus = 'Open' | 'Completed' | 'Cancelled';
export type Gender = 'Female' | 'Male' | 'Non-binary';

export interface Address { street: string; city: string; state: string; zip: string }
export interface Insurance { provider: string; memberId: string; plan: string }
export interface EmergencyContact { name: string; relationship: string; phone: string }

export interface Patient {
  id: string;
  pid: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: Gender;
  maritalStatus: string;
  preferredLanguage: string;
  phone: string;
  homePhone: string;
  email: string;
  address: Address;
  status: PatientStatus;
  primaryInsurance: Insurance;
  secondaryInsurance?: Insurance;
  emergencyContact: EmergencyContact;
  allergies?: string[];
}

export interface Provider { id: string; name: string; specialty: string; initials: string }
export interface Facility { id: string; name: string; shortName: string; address: string }

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  facilityId: string;
  date: string;
  startTime: string;
  duration: number;
  visitType: string;
  reason: string;
  status: AppointmentStatus;
  notes: string;
  encounterId?: string;
}

export interface Encounter {
  id: string;
  patientId: string;
  providerId: string;
  facilityId: string;
  date: string;
  time: string;
  type: string;
  status: EncounterStatus;
  chiefComplaint: string;
  diagnosisSummary: string;
  notes: string;
  vitals: string;
  assessment: string;
  diagnoses: string[];
  plan: string;
}

export type AppointmentInput = Omit<Appointment, 'id' | 'encounterId'> & { id?: string };
export type PatientUpdate = Partial<Omit<Patient, 'id'>>;

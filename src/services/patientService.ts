import { Patient, PatientUpdate } from '@/types/models';

export interface PatientService {
  getPatients(): Promise<Patient[]>;
  getPatient(id: string): Promise<Patient | undefined>;
  updatePatient(id: string, update: PatientUpdate): Promise<Patient | undefined>;
}

export function filterPatients(patients: Patient[], query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return patients;
  return patients.filter((patient) => [
    patient.firstName, patient.lastName, `${patient.firstName} ${patient.lastName}`,
    patient.pid, patient.mrn, patient.dob, patient.phone,
  ].some((value) => value.toLowerCase().includes(needle)));
}

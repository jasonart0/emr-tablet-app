import { Encounter } from '@/types/models';

export interface EncounterService {
  getPatientEncounters(patientId: string): Promise<Encounter[]>;
  getEncounter(id: string): Promise<Encounter | undefined>;
}

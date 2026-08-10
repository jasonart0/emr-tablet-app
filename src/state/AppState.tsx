import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react';

import { mockAppointments, mockEncounters, mockFacilities, mockPatients, mockProviders } from '@/data/mockData';
import { Appointment, AppointmentInput, AppointmentStatus, Encounter, Facility, Patient, PatientUpdate, Provider } from '@/types/models';

interface AppStateValue {
  patients: Patient[];
  appointments: Appointment[];
  encounters: Encounter[];
  providers: Provider[];
  facilities: Facility[];
  getPatient(id: string): Patient | undefined;
  getProvider(id: string): Provider | undefined;
  getFacility(id: string): Facility | undefined;
  updatePatient(id: string, update: PatientUpdate): void;
  createAppointment(input: AppointmentInput): Appointment;
  updateAppointment(id: string, update: Partial<Appointment>): void;
  setAppointmentStatus(id: string, status: AppointmentStatus): void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: PropsWithChildren) {
  const [patients, setPatients] = useState(mockPatients);
  const [appointments, setAppointments] = useState(mockAppointments);

  const getPatient = useCallback((id: string) => patients.find((item) => item.id === id), [patients]);
  const getProvider = useCallback((id: string) => mockProviders.find((item) => item.id === id), []);
  const getFacility = useCallback((id: string) => mockFacilities.find((item) => item.id === id), []);

  const updatePatient = useCallback((id: string, update: PatientUpdate) => {
    setPatients((current) => current.map((patient) => patient.id === id ? { ...patient, ...update } : patient));
  }, []);

  const createAppointment = useCallback((input: AppointmentInput) => {
    const appointment: Appointment = { ...input, id: input.id ?? `apt-${Date.now()}` };
    setAppointments((current) => [...current, appointment]);
    return appointment;
  }, []);

  const updateAppointment = useCallback((id: string, update: Partial<Appointment>) => {
    setAppointments((current) => current.map((appointment) => appointment.id === id ? { ...appointment, ...update } : appointment));
  }, []);

  const setAppointmentStatus = useCallback((id: string, status: AppointmentStatus) => updateAppointment(id, { status }), [updateAppointment]);

  const value = useMemo<AppStateValue>(() => ({
    patients, appointments, encounters: mockEncounters, providers: mockProviders, facilities: mockFacilities,
    getPatient, getProvider, getFacility, updatePatient, createAppointment, updateAppointment, setAppointmentStatus,
  }), [appointments, createAppointment, getFacility, getPatient, getProvider, patients, setAppointmentStatus, updateAppointment, updatePatient]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppStateContext);
  if (!value) throw new Error('useAppState must be used inside AppStateProvider');
  return value;
}

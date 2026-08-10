import { Appointment, Encounter, Facility, Patient, Provider } from '@/types/models';
import { addDays, toDateKey } from '@/utils/date';

const patientSeeds = [
  ['Maya', 'Patel', 'Female'], ['James', 'Wilson', 'Male'], ['Sofia', 'Martinez', 'Female'], ['Noah', 'Thompson', 'Male'],
  ['Ava', 'Chen', 'Female'], ['Liam', 'Anderson', 'Male'], ['Emma', 'Robinson', 'Female'], ['Ethan', 'Williams', 'Male'],
  ['Isabella', 'Brown', 'Female'], ['Lucas', 'Davis', 'Male'], ['Mia', 'Garcia', 'Female'], ['Oliver', 'Miller', 'Male'],
  ['Amelia', 'Taylor', 'Female'], ['Elijah', 'Moore', 'Male'], ['Harper', 'Jackson', 'Female'], ['Mateo', 'Martin', 'Male'],
  ['Evelyn', 'Lee', 'Female'], ['Henry', 'White', 'Male'], ['Luna', 'Harris', 'Non-binary'], ['Theodore', 'Clark', 'Male'],
] as const;

const streets = ['Oak Avenue', 'Maple Street', 'Cedar Lane', 'Willow Drive', 'Lakeview Road'];
const cities = [['Austin', 'TX', '78701'], ['Round Rock', 'TX', '78664'], ['Cedar Park', 'TX', '78613'], ['Georgetown', 'TX', '78626']];
const statuses = ['Active', 'Active', 'Active', 'Active', 'Inactive', 'Discharged'] as const;

export const mockPatients: Patient[] = patientSeeds.map(([firstName, lastName, gender], index) => {
  const city = cities[index % cities.length];
  return {
    id: String(7201 + index),
    pid: `P-${String(7201 + index).padStart(6, '0')}`,
    mrn: `MRN${String(391020 + index)}`,
    firstName,
    lastName,
    dob: `${1958 + ((index * 3) % 46)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index * 2) % 27 + 1).padStart(2, '0')}`,
    gender,
    maritalStatus: index % 3 === 0 ? 'Single' : 'Married',
    preferredLanguage: index % 5 === 2 ? 'Spanish' : 'English',
    phone: `(512) 555-${String(1100 + index).padStart(4, '0')}`,
    homePhone: `(512) 555-${String(2100 + index).padStart(4, '0')}`,
    email: `${firstName}.${lastName}@example.com`.toLowerCase(),
    address: { street: `${120 + index * 7} ${streets[index % streets.length]}`, city: city[0], state: city[1], zip: city[2] },
    status: statuses[index % statuses.length],
    primaryInsurance: { provider: index % 2 ? 'BlueCross BlueShield' : 'Aetna Health', memberId: `HMO-${83210 + index}`, plan: index % 2 ? 'Preferred PPO' : 'Choice POS II' },
    secondaryInsurance: index % 4 === 0 ? { provider: 'Medicare', memberId: `MC-${442100 + index}`, plan: 'Part B' } : undefined,
    emergencyContact: { name: `${index % 2 ? 'Jordan' : 'Alex'} ${lastName}`, relationship: index % 2 ? 'Spouse' : 'Sibling', phone: `(512) 555-${String(3100 + index).padStart(4, '0')}` },
    allergies: index % 4 === 0 ? ['Penicillin'] : [],
  };
});

export const mockProviders: Provider[] = [
  { id: 'pr-1', name: 'Dr. Olivia Grant', specialty: 'Family Medicine', initials: 'OG' },
  { id: 'pr-2', name: 'Dr. Marcus Lee', specialty: 'Internal Medicine', initials: 'ML' },
  { id: 'pr-3', name: 'Dr. Priya Shah', specialty: 'Cardiology', initials: 'PS' },
  { id: 'pr-4', name: 'Nina Brooks, NP', specialty: 'Primary Care', initials: 'NB' },
];

export const mockFacilities: Facility[] = [
  { id: 'fa-1', name: 'Harbor Health Medical Center', shortName: 'Harbor Health', address: '310 Medical Plaza, Austin, TX' },
  { id: 'fa-2', name: 'Northside Family Clinic', shortName: 'Northside', address: '88 Cedar Park Dr, Cedar Park, TX' },
  { id: 'fa-3', name: 'Riverside Specialty Center', shortName: 'Riverside', address: '1400 Riverside Ave, Austin, TX' },
];

const encounterTypes = ['Office Visit', 'Follow-up', 'Annual Physical', 'Urgent Visit', 'Telehealth'];
const complaints = ['Persistent cough and fatigue', 'Blood pressure follow-up', 'Annual preventive examination', 'Lower back discomfort', 'Medication review'];

export const mockEncounters: Encounter[] = Array.from({ length: 25 }, (_, index) => ({
  id: `enc-${1001 + index}`,
  patientId: mockPatients[index % mockPatients.length].id,
  providerId: mockProviders[index % mockProviders.length].id,
  facilityId: mockFacilities[index % mockFacilities.length].id,
  date: addDays(toDateKey(new Date()), -(index + 2) * 4),
  time: `${String(9 + (index % 7)).padStart(2, '0')}:${index % 2 ? '30' : '00'}`,
  type: encounterTypes[index % encounterTypes.length],
  status: index % 9 === 0 ? 'Open' : 'Completed',
  chiefComplaint: complaints[index % complaints.length],
  diagnosisSummary: index % 3 === 0 ? 'Essential hypertension; stable' : index % 3 === 1 ? 'Viral upper respiratory infection' : 'Routine adult health maintenance',
  notes: 'Patient reviewed current symptoms and treatment goals. Findings, precautions, and follow-up expectations were discussed.',
  vitals: `BP ${118 + (index % 9)}/${72 + (index % 7)} · HR ${68 + (index % 12)} · Temp 98.${index % 7}°F · SpO₂ ${96 + (index % 4)}%`,
  assessment: 'Stable presentation without acute distress. Clinical findings are consistent with the documented complaint.',
  diagnoses: index % 2 ? ['Z00.00 Routine examination', 'Z71.2 Results counseling'] : ['I10 Essential hypertension'],
  plan: 'Continue current care plan. Review medication adherence, maintain hydration and activity as tolerated, and follow up as scheduled.',
}));

const times = ['08:00', '08:30', '09:15', '10:00', '10:45', '11:30', '13:00', '13:45', '14:30', '15:15', '16:00'];
const visitTypes = ['Office Visit', 'Follow-up', 'Annual Physical', 'Urgent Visit', 'Care Planning'];

export const mockAppointments: Appointment[] = Array.from({ length: 36 }, (_, index) => {
  const dayOffset = (index % 18) - 8;
  const past = dayOffset < 0;
  const encounter = past ? mockEncounters[index % mockEncounters.length] : undefined;
  return {
    id: `apt-${2001 + index}`,
    patientId: encounter?.patientId ?? mockPatients[(index * 3) % mockPatients.length].id,
    providerId: encounter?.providerId ?? mockProviders[index % mockProviders.length].id,
    facilityId: encounter?.facilityId ?? mockFacilities[index % mockFacilities.length].id,
    date: past && encounter ? encounter.date : addDays(toDateKey(new Date()), dayOffset),
    startTime: times[index % times.length],
    duration: [30, 45, 60][index % 3],
    visitType: encounter?.type ?? visitTypes[index % visitTypes.length],
    reason: encounter?.chiefComplaint ?? complaints[index % complaints.length],
    status: past ? 'Completed' : (['Scheduled', 'Confirmed', 'Checked In', 'In Progress'] as const)[index % 4],
    notes: 'Please arrive 10 minutes early. Bring an updated medication list and insurance card.',
    encounterId: encounter?.id,
  };
});

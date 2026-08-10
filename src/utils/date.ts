export const pad = (value: number) => String(value).padStart(2, '0');

export function toDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fromDateKey(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(value: string | Date, amount: number) {
  const date = typeof value === 'string' ? fromDateKey(value) : new Date(value);
  date.setDate(date.getDate() + amount);
  return toDateKey(date);
}

export function startOfWeek(value: string) {
  const date = fromDateKey(value);
  const offset = date.getDay() === 0 ? -6 : 1 - date.getDay();
  return addDays(date, offset);
}

export function formatDate(value: string, options?: Intl.DateTimeFormatOptions) {
  return fromDateKey(value).toLocaleDateString('en-US', options ?? { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatTime(value: string) {
  const [hourValue, minute] = value.split(':').map(Number);
  const hour = hourValue % 12 || 12;
  return `${hour}:${pad(minute)} ${hourValue >= 12 ? 'PM' : 'AM'}`;
}

export function getAge(dob: string) {
  const birth = fromDateKey(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age -= 1;
  return age;
}

export function buildTimeSlots(startHour = 8, endHour = 17, interval = 15) {
  const slots: string[] = [];
  for (let minutes = startHour * 60; minutes <= endHour * 60; minutes += interval) {
    slots.push(`${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`);
  }
  return slots;
}

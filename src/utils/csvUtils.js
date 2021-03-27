import { format } from 'date-fns';

export function getTotalVaccinationsAtDay(data, day) {
  return data.filter((row) => row.date === format(day, 'yyyy-MM-dd'));
}

export function getCountryVaccinations(data, iso) {
  return data.filter((row) => row.iso_code === iso);
}

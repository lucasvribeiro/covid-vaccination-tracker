import { format } from 'date-fns';

export default function getTotalVaccinationsAtDay(data, day) {
  return data.filter((row) => row.date === format(day, 'yyyy-MM-dd'));
}

import { format } from 'date-fns';

export function getTotalVaccinationsAtDay(data, day) {
  return data.filter((row) => row.date === format(day, 'yyyy-MM-dd'));
}

export function getCountryVaccinations(data, iso) {
  return data.filter((row) => row.iso_code === iso);
}

export function getVaccines(data) {
  const flags = [];
  const uniqueCountries = [];
  const uniqueVaccines = [];
  const countCountries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < data.length; i += 1) {
    // eslint-disable-next-line no-continue
    if (flags[data[i].iso_code]) continue;
    flags[data[i].iso_code] = true;

    const usedVaccines = data[i].vaccines.split(', ');

    for (let j = 0; j < usedVaccines.length; j += 1) {
      if (uniqueVaccines.indexOf(usedVaccines[j]) === -1) {
        uniqueVaccines.push(usedVaccines[j]);
      }
    }

    uniqueCountries.push({ ...data[i], usedVaccines });
  }

  for (let i = 0; i < uniqueCountries.length; i += 1) {
    const uv = uniqueCountries[i].usedVaccines;

    for (let j = 0; j < uv.length; j += 1) {
      countCountries[uniqueVaccines.indexOf(uv[j])] += 1;
    }
  }

  return { vaccines: uniqueVaccines, amountCountries: countCountries };
}

export function getPeopleFullyVaccinatedPercentage(data) {
  const countryPercentage = new Map();

  data.forEach((day) => {
    countryPercentage.set(day.iso_code, {
      countryName: day.country,
      percentage: day.people_fully_vaccinated_per_hundred,
    });
  });

  return Array
    .from(countryPercentage.values())
    .sort((a, b) => b.percentage - a.percentage);
}

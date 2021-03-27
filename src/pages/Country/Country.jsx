import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import propTypes from 'prop-types';
import { csv } from 'd3-fetch';

import { getCountryVaccinations } from '../../utils/csvUtils';

import './Country.css';

const CountryPage = (props) => {
  const [countryVaccinations, setCountryVaccinations] = useState();
  const [allData, setAllData] = useState([]);
  const [dates, setDates] = useState([]);
  const [vaccinationsPerHundred, setVaccinationsPerHundred] = useState([]);
  const { match } = props;

  useEffect(async () => {
    setAllData(await csv('/country_vaccinations.csv'));
  }, []);

  useEffect(() => {
    if (!allData.length) {
      return;
    }

    setCountryVaccinations(getCountryVaccinations(allData, match.params.iso));
  }, [allData]);

  useEffect(() => {
    if (countryVaccinations) {
      setDates(countryVaccinations.map((cv) => cv.date));
      setVaccinationsPerHundred(countryVaccinations.map((cv) => cv.total_vaccinations_per_hundred));
    }
  }, [countryVaccinations]);

  return (
    <div className="chart-container">
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: '# of Vaccinations per Hundred',
              data: vaccinationsPerHundred,
              backgroundColor: 'rgba(34, 94, 168, 0.6)',
              borderColor: 'rgba(34, 94, 168, 1)',
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

CountryPage.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      iso: propTypes.string,
    }),
  }).isRequired,
};

export default CountryPage;

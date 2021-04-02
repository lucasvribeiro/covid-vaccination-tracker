import { csv } from 'd3-fetch';
import propTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import { getCountryVaccinations } from '../../utils/csvUtils';
import './Country.scss';

const CountryPage = (props) => {
  const history = useHistory();

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

  const countryName = useMemo(() => {
    if (countryVaccinations && countryVaccinations.length) {
      return countryVaccinations[0].country;
    }

    return '';
  }, [countryVaccinations]);

  function goBack() {
    history.replace('/');
  }

  return (
    <>
      <header className="header">
        <div className="titleContainer">
          <span
            className="material-icons"
            onClick={goBack}
            onKeyDown={goBack}
            role="button"
            tabIndex={0}
          >
            keyboard_backspace
          </span>
          <h2>
            COVID19 Vaccination Tracker
          </h2>
        </div>
        <h2 className="country">
          {countryName}
        </h2>
        <div className="flex" />
      </header>
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
    </>
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

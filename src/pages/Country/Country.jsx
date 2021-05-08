import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box, Center, Flex, Heading, IconButton, Text,
} from '@chakra-ui/react';
import 'chartjs-plugin-zoom';
import { csv } from 'd3-fetch';
import { eachDayOfInterval, format, parse } from 'date-fns';
import propTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useHistory, useLocation } from 'react-router-dom';
import { getCountryVaccinations } from '../../utils/csvUtils';
import './Country.scss';

const CountryPage = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { match } = props;

  const [allData, setAllData] = useState([]);

  const query = useMemo(() => new URLSearchParams(location.search), []);
  const initialDate = useMemo(() => parse(query.get('initialDate'), 'yyyy-MM-dd', new Date()), [query]);
  const endDate = useMemo(() => parse(query.get('endDate'), 'yyyy-MM-dd', new Date()), [query]);

  function getRandomColor() {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    return { r, g, b };
  }

  function fillMissingDates(countryVaccinations) {
    const allDaysOfInterval = eachDayOfInterval({
      start: initialDate,
      end: endDate,
    });

    const allDaysMap = new Map(
      allDaysOfInterval.map((day) => [format(day, 'yyyy-MM-dd'), '']),
    );

    countryVaccinations.forEach((row) => {
      allDaysMap.set(row.date, row.total_vaccinations_per_hundred);
    });

    return Array.from(allDaysMap.values());
  }

  const labels = useMemo(() => eachDayOfInterval({
    start: initialDate,
    end: endDate,
  })
    .map((day) => format(day, 'dd/MM/yyyy')),
  [initialDate, endDate]);

  const datasets = useMemo(() => {
    if (!allData.length) {
      return [];
    }

    const { iso } = match.params;
    const isoCodes = iso.split(',');

    return isoCodes.map((isoCode) => {
      const countryVaccinations = getCountryVaccinations(allData, isoCode);

      const { r, g, b } = getRandomColor();

      return {
        label: countryVaccinations.length ? countryVaccinations[0].country : 'Sem nome',
        data: fillMissingDates(countryVaccinations),
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.6)`,
        borderColor: `rgba(${r}, ${g}, ${b}, 1)`,
        borderWidth: 1,
      };
    });
  }, [allData, fillMissingDates]);

  useEffect(async () => {
    setAllData(await csv('/country_vaccinations.csv'));
  }, []);

  function goBack() {
    history.replace('/');
  }

  return (
    <Flex flexDirection="column" height="100%">
      <Flex height={20} backgroundColor="blue.700" alignItems="center" padding={4}>
        <IconButton icon={<ArrowBackIcon />} marginRight={4} onClick={goBack} />
        <Heading flexGrow={1} color="white">COVID19 Vaccination Tracker</Heading>
      </Flex>
      <Box flexGrow={1}>
        <Center marginTop={8}>
          <Text># of Vaccinations per Hundred</Text>
        </Center>
        <Center>
          <div className="chart-container">
            <Line
              data={{
                labels,
                datasets,
              }}
              options={{
                plugins: {
                  zoom: {
                    zoom: {
                      enabled: true,
                      mode: 'xy',
                    },
                    pan: {
                      enabled: true,
                      mode: 'xy',
                    },
                  },
                },
              }}
            />
          </div>
        </Center>
      </Box>
    </Flex>
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

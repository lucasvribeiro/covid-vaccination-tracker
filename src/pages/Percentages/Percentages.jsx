import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box, Center, Flex, Heading, IconButton, Text,
} from '@chakra-ui/react';
import 'chartjs-plugin-zoom';
import { csv } from 'd3-fetch';
import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import { getPeopleFullyVaccinatedPercentage } from '../../utils/csvUtils';

const PercentagesPage = () => {
  const history = useHistory();
  const [allData, setAllData] = useState([]);
  const [percentages, setPercentages] = useState([]);

  useEffect(async () => {
    setAllData(await csv('/country_vaccinations.csv'));
  }, []);

  useEffect(() => {
    setPercentages(getPeopleFullyVaccinatedPercentage(allData));
  }, [allData]);

  function getRandomColor() {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    return { r, g, b };
  }

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
          <Text>Percentage of fully vaccinated people</Text>
        </Center>
        <Center>
          <div className="chart-container">
            <HorizontalBar
              height={1500}
              data={{
                labels: percentages.map((country) => country.countryName),
                datasets: [
                  {
                    label: '% of people vaccinated per hundred',
                    data: percentages.map((country) => country.percentage),
                    backgroundColor: percentages.map(() => {
                      const { r, g, b } = getRandomColor();

                      return `rgba(${r}, ${g}, ${b}, 1)`;
                    }),
                  },
                ],
              }}
            />
          </div>
        </Center>
      </Box>
    </Flex>
  );
};

PercentagesPage.propTypes = {};

export default PercentagesPage;

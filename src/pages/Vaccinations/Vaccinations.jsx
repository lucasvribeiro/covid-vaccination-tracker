import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box, Center, Flex, Heading, IconButton, Text,
} from '@chakra-ui/react';
import 'chartjs-plugin-zoom';
import { csv } from 'd3-fetch';
import { Pie } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getVaccines } from '../../utils/csvUtils';

const VaccinationsPage = () => {
  const history = useHistory();
  const [allData, setAllData] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(async () => {
    setAllData(await csv('/country_vaccinations.csv'));
  }, []);

  useEffect(() => {
    setVaccinations(getVaccines(allData));
  }, [allData]);

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
          <Text>Amount of Countries using each Vaccine</Text>
        </Center>
        <Center>
          <div className="chart-container">

            <Pie data={{
              labels: vaccinations.vaccines,
              datasets: [
                {
                  label: '# of Vaccines',
                  data: vaccinations.amountCountries,
                  backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 255, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(15, 255, 132, 1)',
                    'rgba(54, 30, 200, 1)',
                    'rgba(255, 90, 86, 1)',
                    'rgba(10, 192, 200, 1)',
                    'rgba(153, 40, 150, 1)',
                  ],
                  borderWidth: 0,
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

VaccinationsPage.propTypes = {};

export default VaccinationsPage;

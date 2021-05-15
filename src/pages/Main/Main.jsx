import {
  Box, Button, Center, Flex, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text,
} from '@chakra-ui/react';
import { addDays, format } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import WorldMap from '../../components/WorldMap/WorldMap';

const INITIAL_DATE = new Date(2020, 11, 14);
const END_DATE = new Date(2021, 4, 6);

const AMOUNT_OF_DAYS = differenceInDays(END_DATE, INITIAL_DATE);

function MainPage() {
  const [selectedDate, setSelectedDate] = useState(END_DATE);
  const [tooltipText, setTooltipText] = useState('');
  const history = useHistory();

  function onNavigateToVaccines() {
    history.push('vaccines');
  }

  function onNavigateToPercentages() {
    history.push('percentages');
  }

  return (
    <Flex flexDirection="column" height="100%">
      <Flex height={20} backgroundColor="blue.700" alignItems="center" padding={4}>
        <Heading flexGrow={1} color="white">COVID19 Vaccination Tracker</Heading>
        <Box
          position="absolute"
          borderColor="black"
          width="-moz-fit-content"
          top={100}
          left={5}
          flexDirection="column"
        >
          <Center flexDirection="column">
            <Button
              size="lg"
              colorScheme="blue"
              onClick={onNavigateToVaccines}
              width="100%"
            >
              Ver vacinas
            </Button>
            <Button
              size="lg"
              colorScheme="blue"
              onClick={onNavigateToPercentages}
              width="100%"
              marginTop={2}
            >
              Ver porcentagens
            </Button>
          </Center>
        </Box>
        <Slider
          aria-label="slider-ex-1"
          min={0}
          max={AMOUNT_OF_DAYS}
          defaultValue={AMOUNT_OF_DAYS}
          width={600}
          onChange={(value) => setSelectedDate(addDays(INITIAL_DATE, value))}
          marginRight={4}
        >
          <SliderTrack>
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box bg="white" padding={2} borderRadius={8}>
          <Text>{format(selectedDate, 'dd/MM/yyyy')}</Text>
        </Box>
      </Flex>
      <Box flexGrow={1} overflow="hidden">
        <WorldMap
          selectedDate={selectedDate}
          setTooltipContent={setTooltipText}
          initialDate={INITIAL_DATE}
          endDate={END_DATE}
        />

        <ReactTooltip>{tooltipText}</ReactTooltip>
      </Box>
    </Flex>
  );
}

export default MainPage;

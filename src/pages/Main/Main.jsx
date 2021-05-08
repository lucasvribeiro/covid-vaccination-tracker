import {
  Box, Flex, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text,
} from '@chakra-ui/react';
import { addDays, format } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';
import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import WorldMap from '../../components/WorldMap/WorldMap';

const INITIAL_DATE = new Date(2020, 11, 14);
const END_DATE = new Date(2021, 4, 6);

const AMOUNT_OF_DAYS = differenceInDays(END_DATE, INITIAL_DATE);

function MainPage() {
  const [selectedDate, setSelectedDate] = useState(END_DATE);
  const [tooltipText, setTooltipText] = useState('');

  return (
    <Flex flexDirection="column" height="100%">
      <Flex height={20} backgroundColor="blue.700" alignItems="center" padding={4}>
        <Heading flexGrow={1} color="white">COVID19 Vaccination Tracker</Heading>
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

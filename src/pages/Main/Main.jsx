import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import DateRangeSlider from '../../components/DateRangeSlider/DateRangeSlider';
import WorldMap from '../../components/WorldMap/WorldMap';

import './Main.css';

function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date('2021-02-25'));
  const [tooltipContent, setTooltipContent] = useState('');

  return (
    <div>
      <div style={{
        display: 'flex',
        marginTop: 24,
        padding: 24,
        justifyContent: 'center',
      }}
      >
        <DateRangeSlider onChange={setSelectedDate} />
      </div>
      <WorldMap selectedDate={selectedDate} setTooltipContent={setTooltipContent} />
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </div>
  );
}

export default MainPage;

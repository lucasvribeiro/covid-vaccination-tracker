import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

import './Main.scss';

import DateRangeSlider from '../../components/DateRangeSlider/DateRangeSlider';
import WorldMap from '../../components/WorldMap/WorldMap';

function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date('2021-02-25'));
  const [tooltipContent, setTooltipContent] = useState('');

  return (
    <>
      <header className="header">
        <h2>
          COVID19 Vaccination Tracker
        </h2>
        <DateRangeSlider onChange={setSelectedDate} />
      </header>
      <div>
        <WorldMap selectedDate={selectedDate} setTooltipContent={setTooltipContent} />
        <ReactTooltip>{tooltipContent}</ReactTooltip>
      </div>
    </>
  );
}

export default MainPage;

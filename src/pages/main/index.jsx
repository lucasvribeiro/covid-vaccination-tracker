import React, { useState } from 'react';
import DateRangeSlider from './DateRangeSlider';
import WorldMap from './WorldMap';

function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date('2021-02-25'));

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
      <WorldMap selectedDate={selectedDate} />
    </div>
  );
}

export default MainPage;

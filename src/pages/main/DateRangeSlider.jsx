import { format } from 'date-fns';
import propTypes from 'prop-types';
import React, { useState } from 'react';

function DateRangeSlider({
  initialDate,
  finalDate,
  onChange,
}) {
  const [value, setValue] = useState(finalDate.getTime());

  return (
    <div>
      <input
        type="range"
        style={{ width: 500 }}
        min={initialDate.getTime()}
        max={finalDate.getTime()}
        value={value}
        onInput={(evt) => {
          const newValue = Number(evt.target.value);

          setValue(newValue);
          onChange(new Date(newValue));
        }}
        step={86400}
      />
      {format(new Date(value), 'dd/MM/yyyy')}
    </div>
  );
}

DateRangeSlider.propTypes = {
  initialDate: propTypes.instanceOf(Date),
  finalDate: propTypes.instanceOf(Date),
  onChange: propTypes.func,
};

DateRangeSlider.defaultProps = {
  initialDate: new Date('2020-12-14'),
  finalDate: new Date('2021-02-25'),
  onChange: () => {},
};

export default DateRangeSlider;

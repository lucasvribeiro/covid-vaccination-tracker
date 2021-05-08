import { csv } from 'd3-fetch';
import { format } from 'date-fns';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { getTotalVaccinationsAtDay } from '../../utils/csvUtils';
import SelectedCountries from '../SelectedCountries';
import './WorldMap.css';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const colors = {
  1000: '#FFFFCC',
  10000: '#C7E9B4',
  100000: '#7FCDBB',
  1_000_000: '#41B6C4',
  10_000_000: '#1D91C0',
  100_000_000: '#225EA8',
  1_000_000_000: '#0C2C84',
};

function getCountryColor(country) {
  if (!country) {
    return '#EEEEEE';
  }

  const colorKey = Object
    .keys(colors)
    .find((c) => c >= Number(country.total_vaccinations));

  return colors[colorKey];
}

const WorldMap = ({
  selectedDate, setTooltipContent, initialDate, endDate,
}) => {
  const history = useHistory();

  const [dayData, setDayData] = useState([]);
  const [allData, setAllData] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(async () => {
    setAllData(await csv('/country_vaccinations.csv'));
  }, []);

  useEffect(() => {
    if (!allData.length) {
      return;
    }

    setDayData(getTotalVaccinationsAtDay(allData, selectedDate));
  }, [selectedDate, allData]);

  function toggleCountry(properties) {
    if (selectedCountries.find((country) => country.ISO_A3 === properties.ISO_A3)) {
      setSelectedCountries(
        (countries) => countries.filter((country) => country.ISO_A3 !== properties.ISO_A3),
      );
    } else {
      setSelectedCountries((countries) => [...countries, properties]);
    }
  }

  function openChart() {
    const selectedIsoCodes = selectedCountries.map((country) => country.ISO_A3);

    const formattedInitialDate = format(initialDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    history.push(`country/${selectedIsoCodes.join(',')}?initialDate=${formattedInitialDate}&endDate=${formattedEndDate}`);
  }

  return (
    <div>
      <ComposableMap
        projectionConfig={{
          scale: 120,
        }}
        projection="geoMercator"
        data-tip=""
      >
        <ZoomableGroup zoom={1}>
          {dayData.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => {
              const d = dayData.find((s) => s.iso_code === geo.properties.ISO_A3);
              const totalVaccinations = d ? d.total_vaccinations_per_hundred : 'N/A';

              const isCountrySelected = selectedCountries
                .find((country) => country.ISO_A3 === geo.properties.ISO_A3);

              return (
                <Geography
                  className="geo-territory"
                  key={geo.rsmKey}
                  geography={geo}
                  stroke={isCountrySelected ? 'red' : 'black'}
                  strokeWidth={isCountrySelected ? 2 : 0.2}
                  fill={getCountryColor(d)}
                  opacity={isCountrySelected ? 0.7 : 1}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(`${NAME} — ${totalVaccinations}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  onClick={() => toggleCountry(geo.properties)}
                />
              );
            })}
          </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>
      {selectedCountries.length && (
      <SelectedCountries
        countries={selectedCountries}
        onViewChart={openChart}
        onClear={() => setSelectedCountries([])}
      />
      )}
    </div>
  );
};

WorldMap.propTypes = {
  selectedDate: propTypes.instanceOf(Date).isRequired,
  setTooltipContent: propTypes.func.isRequired,
  initialDate: propTypes.instanceOf(Date).isRequired,
  endDate: propTypes.instanceOf(Date).isRequired,
};

export default WorldMap;

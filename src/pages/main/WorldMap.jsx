import { csv } from 'd3-fetch';
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule, Sphere, ZoomableGroup,
} from 'react-simple-maps';
import getTotalVaccinationsAtDay from '../../utils/csvUtils';

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

const WorldMap = ({ selectedDate }) => {
  const [dayData, setDayData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(async () => {
    setAllData(await csv('/country_vaccinations.csv'));
  }, []);

  useEffect(() => {
    if (!allData.length) {
      return;
    }

    setDayData(getTotalVaccinationsAtDay(allData, selectedDate));
  }, [selectedDate, allData]);

  return (
    <ComposableMap
      projectionConfig={{
        scale: 120,
      }}
      projection="geoMercator"
    >
      <ZoomableGroup zoom={1}>
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {dayData.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => {
              const d = dayData.find((s) => s.iso_code === geo.properties.ISO_A3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryColor(d)}
                />
              );
            })}
          </Geographies>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
};

WorldMap.propTypes = {
  selectedDate: propTypes.instanceOf(Date).isRequired,
};

export default WorldMap;

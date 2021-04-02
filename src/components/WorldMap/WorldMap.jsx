import { csv } from 'd3-fetch';
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

const WorldMap = ({ selectedDate, setTooltipContent }) => {
  const history = useHistory();

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
              return (
                <Geography
                  className="geo-territory"
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="black"
                  strokeWidth={0.2}
                  fill={getCountryColor(d)}
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
                  onClick={() => history.push(`country/${geo.properties.ISO_A3}`)}
                />
              );
            })}
          </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>

    </div>

  );
};

WorldMap.propTypes = {
  selectedDate: propTypes.instanceOf(Date).isRequired,
  setTooltipContent: propTypes.func.isRequired,
};

export default WorldMap;

import { FC } from 'react';
import { Air, Water } from '@mui/icons-material';

import { getWMOInfo } from '../getWMOInfo';
import { WeatherInfo } from '../vite-env';

export const CurrentReport: FC<Readonly<{ weatherInfo: WeatherInfo }>> = ({
  weatherInfo,
}) => {
  const wmoInfo = getWMOInfo(weatherInfo);

  const current = {
    temperature: {
      value: weatherInfo.current.temperature_2m,
      units: weatherInfo.current_units.temperature_2m,
    },
    apparentTemperature: {
      value: weatherInfo.current.apparent_temperature,
      units: weatherInfo.current_units.apparent_temperature,
    },
    windspeed: {
      value: weatherInfo.current.windspeed_10m,
      units: weatherInfo.current_units.windspeed_10m,
    },
    relativeHumidity: {
      value: weatherInfo.current.relativehumidity_2m,
      units: weatherInfo.current_units.relativehumidity_2m,
    },
    imageUrl: wmoInfo?.image,
    description: wmoInfo?.description,
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplate: '1fr 1fr / 3fr minmax(100px, 1fr)',
          gap: '2rem',
        }}
      >
        <div>
          <p style={{ fontSize: '3.5rem', margin: 0 }}>
            {current.temperature.value}
            {current.temperature.units}
          </p>
          <p style={{ margin: 0 }}>
            Feels like {current.apparentTemperature.value}
            {current.apparentTemperature.units}
          </p>
        </div>
        <div style={{ justifySelf: 'end' }}>
          <img
            src={current.imageUrl}
            style={{ width: '84px', height: '84px' }}
          />
          <p style={{ margin: 0 }}>{current.description}</p>
        </div>
        <div>
          <p style={{ fontSize: '1.5rem', margin: 0 }}>
            <Air /> {current.windspeed.value}
            {current.windspeed.units}
          </p>
          <p style={{ margin: 0 }}>Wind speed</p>
        </div>
        <div style={{ justifySelf: 'end' }}>
          <p style={{ fontSize: '1.5rem', margin: 0 }}>
            <Water /> {current.relativeHumidity.value}
            {current.relativeHumidity.units}
          </p>
          <p style={{ margin: 0 }}>Humidity</p>
        </div>
      </div>
    </>
  );
};

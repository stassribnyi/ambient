import { WeatherInfo } from "./vite-env";

import { WMO } from "./wmo";

export function getWMOInfo(weatherInfo: WeatherInfo) {
    if (weatherInfo.current_units.weathercode !== 'wmo code') {
        return null;
    }

    const details = WMO[weatherInfo.current.weathercode];

    return weatherInfo.current.is_day ? details.day : details.night;
}
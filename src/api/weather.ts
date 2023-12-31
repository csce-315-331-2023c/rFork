import { WeatherInformation } from "../types";
import axios from "axios";

const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

/**
 * Gets the current weather at the location of the specified coordinates
 * @param lat lattitude
 * @param lon longitude
 * @returns WeatherInformation object
 */
export async function fetchWeather(lat: number, lon: number): Promise<WeatherInformation> {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        throw new Error('No weather API key found!');
    }

    const resp = await axios({
        method: 'GET',
        url: BASE_URL,
        params: {
            lat,
            lon,
            appid: apiKey
        }
    });

    const current = resp.data.current;

    const weather: WeatherInformation = {
        timestamp: new Date(current.dt * 1000),
        sunrise: new Date(current.sunrise * 1000),
        sunset: new Date(current.sunset * 1000),
        temperature: current.temp,
        feelsLike: current.feels_like,
        pressure: current.pressure,
        humidity: current.humidity,
        dewPoint: current.dew_point,
        uvi: current.uvi,
        clouds: current.clouds,
        visibility: current.visibility,
        windSpeed: current.wind_speed,
        windDirection: current.wind_deg,
        weather: current.weather.map((condition: any) => ({
            id: condition.id,
            main: condition.main,
            description: condition.description,
            icon: condition.icon
        }))
    };

    return weather;
}
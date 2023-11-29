import 'dotenv/config';
import { fetchWeather } from './weather';

describe('fetchWeather', () => {
    it('should return weather information', async () => {
        const weather = await fetchWeather(0, 0);

        expect(weather).toBeDefined();
        expect(weather.timestamp).toBeDefined();
        expect(weather.sunrise).toBeDefined();
        expect(weather.sunset).toBeDefined();
        expect(weather.temperature).toBeDefined();
        expect(weather.feelsLike).toBeDefined();
        expect(weather.pressure).toBeDefined();
        expect(weather.humidity).toBeDefined();
        expect(weather.dewPoint).toBeDefined();
        expect(weather.uvi).toBeDefined();
        expect(weather.clouds).toBeDefined();
        expect(weather.visibility).toBeDefined();
        expect(weather.windSpeed).toBeDefined();
        expect(weather.windDirection).toBeDefined();
        expect(weather.weather).toBeDefined();
    });
});
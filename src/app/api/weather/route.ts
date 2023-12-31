import { NextRequest, NextResponse } from "next/server";
import { fetchWeather } from "../../../api/weather";

/**
 * Fetches weather information and returns a json
 * @param request 
 * @returns NextResponse json of weather data
 */
export async function GET(request: NextRequest) {
    const lat = request.nextUrl.searchParams.get('lat') || 30.61596;
    const lon = request.nextUrl.searchParams.get('lon') || -96.31799;
    const weather = await fetchWeather(Number(lat), Number(lon));
    return NextResponse.json(weather)
}
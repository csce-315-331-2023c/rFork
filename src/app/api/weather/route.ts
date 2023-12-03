import { NextRequest, NextResponse } from "next/server";
import { fetchWeather } from "../../../api/weather";

export async function GET(request: NextRequest) {
    const lat = request.nextUrl.searchParams.get('lat') || 0;
    const lon = request.nextUrl.searchParams.get('lon') || 0;
    const weather = await fetchWeather(Number(lat), Number(lon));
    return NextResponse.json(weather)
}
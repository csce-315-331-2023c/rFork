import { NextRequest, NextResponse } from "next/server";
import { translate } from "../../../api/translate"

export async function GET(request: NextRequest) {
    const language = request.nextUrl.searchParams.get('language') || '';
    const text = request.nextUrl.searchParams.get('text') || '';
    const translatedText = await translate(text, language);
    return NextResponse.json({ language, text, translatedText })
}
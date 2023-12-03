import React from 'react'
import 'dotenv/config';

const key = process.env.TRANSLATE_API_KEY;
let currentLanguage: string = "en";

export async function translate(text: string, newLanguage: string) {
    const Url = `https://translation.googleapis.com/language/translate/v2?key=${key}&source=${currentLanguage}&target=${newLanguage}&q=${encodeURIComponent(text)}`;
    console.log(Url);
    return fetch(Url).then(async (result) => {
        console.log(result)
        return result.json().then(res => res?.data?.translations[0]?.translatedText);
    })
}


export async function translatePage(newLanguage: string) {
    if (newLanguage == currentLanguage) {
        return;
    }
    const elements = document.getElementsByTagName("*");

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        console.log(element.className);

        if (element.textContent && element.id == "google-translate-element") {
            element.textContent = await fetch(`/api/transapi?language=${newLanguage}&text=${encodeURIComponent(element.textContent)}`).then(res => res.json()).then(res => res?.translatedText);
        }
    }
}
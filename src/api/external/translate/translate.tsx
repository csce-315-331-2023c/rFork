import React from 'react'
import 'dotenv/config';

const key = process.env.TRANSLATE_API_KEY;
let currentLanguage: string = "en";

function translate(text: string, newLanguage: string){
    const Url = `https://translation.googleapis.com/language/translate/v2?key=${key}&source=${currentLanguage}&target=${newLanguage}&q=${encodeURIComponent(text)}`;
    return fetch(Url);
}

export async function translatePage(newLanguage: string){
    const elements = document.getElementsByTagName("*");
    const elementTranslate: HTMLElement[] = [];

    for(let i = 0; i < elements.length; i++){

        const element = elements[i] as HTMLElement;

        if(element.hasChildNodes() && element.firstChild?.nodeType == Node.TEXT_NODE){
            elementTranslate.push(element as HTMLElement);
        }
    }

    for(const e of elementTranslate){

        const translated = await translate(e.innerText, newLanguage);
        const translatedText = await translated.text();
        e.textContent = translatedText;

    }

    currentLanguage = newLanguage;
}
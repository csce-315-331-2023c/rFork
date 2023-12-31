import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export type Ingredient = {
    itemId: number;
    itemName: string;
    quantity: number;
};

export type MenuItem = {
    id?: number;
    name: string;
    price: number;
    ingredients: Ingredient[];
    validExtras: Ingredient[];
    description?: string;
    imageURI?: string;
    removedIngredients?: Ingredient[];
};

export type Tag = string;

export type InventoryItem = {
    id: number;
    name: string;
    currentStock: number;
    reorderThreshold: number;
};

export type Order = {
    id?: number;
    timestamp: Date;
    items: MenuItem[];
    total: number;
    submittedBy: Employee | Customer;
    isFinished?: boolean;
};

export type Customer = {
    // not tracking info here, just a placeholder 
    // for when an order is submitted by a customer
};

export type Employee = {
    id?: number;
    firstName: string;
    lastName: string;
    role: "employee" | "manager";
};

export type rUser = User & {
    employee?: Employee;
};

export type rToken = JWT & {
    employee?: Employee;
};

export type rSession = Session & {
    user?: rUser;
}; 


export type itemReport = {
    id1: number;
    id2: number;
    name1: string;
    name2: string;
    quantity: number;
}

export type usageReport = {
    id: number;
    name: string;
    quantity: number;
}

export const Languages = {
    "English": "en",
    "Spanish": "es",
    "French": "fr",
    "German": "de",
    "Italian": "it",
    "Japanese": "ja",
    "Korean": "ko",
    "Russian": "ru",
    "Portuguese": "pt",
    "Arabic": "ar",
    "Turkish": "tr",
    "Polish": "pl",
    "Dutch": "nl",
    "Romanian": "ro",
    "Indonesian": "id",
    "Swedish": "sv",
    "Danish": "da",
    "Hebrew": "he",
    "Norwegian": "no",
    "Bulgarian": "bg",
    "Finnish": "fi",
    "Vietnamese": "vi",
    "Thai": "th",
    "Greek": "el",
    "Ukrainian": "uk",
    "Chinese (Simplified)": "zh-CN",
    "Chinese (Traditional)": "zh-TW",
};

export type WeatherCondition = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

export type WeatherInformation = {
    timestamp: Date;
    sunrise: Date;
    sunset: Date;
    temperature: number;
    feelsLike: number;
    pressure: number;
    humidity: number;
    dewPoint: number;
    uvi: number;
    clouds: number;
    visibility: number;
    windSpeed: number;
    windDirection: number;
    weather: WeatherCondition[];
};
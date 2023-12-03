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
};

export type Customer = {
    // not tracking info here, just a placeholder 
    // for when an order is submitted by a customer
};

export type Employee = {
    id?: number;
    firstName: string;
    lastName: string;
    role: string;
};

export const Languages = {
    english : "en",
    spanish : "es",
    french : "fr",
    german : "de",
    italian : "it",
    japanese : "ja",
    korean : "ko",
    chinese : "zh-CN",
    russian : "ru",
    portuguese : "pt",
    arabic : "ar",
    turkish : "tr",
    polish : "pl",
    dutch : "nl",
    romanian : "ro",
    hungarian : "hu",
    czech : "cs",
    indonesian : "id",
    swedish : "sv",
    danish : "da",
    hebrew : "he",
    norwegian : "no",
    slovak : "sk",
    bulgarian : "bg",
    finnish : "fi",
    vietnamese : "vi",
    thai : "th",
    greek : "el",
    ukrainian : "uk",
    catalan : "ca",
    chineseTaiwan : "zh-TW",
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
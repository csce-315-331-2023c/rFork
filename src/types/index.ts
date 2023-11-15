export type Ingredient = {
    inventoryId: number;
    name: string;
    quantity: number;
};

export type MenuItem = {
    id?: number;
    name: string;
    price: number;
    ingredients: Ingredient[];
};

export type InventoryItem = {
    id: number;
    name: string;
    currentStock: number;
};

export type Order = {
    id?: number;
    date: Date;
    items: MenuItem[];
    total: number;
};

export const enum Languages{
    english = "en",
    spanish = "es",
    french = "fr",
    german = "de",
    italian = "it",
    japanese = "ja",
    korean = "ko",
    chinese = "zh-CN",
    russian = "ru",
    portuguese = "pt",
    arabic = "ar",
    turkish = "tr",
    polish = "pl",
    dutch = "nl",
    romanian = "ro",
    hungarian = "hu",
    czech = "cs",
    indonesian = "id",
    swedish = "sv",
    danish = "da",
    hebrew = "he",
    norwegian = "no",
    slovak = "sk",
    bulgarian = "bg",
    finnish = "fi",
    vietnamese = "vi",
    thai = "th",
    greek = "el",
    ukrainian = "uk",
    catalan = "ca",
    chineseTaiwan = "zh-TW",
};
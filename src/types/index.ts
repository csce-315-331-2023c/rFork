export type Ingredient = {
    inventoryId: number;
    name: string;
    quantity: number;
};

export type MenuItem = {
    id: number;
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
    id: number;
    date: Date;
    items: MenuItem[];
    total: number;
};

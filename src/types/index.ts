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

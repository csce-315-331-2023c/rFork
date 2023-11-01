import { MenuItem, Ingredient } from "../types";
import db from "./index";

export async function getAllMenuItems(): Promise<MenuItem[]> {
    // yes, this is inefficient

    // get all inventory items, create id->name map
    const inventoryQuery = 'SELECT (id, item_name) FROM inventory_item';

    const inventoryResult = await db.query(inventoryQuery);

    let inventoryMap: Map<number, string> = new Map();
    for (let row of inventoryResult.rows) {
        inventoryMap.set(row.id, row.item_name);
    }

    // get all ingredients, populate name from map, create list
    const ingredientQuery = 'SELECT (id, item_id, menu_item_id, qty_used) FROM menu_item_ingredient_defaults';

    const ingredientResult = await db.query(ingredientQuery);
    
    type ingredient = Ingredient & { menuItemId: number };

    let ingredients: ingredient[] = [];
    for (let row of ingredientResult.rows) {
        ingredients.push({
            inventoryId: row.inventory_id,
            name: inventoryMap.get(row.inventory_id) || 'N/A',
            quantity: row.quantity,
            menuItemId: row.id
        });
    }

    // get all menu items, create id->item map
    const menuItemQuery = 'SELECT (id, name, price_cents) FROM menu_item';

    const menuItemResult = await db.query(menuItemQuery);

    let menuItemsMap: Map<number, MenuItem> = new Map();
    for (let row of menuItemResult.rows) {
        menuItemsMap.set(row.id, {
            id: row.id,
            name: row.name,
            price: row.price_cents / 100, // convert cents to dollars
            ingredients: []
        });
    }

    // iterate ingredients, add to menu item
    for (let ing of ingredients) {
        let menuItem = menuItemsMap.get(ing.menuItemId);
        if (menuItem) {
            const { menuItemId, ...ingred } = ing; // remove menuItemId from ingredient

            menuItem.ingredients.push(ingred as Ingredient);
        }
    }

    return Array.from(menuItemsMap.values());
}
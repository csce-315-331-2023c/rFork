import { MenuItem, Ingredient, Tag } from "../types";
import db from "./index";

export async function getAllMenuItems(): Promise<MenuItem[]> {
    // yes, this is inefficient

    // get all inventory items, create id->name map
    const inventoryQuery = 'SELECT row_to_json(t) FROM (SELECT (id, item_name) FROM inventory_item) t';

    const inventoryResult = await db.query(inventoryQuery);

    let inventoryMap: Map<number, string> = new Map();
    for (let row of inventoryResult.rows) {
        const { f1: id, f2: item_name } = row.row_to_json.row;
        inventoryMap.set(id, item_name);
    }

    // get all ingredients, populate name from map, create list
    const ingredientQuery = 'SELECT row_to_json(t) FROM (SELECT (id, item_id, menu_item_id, qty_used, valid_extra) FROM menu_item_ingredients) t';

    const ingredientResult = await db.query(ingredientQuery);

    type ingredient = Ingredient & { menuItemId: number, isValidExtra: boolean };

    let ingredients: ingredient[] = [];
    for (let row of ingredientResult.rows) {
        const {
            f2: inventory_id,
            f3: menu_item_id,
            f4: quantity,
            f5: valid_extra
        } = row.row_to_json.row;

        ingredients.push({
            itemId: inventory_id,
            itemName: inventoryMap.get(inventory_id) || 'N/A',
            quantity: quantity,
            menuItemId: menu_item_id,
            isValidExtra: valid_extra
        });
    }

    // get all menu items, create id->item map
    const menuItemQuery = 'SELECT row_to_json(t) FROM (SELECT (id, name, price_cents) FROM menu_item) t';

    const menuItemResult = await db.query(menuItemQuery);

    let menuItemsMap: Map<number, MenuItem> = new Map();
    for (let row of menuItemResult.rows) {
        const { f1: id, f2: item_name, f3: price } = row.row_to_json.row;

        menuItemsMap.set(id, {
            id: id,
            name: item_name,
            price: price / 100, // convert cents to dollars
            ingredients: [],
            validExtras: []
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

export async function getMenuItemByTag(tag: Tag): Promise<MenuItem[]> {
    const query = 'SELECT row_to_json(t) FROM (SELECT (mi.id, mi.name, mi.price_cents) FROM menu_item mi INNER JOIN menu_item_tag mit ON mi.id = mit.menu_item_id WHERE mit.tag_name = $1) t';

    const result = await db.query(query, [tag]);

    let menuItems: MenuItem[] = [];
    for (let row of result.rows) {
        const { f1: id, f2: name, f3: price } = row.row_to_json.row;

        menuItems.push({
            id: id,
            name: name,
            price: price / 100, // convert cents to dollars
            ingredients: [],
            validExtras: []
        });
    }

    // get all inventory items, create id->name map
    const inventoryQuery = 'SELECT row_to_json(t) FROM (SELECT (id, item_name) FROM inventory_item) t';

    const inventoryResult = await db.query(inventoryQuery);

    let inventoryMap: Map<number, string> = new Map();
    for (let row of inventoryResult.rows) {
        const { f1: id, f2: item_name } = row.row_to_json.row;
        inventoryMap.set(id, item_name);
    }

    let menuItemIds = menuItems.map(item => item.id);

    const ingredientQuery = 'SELECT row_to_json(t) FROM (SELECT (id, item_id, menu_item_id, qty_used, valid_extra) FROM menu_item_ingredients WHERE menu_item_id = ANY($1)) t';

    const ingredientResult = await db.query(ingredientQuery, [menuItemIds]);

    type ingredient = Ingredient & { menuItemId: number, isValidExtra: boolean };

    let ingredients: ingredient[] = [];
    for (let row of ingredientResult.rows) {
        const {
            f2: inventory_id,
            f3: menu_item_id,
            f4: quantity,
            f5: valid_extra
        } = row.row_to_json.row;

        ingredients.push({
            itemId: inventory_id,
            itemName: inventoryMap.get(inventory_id) || 'N/A',
            quantity: quantity,
            menuItemId: menu_item_id,
            isValidExtra: valid_extra
        });
    }

    // iterate ingredients, add to menu item
    for (let ing of ingredients) {
        let menuItem = menuItems.find(item => item.id === ing.menuItemId);
        if (menuItem) {
            const { menuItemId, ...ingred } = ing; // remove menuItemId from ingredient

            menuItem.ingredients.push(ingred as Ingredient);
        }
    }

    return menuItems;
}
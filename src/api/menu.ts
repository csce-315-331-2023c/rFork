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
    const menuItemQuery = 'SELECT row_to_json(t) FROM (SELECT (id, name, price_cents, description, img_uri) FROM menu_item) t';

    const menuItemResult = await db.query(menuItemQuery);

    let menuItemsMap: Map<number, MenuItem> = new Map();
    for (let row of menuItemResult.rows) {
        const { f1: id, f2: item_name, f3: price, f4: description, f5: imageURI } = row.row_to_json.row;

        menuItemsMap.set(id, {
            id: id,
            name: item_name,
            price: price / 100, // convert cents to dollars
            ingredients: [],
            validExtras: [],
            description,
            imageURI,
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
    const query = 'SELECT row_to_json(t) FROM (SELECT (mi.id, mi.name, mi.price_cents, mi.description, mi.img_uri) FROM menu_item mi INNER JOIN menu_item_tag mit ON mi.id = mit.menu_item_id WHERE mit.tag_name = $1) t';

    const result = await db.query(query, [tag]);

    let menuItems: MenuItem[] = [];
    for (let row of result.rows) {
        const { f1: id, f2: name, f3: price, f4: description, f5: imageURI } = row.row_to_json.row;

        menuItems.push({
            id: id,
            name: name,
            price: price / 100, // convert cents to dollars
            ingredients: [],
            validExtras: [],
            description,
            imageURI
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

export async function addMenuItem(MenuItem: MenuItem): Promise<void> {
    // restaurant_order - date, total

    const MenuItemQuery = 'INSERT INTO menu_item (id, name, price_cents, img_uri, description) VALUES ($1, $2, $3, $4, $5) RETURNING id';


    const MenuItemResult = await db.query(MenuItemQuery, [MenuItem.id, MenuItem.name, MenuItem.price, MenuItem.imageURI, MenuItem.description]);
    
    if (MenuItemResult.rowCount !== 1) {
        throw new Error('Error inserting order');
    }
    
    MenuItem.id = MenuItemResult.rows[0].id;

}

export async function updateMenuItem(updatedMenuItem: MenuItem): Promise<void> {

    const updateMenuItemQuery = 'UPDATE menu_item SET name = $1, price_cents = $2, img_uri = $3, description = $4 WHERE id = $5';


    const updateResult = await db.query(updateMenuItemQuery, [updatedMenuItem.name, updatedMenuItem.price, updatedMenuItem.imageURI, updatedMenuItem.description, updatedMenuItem.id]);

    // Check if the update was successful
    if (updateResult.rowCount !== 1) {
        throw new Error('Error updating menu item');
    }
}

export async function deleteMenuItem(deletedMenuItem: MenuItem): Promise<void> {
    const deleteMenuItemQuery = 'DELETE FROM menu_item WHERE id = $1';

    const deleteResult = await db.query(deleteMenuItemQuery, [deletedMenuItem.id]);

    // Check if the delete was successful
    if (deleteResult.rowCount !== 1) {
        throw new Error('Error deleting menu item');
    }
}


export async function getAllMenuItemTags(){
    const getMenuItemTags = 'SELECT * FROM menu_item_tag';

    const result = await db.query(getMenuItemTags);

    return result;

}

export async function addMenuTag(MenuItem: MenuItem, newTag: string): Promise<void> {
    // restaurant_order - date, total

    const addMenuTagQuery = 'INSERT INTO menu_item_tag (menu_item_id, tag_name) VALUES ($1, $2)';


    const MenuTagResult = await db.query(addMenuTagQuery, [MenuItem.id, newTag]);
    
    if (MenuTagResult.rowCount !== 1) {
        throw new Error('Error inserting new tag');
    }
    
    

}

export async function updateMenuTag(updatedMenuItem: MenuItem, newTag: string): Promise<void> {

    const updateMenuTagQuery = 'UPDATE menu_item_tag SET menu_item_id = $1, tag_name = $2 WHERE menu_item_id = $3';


    const updateResult = await db.query(updateMenuTagQuery, [updatedMenuItem.id, newTag, updatedMenuItem.id]);

    // Check if the update was successful
    if (updateResult.rowCount !== 1) {
        throw new Error('Error updating menu item');
    }
}
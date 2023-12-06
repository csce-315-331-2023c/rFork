import InventoryItemView from "../app/(authenticated)/manager-dashboard/inventory-items/page";
import { InventoryItem } from "../types";
import db from "./index";

export async function getAllInventoryItems(): Promise<InventoryItem[]> {
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, item_name, stock, reorder_threshold) FROM inventory_item) t';

    const result = await db.query(query);

    let inventoryItems: InventoryItem[] = [];
    for (let row of result.rows) {
        const { 
            f1: id, 
            f2: item_name, 
            f3: current_qty,
            f4: reorder_threshold
        } = row.row_to_json.row;
        
        inventoryItems.push({
            id: id,
            name: item_name,
            currentStock: current_qty,
            reorderThreshold: reorder_threshold
        });
    }

    return inventoryItems;
}

export async function addInventoryItem(inventoryItem: InventoryItem): Promise<void> {

    const inventoryItemQuery = 'INSERT INTO inventory_item (id, item_name, stock, reorder_threshold) VALUES ($1, $2, $3, $4) RETURNING id';


    const inventoryItemResult = await db.query(inventoryItemQuery, [inventoryItem.id, inventoryItem.name, inventoryItem.currentStock , inventoryItem.reorderThreshold]);
    
    if (inventoryItemResult.rowCount !== 1) {
        throw new Error('Error inserting order');
    }

    inventoryItem.id = inventoryItemResult.rows[0].id;

}

export async function updateInventoryItem(updatedInventoryItem: InventoryItem): Promise<void> {

    const updateInventoryItemQuery = 'UPDATE inventory_item SET item_name = $1, stock = $2, reorder_threshold = $3 WHERE id = $4';


    const updateResult = await db.query(updateInventoryItemQuery, [updatedInventoryItem.name, updatedInventoryItem.currentStock, updatedInventoryItem.reorderThreshold, updatedInventoryItem.id]);

    // Check if the update was successful
    if (updateResult.rowCount !== 1) {
        throw new Error('Error updating menu item');
    }
}

export async function deleteInventoryItem(deletedInventoryItem: InventoryItem): Promise<void> {
    const deleteInventoryItemQuery = 'DELETE FROM inventory_item WHERE id = $1';

    const deleteResult = await db.query(deleteInventoryItemQuery, [deletedInventoryItem.id]);

    // Check if the delete was successful
    if (deleteResult.rowCount !== 1) {
        throw new Error('Error deleting menu item');
    }
}


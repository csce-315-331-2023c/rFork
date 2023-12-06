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
    // restaurant_order - date, total

    const inventoryItemQuery = 'INSERT INTO inventory_item (id, item_name, stock, reorder_threshold) VALUES ($1, $2, $3, $4) RETURNING id';


    const inventoryItemResult = await db.query(inventoryItemQuery, [inventoryItem.id, inventoryItem.name, inventoryItem.currentStock , inventoryItem.reorderThreshold]);
    
    if (inventoryItemResult.rowCount !== 1) {
        throw new Error('Error inserting order');
    }

    inventoryItem.id = inventoryItemResult.rows[0].id;

}
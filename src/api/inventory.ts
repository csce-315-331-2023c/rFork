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

export async function addInventoryItem(newItemName: string, currentStock: number, reorderThreshold: number): Promise<void>{
    const query = `
        INSERT INTO inventory_item (item_name, stock, reorder_threshold)
        VALUES ($1, $2, $3)
        RETURNING id, item_name, stock, reorder_threshold
    `;

    const values = [newItemName, currentStock, reorderThreshold];
}
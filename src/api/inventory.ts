import { InventoryItem } from "../types";
import db from "./index";

export async function getAllInventoryItems(): Promise<InventoryItem[]> {
    const query = 'SELECT (id, item_name, current_qty) FROM inventory_item';

    const result = await db.query(query);

    let inventoryItems: InventoryItem[] = [];
    for (let row of result.rows) {
        inventoryItems.push({
            id: row.id,
            name: row.item_name,
            currentStock: row.current_qty
        });
    }

    return inventoryItems;
}
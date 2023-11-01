import { InventoryItem } from "../types";
import db from "./index";

export async function getAllInventoryItems(): Promise<InventoryItem[]> {
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, item_name, current_qty) FROM inventory_item) t';

    const result = await db.query(query);

    let inventoryItems: InventoryItem[] = [];
    for (let row of result.rows) {
        const { f1: id, f2: item_name, f3: current_qty } = row.row_to_json.row;
        
        inventoryItems.push({
            id: id,
            name: item_name,
            currentStock: current_qty
        });
    }

    return inventoryItems;
}
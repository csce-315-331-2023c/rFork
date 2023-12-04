import React from 'react'
import 'dotenv/config';
import db from "./index";
import { InventoryItem, Order } from "../types";

export async function product_usage(){

}

export async function product_sales(start: Date, end: Date): Promise<Order[]>{
    const query = 'SELECT row_to_json(t) FROM (SELECT * FROM orders WHERE create_time BETWEEN $1 AND $2 ORDER BY create_time DESC) t';
    const result = await db.query(query, [start, end]);

    let orders: Order[] = [];
    for (let row of result.rows) {
        const { 
            f1: id, 
            f2: create_time, 
            f3: total,
            f4: submitted_by
        } = row.row_to_json.row;
        
        orders.push({
            id: id,
            timestamp: create_time,
            total: total,
            submittedBy: submitted_by,
            items: []
        });
    }

    return orders;
}

export async function product_excess(){

}

export async function restock_report(): Promise<InventoryItem[]>{
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, item_name, stock, reorder_threshold) FROM inventory_item WHERE stock < reorder_threshold ORDER BY id ASC) t';

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

export async function sells_together(start: Date, end: Date): Promise<Order[]>{
    
}







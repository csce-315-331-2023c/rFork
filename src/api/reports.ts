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

}

export async function sells_together(start: Date, end: Date): Promise<Order[]>{
    
}







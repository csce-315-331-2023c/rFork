import React from 'react'
import 'dotenv/config';
import db from "./index";
import { InventoryItem, MenuItem, Order } from "../types";

export async function product_usage(star: Date, end: Date): Promise<InventoryItem[]> {
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, item_name, stock, reorder_threshold) FROM inventory_item ORDER BY id ASC) t';
    return [];
}

export async function product_sales(start: Date, end: Date): Promise<Order[]> {
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, create_time, subtotal_cents, employee_id) FROM orders WHERE create_time BETWEEN $1 AND $2 ORDER BY create_time DESC) t';
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
            total: total/100,
            submittedBy: submitted_by,
            items: []
        });
    }

    return orders;
}

export async function product_excess(start: Date): Promise<InventoryItem[]> {
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, item_name, stock, reorder_threshold) FROM inventory_item WHERE ) t';
    return[];
}

export async function restock_report(): Promise<InventoryItem[]> {
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

export async function sells_together(start: Date, end: Date): Promise<Object> {
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, order_id, menu_item_id) FROM order_item) t';
    const result = await db.query(query);

    let firstMap = {};
    for (let row of result.rows) {
        const {
            f1: id,
            f2: order_id,
            f3: menu_item_id
        } = row.row_to_json.row;
        
        if((firstMap as any)[order_id + '']){
            (firstMap as any)[order_id + ''].push(menu_item_id);
        }
        else{
            (firstMap as any)[order_id + ''] = [menu_item_id];
        }
        
    }

    console.log(firstMap);
    let secondMap = {};
    for(let i = 0; i < Object.keys(firstMap).length; i++){
        const orderList = (firstMap as any)[Object.keys(firstMap)[i]];
        for(let row of orderList){
            for(let row2 of orderList){
                if(row != row2){
                    const key = row + ',' + row2;
                    if((secondMap as any)[key]){
                        (secondMap as any)[key]++;
                    }
                    else{
                        (secondMap as any)[key] = 1;
                    }
                }
            }
        }
    }

    
    return secondMap;
}







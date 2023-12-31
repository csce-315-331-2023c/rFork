import React from 'react'
import 'dotenv/config';
import db from "./index";
import { InventoryItem, MenuItem, Order, itemReport, usageReport } from "../types";

/**
 * Returns a list of usage report for every item that was used in between the start and end date, sorted by id
 * @param start start date as Date object
 * @param end end date as Date object
 * @returns list of usageReport
 */
export async function product_usage(start: Date, end: Date): Promise<usageReport[]> {
    const query = `SELECT row_to_json(t) FROM (SELECT
        i.id AS inventory_item_id,
        i.item_name,
        COUNT(oii.id) AS times_used
    FROM
        inventory_item i
    LEFT JOIN
        order_item_ingredient oii ON i.id = oii.inventory_item_id
    LEFT JOIN
        order_item oi ON oii.order_item_id = oi.id
    LEFT JOIN
        orders o ON oi.order_id = o.id
    WHERE
        o.create_time BETWEEN $1 AND $2
    GROUP BY
        i.id, i.item_name) t
    `;
    
    const result = await db.query(query, [start, end]);
    let usageReports: usageReport[] = [];
    for (let row of result.rows) {
        const {
            inventory_item_id,
            item_name,
            times_used
        } = row.row_to_json;
        usageReports.push({
            id: inventory_item_id,
            name: item_name,
            quantity: times_used,
        });
    }

    return usageReports;
}

/**
 * Returns a list of Orders within the provided dates, sorted by when the order was created
 * @param start start date as Date object
 * @param end end date as Date object
 * @returns list of Orders
 */
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

/**
 * Returns a list of all inventory items that have stock greater than the order threshold at the given date
 * @param start start date as Date object
 * @returns 
 */
export async function product_excess(start: Date): Promise<InventoryItem[]> {
    const query = `SELECT row_to_json(t) FROM (SELECT(
            i.id,
            i.item_name,
            i.stock,
            i.reorder_threshold)
        FROM
            inventory_item i
        LEFT JOIN (
            SELECT
                oii.inventory_item_id,
                SUM(oii.quantity) AS total_sold
            FROM
                order_item_ingredient oii
            JOIN
                order_item oi ON oii.order_item_id = oi.id
            JOIN
                orders o ON oi.order_id = o.id
            WHERE
                o.create_time BETWEEN $1 AND '2023-09-08 21:38:48'
            GROUP BY
                oii.inventory_item_id
        ) sold ON i.id = sold.inventory_item_id
        WHERE
            i.stock > 0 AND (COALESCE(sold.total_sold, 0) / i.stock) < 0.1) t
    `;
    
    const result = await db.query(query, [start]);
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

/**
 * Returns a list of inventory items that have a current stock below the reorder threshold
 * @returns list of InventoryItem
 */
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

/**
 * Returns a list of item reports sorted by the number of items ordered together (in the same order)
 * @param start start date as Date object
 * @param end end date as Date object
 * @returns 
 */
export async function sells_together(start: Date, end: Date): Promise<itemReport[]> {
    const query = `SELECT row_to_json(t) FROM(
        SELECT DISTINCT 
            least(order_item.menu_item_id, t1.menu_item_id) AS id1,
            greatest(order_item.menu_item_id, t1.menu_item_id) AS id2, (count(*)/2) AS count
        FROM
            (SELECT order_item.id, order_item.order_id, order_item.menu_item_id
        FROM order_item
        INNER JOIN orders ON order_item.order_id = orders.id
        WHERE create_time BETWEEN $1 AND $2) AS t1
        INNER JOIN order_item ON t1.order_id = order_item.order_id
        WHERE t1.id != order_item.id AND t1.menu_item_id != order_item.menu_item_id
        GROUP BY id1, id2
        ORDER BY count DESC) t  
    `;
    const result = await db.query(query, [start, end]);
    // inner join orders with order_item
    // inner join above with order_item again on orderid is the same
    // where id.1 != id.2 & order_id2 == order_id1
    // select least(id1, id2), greatest(id1, id2), count(*)/2 AS count

    const itemQuery = 'SELECT row_to_json(t) FROM (SELECT (id, name) FROM menu_item) t';
    const itemResult = await db.query(itemQuery);

    let itemMap: Map<number, string> = new Map();
    for(let row of itemResult.rows){
        const{f1: id, f2: name} = row.row_to_json.row; 
        itemMap.set(id, name); 
    }

    let itemReports: itemReport[] = [];
    for (let row of result.rows){

        const {
            id1,
            id2,
            count,
        } = row.row_to_json;

        itemReports.push({
            id1: id1,
            id2: id2,
            name1: itemMap.get(id1) || 'NA',
            name2: itemMap.get(id2) || 'NA',
            quantity: count,
        });
    }

    return itemReports;
}






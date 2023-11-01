import { Order } from "../types";
import db from "./index";

export async function submitOrder(order: Order): Promise<void> {
    // restaurant_order - date, total
    const orderQuery = 'INSERT INTO restaurant_order (create_time, subtotal_cents) VALUES ($1, $2) RETURNING id';

    const orderResult = await db.query(orderQuery, [order.date, order.total * 100]);
    if (orderResult.rowCount !== 1) {
        throw new Error('Error inserting order');
    }

    order.id = orderResult.rows[0].id;

    // menu_item_orders - order id, menu item id
    const menuItemOrders = order.items.map(item => [order.id, item.id]);

    const menuItemOrderQuery = `INSERT INTO menu_item_orders(order_id, menu_item_id) VALUES ${
        menuItemOrders.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`).join(', ')
    } RETURNING id`;

    const menuItemOrderResult = await db.query(menuItemOrderQuery, menuItemOrders.flat());
    if (menuItemOrderResult.rowCount !== order.items.length) {
        throw new Error('Error inserting menu item orders');
    }

    for (let i = 0; i < menuItemOrderResult.rowCount; i++) {
        order.items[i].id = menuItemOrderResult.rows[i].id;
    }

    // menu_item_order_ingredients - menu item order id, inventory item id, quantity

    const ingredientOrders = order.items.flatMap(item => item.ingredients.map(ing => [item.id, ing.inventoryId, ing.quantity]));

    const menuItemOrderIngredientQuery = `
        INSERT INTO menu_item_order_ingredients (menu_item_order_id, item_id, qty_used) VALUES ${
            ingredientOrders.map((_, i) => `($${3 * i + 1}, $${3 * i + 2}, $${3 * i + 3})`).join(', ')
        }
        RETURNING id
    `;

    const menuItemOrderIngredientResult = await db.query(menuItemOrderIngredientQuery, ingredientOrders.flat());
    if (menuItemOrderIngredientResult.rowCount !== ingredientOrders.length) {
        throw new Error('Error inserting menu item order ingredients');
    }
}
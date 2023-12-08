import { Ingredient, Order } from "../types";
import db from "./index";

/**
 * Inserts an order into the order database, finds appropriate items to insert into order_items database,
 * and also inserts needed ingredients into order_item_ingredients database
 * @param order The order of the customer
 * @returns void
 */
export async function submitOrder(order: Order): Promise<void> {
    console.log(order);
    try {
        // restaurant_order - date, total
        const orderQuery = 'INSERT INTO orders (create_time, subtotal_cents, employee_id, is_finished) VALUES ($1, $2, $3, $4) RETURNING id';

        let employeeId: number | undefined;
        if ('id' in order.submittedBy) {
            employeeId = order.submittedBy.id;
        }

        const totalCentsString = (order.total * 100).toFixed(0);

        const orderResult = await db.query(orderQuery, [order.timestamp, totalCentsString, employeeId, false]);
        if (orderResult.rowCount !== 1) {
            throw new Error('Error inserting order');
        }

        order.id = orderResult.rows[0].id;

        if (order.items.length === 0) {
            return;
        }

        // menu_item_orders - order id, menu item id
        const menuItemOrders = order.items.map(item => [order.id, item.id]);

        const menuItemOrderQuery = `INSERT INTO order_item(order_id, menu_item_id) VALUES ${
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

        type ingredientsAndExtra = Ingredient & { isValidExtra: boolean };
        let ingredientsAndExtras: ingredientsAndExtra[] = [];
        for (let item of order.items) {
            for (let ingredient of item.ingredients) {
                ingredientsAndExtras.push({
                    ...ingredient,
                    isValidExtra: false
                });
            }

            for (let extra of item.validExtras) {
                ingredientsAndExtras.push({
                    ...extra,
                    isValidExtra: true
                });
            }
        }
        const ingredientOrders = order.items.flatMap(item => ingredientsAndExtras.map(ing => [item.id, ing.itemId, ing.quantity, ing.isValidExtra]));

        const menuItemOrderIngredientQuery = `
            INSERT INTO order_item_ingredient (order_item_id, inventory_item_id, quantity, is_extra) VALUES ${
                ingredientOrders.map((_, i) => `($${4 * i + 1}, $${4 * i + 2}, $${4 * i + 3}, $${4 * i + 4})`).join(', ')
            } RETURNING id`;

        const menuItemOrderIngredientResult = await db.query(menuItemOrderIngredientQuery, ingredientOrders.flat());
        if (menuItemOrderIngredientResult.rowCount !== ingredientOrders.length) {
            throw new Error('Error inserting menu item order ingredients');
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 * Returns a list of all orders in the orders database, sorted by id
 * @returns list of Order
 */
export async function getAll(): Promise<Order[]>{
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, create_time, subtotal_cents, tip_cents, employee_id, is_finished) FROM orders WHERE is_finished is not null ORDER by id DESC) t';
    const result = await db.query(query);

    let orders: Order[] = [];
    for (let row of result.rows) {
        const {
            f1: id,
            f2: create_time,
            f3: subtotal,
            f4: tip,
            f5: employee_id,
            f6: is_finished
        } = row.row_to_json.row;

        orders.push({
            id: id,
            timestamp: create_time,
            total: (subtotal + tip)/100,
            submittedBy: employee_id,
            items: [],
            isFinished: is_finished
        });
    }

    return orders;
}

/**
 * Returns a list of all orders from the orders database, where is_finished is false
 * @returns list of Order
 */
export async function getNotFinished(): Promise<Order[]>{
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, create_time, subtotal_cents, tip_cents, employee_id, is_finished) FROM orders WHERE is_finished = false ORDER by id DESC) t';
    const result = await db.query(query);

    let orders: Order[] = [];
    for (let row of result.rows) {
        console.log(row);
        const {
            f1: id,
            f2: create_time,
            f3: subtotal,
            f4: tip,
            f5: employee_id,
            f6: is_finished
        } = row.row_to_json.row;

        orders.push({
            id: id,
            timestamp: create_time,
            total: (subtotal + tip)/100,
            submittedBy: employee_id,
            items: [],
            isFinished: is_finished
        });
    }

    return orders;
}
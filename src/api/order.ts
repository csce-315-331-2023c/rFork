import { Order } from "../types";

export async function submitOrder(order: Order): Promise<void> {
    // restaurant_order - id, date, total

    // menu_item_orders - id, order id, menu item id

    // menu_item_order_ingredients - id, menu item order id, inventory item id, quantity
}
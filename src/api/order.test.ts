import db from './index';
import { submitOrder } from './index';

afterAll(async () => {
    await db.end();
});

describe('submitOrder', () => {
    it('should submit an order', async () => {
        const order = {
            date: new Date(),
            total: 100,
            items: [
                {
                    id: 1,
                    name: 'Cheeseburger',
                    price: 10,
                    ingredients: [
                        {
                            inventoryId: 1,
                            name: 'Bun',
                            quantity: 1
                        },
                        {
                            inventoryId: 2,
                            name: 'Beef Patty',
                            quantity: 1
                        },
                        {
                            inventoryId: 3,
                            name: 'Cheese',
                            quantity: 1
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Fries',
                    price: 5,
                    ingredients: [
                        {
                            inventoryId: 4,
                            name: 'Potato',
                            quantity: 1
                        }
                    ]
                }
            ]
        };

        await submitOrder(order);
    });
});
import db from './index';
import { submitOrder } from './index';

afterAll(async () => {
    await db.end();
});

describe('submitOrder', () => {
    it('should submit an order', async () => {
        const order = {
            timestamp: new Date(),
            total: 100,
            items: [
                {
                    id: 1,
                    name: 'Cheeseburger',
                    price: 10,
                    ingredients: [
                        {
                            itemId: 1,
                            itemName: 'Bun',
                            quantity: 1
                        },
                        {
                            itemId: 2,
                            itemName: 'Beef Patty',
                            quantity: 1
                        },
                        {
                            itemId: 3,
                            itemName: 'Cheese',
                            quantity: 1
                        }
                    ],
                    validExtras: [
                        {
                            itemId: 3,
                            itemName: 'Cheese',
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
                            itemId: 4,
                            itemName: 'Potato',
                            quantity: 1
                        }
                    ],
                    validExtras: []
                }
            ],
            submittedBy: {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                role: 'Employee'
            }
        };

        await submitOrder(order);
    });
});
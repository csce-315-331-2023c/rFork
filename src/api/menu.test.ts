import db from './index';
import { getAllMenuItems } from './menu';

afterAll(async () => {
    await db.end();
});

describe('getAllMenuItems', () => {
    it('should return all menu items', async () => {
        const result = await getAllMenuItems();

        expect(result).not.toHaveLength(0);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('name');
        expect(result[0]).toHaveProperty('price');
        expect(result[0]).toHaveProperty('ingredients');
        expect(result[0].ingredients[0]).toHaveProperty('inventoryId');
        expect(result[0].ingredients[0]).toHaveProperty('name');
        expect(result[0].ingredients[0]).toHaveProperty('quantity');
    });
});
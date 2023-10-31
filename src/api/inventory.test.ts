import db from './index';
import { getAllInventoryItems } from './inventory';

afterAll(async () => {
    await db.end();
});

describe('getAllInventoryItems', () => {
    it('should return all inventory items', async () => {
        const result = await getAllInventoryItems();

        expect(result).not.toHaveLength(0);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('name');
        expect(result[0]).toHaveProperty('currentStock');
    });
});


import db from './index';
import { getAllMenuItems, getMenuItemByTag } from './menu';

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
        expect(result[0].ingredients[0]).toHaveProperty('itemId');
        expect(result[0].ingredients[0]).toHaveProperty('itemName');
        expect(result[0].ingredients[0]).toHaveProperty('quantity');

        console.log(result[0]);
    });
});

describe('getMenuItemByTag', () => {
    it('should return a menu item by id', async () => {
        const result = await getMenuItemByTag("");

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('price');
        expect(result).toHaveProperty('ingredients');

        console.log(result);
    });
});
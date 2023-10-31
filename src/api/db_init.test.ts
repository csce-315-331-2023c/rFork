import 'dotenv/config';

import { initDatabase } from './db_init';

describe('db_init', () => {
    it('should initialize the database connection', async () => {
        const client = await initDatabase();
        expect(client).toBeDefined();
        if (client) {
            await client.end();
        }
    });
});
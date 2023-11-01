import db from './index';

afterAll(async () => {
    await db.end();
});

test('should initialize the database connection', async () => {
    try {
        const res = await db.query('SELECT NOW()');
        expect(res.rows).toHaveLength(1);
    } catch (err) {
        fail('Database connection failed: ' + err);
    }
});
import { Client } from 'pg';

export const initDatabase = async (): Promise<Client | undefined> => {
    if (!process.env.DB_URI) {
        throw new Error('DB_URI is not set!');
    }

    const client = new Client({
        connectionString: process.env.DB_URI,
    });

    try {
        await client.connect();
        const res = await client.query('SELECT NOW()');
        return client;
    } catch (err) {
        console.error('Error connecting to database:', err);
        return undefined;
    }
};
import 'dotenv/config';

if (process.env.NODE_ENV === 'development') {
    console.warn('Running in development mode!');
}

import { Client } from 'pg';

const client = new Client({
    connectionString: process.env.DB_URI,
});

client.connect().catch((err) => {
    console.error(`Failed to connect to database: ${err}`);
    process.exit(1);
});

export default client;

// export everything so that it can be imported from a single file
export { getAllInventoryItems } from './inventory';
export { getAllMenuItems } from './menu';
export { submitOrder } from './order';
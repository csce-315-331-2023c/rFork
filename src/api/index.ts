import dotenv from 'dotenv';
dotenv.config();

if (process.env.NODE_ENV === 'development') {
    console.warn('Running in development mode!');
}

import { initDatabase } from './db_init';

// this runs when the file is first imported, no need to explicitly invoke it
export const db = initDatabase();
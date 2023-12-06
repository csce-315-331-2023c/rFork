import { Employee } from "../types";
import db from "./index";

export async function findEmployee(lastName: string, firstName: string): Promise<Employee | null> {
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, first_name, last_name, is_manager) FROM employee WHERE last_name = $1 AND first_name = $2) t';

    const result = await db.query(query, [lastName, firstName]);

    if (result.rows.length === 0) {
        return null;
    }

    const { 
        f1: id, 
        f2: first_name, 
        f3: last_name,
        f4: role
    } = result.rows[0].row_to_json.row;

    return {
        id: id,
        firstName: first_name,
        lastName: last_name,
        role: role === true ? 'manager' : 'employee'
    };
}
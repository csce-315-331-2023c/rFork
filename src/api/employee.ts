import { Employee } from "../types";
import db from "./index";

/**
 * Returns an Employee object from the database with matching information based on first and last name, 
 * returns null if names don't match
 * @param lastName Employee lastName
 * @param firstName Employee firstName
 * @returns 
 */
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

export async function getEmployees(): Promise<Employee[]>{
    const query = 'SELECT row_to_json(t) FROM (SELECT (id, first_name, last_name, is_manager) FROM employee ORDER BY id ASC) t';
    const result = await db.query(query);

    const employees: Employee[] = [];
    for(let row of result.rows){
        const {
            f1: id,
            f2: first_name,
            f3: last_name,
            f4: role
        } = row.row_to_json.row;

        employees.push({
            id: id,
            firstName: first_name,
            lastName: last_name,
            role: role === true ? 'manager' : 'employee'
        });
    }   

    return employees;
}
import { NextRequest, NextResponse } from "next/server";
import { findEmployee, getEmployees } from "../../../../api/employee";

/**
 * 
 * @param request 
 * @returns 
 */
export async function GET(req: NextRequest) {
    const firstname = req.nextUrl.searchParams.get('firstname');
    const lastname = req.nextUrl.searchParams.get('lastname');

    if (firstname && lastname) {
        const employee = await findEmployee(lastname, firstname);
        return NextResponse.json(employee);
    }
    const employees = await getEmployees();
    return NextResponse.json(employees);
}

export async function PATCH(req: NextRequest) {
    
}
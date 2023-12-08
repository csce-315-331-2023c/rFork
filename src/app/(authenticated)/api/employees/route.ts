import { NextRequest, NextResponse } from "next/server";
import { createEmployee, deleteEmployee, findEmployee, getEmployees, updateEmployee } from "../../../../api/employee";

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

export async function POST(req: NextRequest) {
    await createEmployee();
    return NextResponse.json({ message: "success" });
}

export async function PATCH(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    const firstname = req.nextUrl.searchParams.get('firstname');
    const lastname = req.nextUrl.searchParams.get('lastname');
    const role = req.nextUrl.searchParams.get('role');

    if (id && firstname && lastname && role) {
        await updateEmployee(lastname, firstname, parseInt(id), role);
    }
    return NextResponse.json({ message: "success" });
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');
    await deleteEmployee(parseInt(id));
    return NextResponse.json({ message: "success" });
}
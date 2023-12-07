import { NextRequest, NextResponse } from "next/server";
import { getEmployees } from "../../../../api/employee";

/**
 * 
 * @param request 
 * @returns 
 */
export async function GET(request: NextRequest) {
    const employees = await getEmployees();
    return NextResponse.json(employees);
}
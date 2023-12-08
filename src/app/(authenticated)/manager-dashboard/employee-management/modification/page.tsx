'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Employee } from '../../../../../types';
import AuthSessionHeader from '../../../../../components/AuthSessionHeader';
import "../../../../../css/index.css";
import 'bootstrap/dist/css/bootstrap.css'
import PageLoading from '../../../../../components/PageLoading';
import { Dropdown } from 'react-bootstrap';

export default function page() {
    const firstName = useSearchParams().get("firstname");
    const lastName = useSearchParams().get("lastname");
    const [employee, setEmployee] = useState<Employee>({ firstName: "unloaded", lastName: "unloaded", role: "employee" });
    const [loading, setLoading] = useState<boolean>(true);

    const [newFirstName, setNewFirstName] = useState<string>("");
    const [newLastName, setNewLastName] = useState<string>("");
    const [newRole, setNewRole] = useState<"employee" | "manager">("employee");

    useEffect(() => {
        fetch(`/api/employees?firstname=${firstName}&lastname=${lastName}`).then((res) => res.json()).then((data) => {
            if (data) {
                setEmployee(data);
                setNewFirstName(data.firstName);
                setNewLastName(data.lastName);
                setNewRole(data.role)
            }
            setLoading(false);
        });
    }, []);

    if (loading) return <PageLoading />

    return (
        <div>
            <AuthSessionHeader />
            <div className='px-2'>
                <div className="py-2">
                    <h1 className='text-2xl'>Employee ID Number (Not Editable)</h1>
                    <p>
                        {employee.id}
                    </p>
                </div>
                <div className="py-2">
                    <h1 id='google-translate-element' className='text-2xl'>First Name</h1>
                    <input className='border-black border-2 p-1' defaultValue={employee.firstName} onChange={(userInput) => { setNewFirstName(userInput.target.value) }} />
                </div>
                <div className="py-2">
                    <h1 id='google-translate-element' className='text-2xl'>Last Name</h1>
                    <input className='border-black border-2 p-1' defaultValue={employee.lastName} onChange={(userInput) => { setNewLastName(userInput.target.value) }} />
                </div>
                <div className='py-2'>
                    <h1 id='google-translate-element' className='text-2xl'>Role</h1>
                    <Dropdown>
                        <Dropdown.Toggle variant='Warning' className='border text-black'>
                            {newRole}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setNewRole("employee") }} >Employee</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setNewRole("manager") }} >Manager</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

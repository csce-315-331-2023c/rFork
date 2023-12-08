'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Employee } from '../../../../../types';
import AuthSessionHeader from '../../../../../components/AuthSessionHeader';
import "../../../../../css/index.css";
import 'bootstrap/dist/css/bootstrap.css'
import PageLoading from '../../../../../components/PageLoading';
import { Dropdown } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import TextButton from '../../../../../components/TextButton';

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
        <div className='h-screen'>
            <AuthSessionHeader />
            <div className='flex flex-row space-x-6 h-full w-full'>
                <div className='px-2'>
                    <button aria-label='Back to previous page' onClick={() => { location.replace("/manager-dashboard/employee-management") }} className='py-4 flex flex-row space-x-2 items-center'>
                        <FaArrowLeft />
                        <p>
                            Back to Previous Page
                        </p>
                    </button>
                    <div className="py-2">
                        <h1 id='google-translate-element' className='text-2xl'>Employee ID Number</h1>
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
                <div className='h-[50%] w-[20%] flex flex-col space-y-10 py-4'>
                    <TextButton
                        text='Save Changes'
                        color='#00FF00'
                        onPress={async () => {
                            await fetch(`/api/employees?id=${employee.id}&firstname=${newFirstName}&lastname=${newLastName}&role=${newRole}`, { method: "PATCH" });
                            location.replace("/manager-dashboard/employee-management");
                        }}
                    />
                    <TextButton
                        text='DELETE USER'
                        color='#F00F00'
                        onPress={async () => {
                            await fetch(`/api/employees?id=${employee.id}`, { method: "DELETE" })
                            location.replace("/manager-dashboard/employee-management");
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

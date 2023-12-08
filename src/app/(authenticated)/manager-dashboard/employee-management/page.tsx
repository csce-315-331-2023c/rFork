'use client'
import React, { useEffect, useState } from 'react';
import AuthSessionHeader from '../../../../components/AuthSessionHeader';
import "../../../../css/index.css";
import { Employee } from '../../../../types';
import TextButton from '../../../../components/TextButton';
import Popup from '../../../../components/Popup';
import PageLoading from '../../../../components/PageLoading';
import 'bootstrap/dist/css/bootstrap.css'

export default function page() {
    const [employees, setEmployees] = useState<Array<Employee>>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        fetch("/api/employees").then((res) => res.json()).then((data) => {
            setEmployees(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <PageLoading />;

    return (
        <div className='h-screen overflow-y-scroll'>
            <AuthSessionHeader />
            <div className='flex flex-col items-center w-full'>
                <button
                    id='google-translate-element'
                    className='rounded-lg bg-amber-400 hover:bg-amber-200 p-2'
                    onClick={() => {
                        fetch("/api/employees", { method: "POST" }).then(() => {
                            fetch("/api/employees").then((res) => res.json()).then((data) => {
                                setEmployees(data);
                            });
                        })
                    }}
                >
                    Add Employee
                </button>
                <table className='w-[80%] mt-4'>
                    <thead>
                        <tr>
                            <th className='border bg-gray-200'>ID</th>
                            <th className='border bg-gray-200'>Employee Name</th>
                            <th className='border bg-gray-200'>Role</th>
                            <th className='border bg-gray-200'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee, index) =>
                                <tr>
                                    <td className='border'>{employee.id}</td>
                                    <td className='border'>{`${employee.firstName} ${employee.lastName}`}</td>
                                    <td className='border'>{employee.role}</td>
                                    <td className='border flex flex-col space-y-4 py-4'>
                                        <TextButton
                                            text='Modify User'
                                            color='#FFCF30'
                                            hoverColor='#EEE'
                                            onPress={() => {
                                                location.replace(`/manager-dashboard/employee-management/modification?firstname=${employee.firstName}&lastname=${employee.lastName}`)
                                            }}
                                        />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

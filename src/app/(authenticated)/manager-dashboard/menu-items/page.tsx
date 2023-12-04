'use client'
import { CChart } from '@coreui/react-chartjs'
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import Table from '../../../../components/Table';


export default function InventoryItemView() {

    return (
        <div>
            <header className='h-[10%] w-full flex flex-row items-center justify-start px-6 py-2 bg-[#d6e3ff]'></header>
            <Table
                dataType='menu-items'
                backgroundColor='rgb(130,233,199)'
            />
            
        </div>

    )
}


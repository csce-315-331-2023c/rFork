import React from 'react'
import {Dropdown} from 'react-bootstrap'
import {Languages} from "../types"
import {translatePage} from "../api/translate"

export default function DropDownMenu({options}: {options: Object}) {
    const optionsArray = Object.keys(options);
    return(
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Translate
            </Dropdown.Toggle>
    
            <Dropdown.Menu>
                {optionsArray.map((option) => (
                    <Dropdown.Item key = {option} onClick = {() => translatePage(option)}>
                        {option}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
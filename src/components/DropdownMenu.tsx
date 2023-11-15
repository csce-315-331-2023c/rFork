import React from 'react'
import {Dropdown} from 'react-bootstrap'
import {Languages} from "../types"
import {translatePage} from "../api/external/translate/translate"

export default function DropdownMenu(options: Languages) {
    const optionsArray = Object.values(options);
    return(
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Translate
            </Dropdown.Toggle>
    
            <Dropdown.Menu>
                {optionsArray.map((option, index) => (
                    <Dropdown.Item key = {index} onClick = {() => translatePage(option)}>
                        {option}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
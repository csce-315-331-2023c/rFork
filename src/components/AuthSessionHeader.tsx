
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.css'
import { Languages } from "../types";
import { IoLanguageOutline } from "react-icons/io5";
import { IoIosExit } from "react-icons/io";
import { translatePage } from "../api/translate";

/**
 * Launches the authenticator to check if a user is an employee before displaying the page
 */
export default function AuthSessionHeader() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn('google');
        }
    }, [status])

    const [language, setLanguage] = useState<string>('en');

    useEffect(() => {
        translatePage(language);
    }, [language]);

    if (status == "authenticated") {
        return (
            <nav className="bg-slate-300" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px 5px" }}>
                <button aria-label="Home Page" aria-description="Button to go back to home page" onClick={() => location.replace("/")}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaArrowLeft />
                        <div id="google-translate-element" style={{ marginLeft: "5px" }}>Back to Home Screen</div>
                    </div>
                </button>
                <div className="flex flex-row space-x-10">
                    <Dropdown className='hover:bg-[#3333]'>
                        <Dropdown.Toggle id='google-translate-element'>Language</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                Object.keys(Languages).map((language) => {
                                    return (
                                        <Dropdown.Item key={language} onClick={() => {
                                            if (language == "English") {
                                                location.reload();
                                            }
                                            setLanguage((Languages as any)[language]);
                                        }}>
                                            {language}
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="flex-col flex items-center">
                        <div>Signed in as <strong>{session.user?.name}</strong></div>
                        <button aria-label="Sign Out" aria-description="Button to sign out and return to home page." onClick={() => signOut({ callbackUrl: '/' })}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <IoIosExit />
                                <div style={{ marginLeft: "5px" }}>Sign Out</div>
                            </div>
                        </button>
                    </div>
                </div>
            </nav >
        )
    } else {
        return <></>
    }
}
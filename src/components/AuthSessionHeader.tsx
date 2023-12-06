import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

import { FaArrowLeft } from "react-icons/fa";

export default function AuthSessionHeader() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn('google');
        }
    }, [status])

    if (status == "authenticated") {
        return (
            <nav className="h-6 bg-slate-300" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px 5px" }}>
                <button onClick={() => signOut({ callbackUrl: '/' })}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FaArrowLeft />
                        <div style={{ marginLeft: "5px" }}>Sign Out</div>
                    </div>
                </button>
                <div>Signed in as <strong>{session.user?.name}</strong></div>
            </nav>
        )
    } else {
        return <></>
    }
}
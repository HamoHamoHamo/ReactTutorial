import React from "react";


function AppLayout({ children }) {
    
    return (
        <>
            <div style={{
                display: "flex",
                width: "100vw",
                justifyContent: "center",
                height: "100vh",
                alignItems: "center",
                fontSize: "24px"
            }}>
            {children}
            </div>
        </>
    )
}

export default AppLayout;
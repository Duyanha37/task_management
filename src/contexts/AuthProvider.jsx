import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const getAccessToken = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/accounts/refresh", {
                method: "POST",
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Access token refreshed");
                setAccessToken(data.accesstoken);
            }
        } catch (error) {
            console.error("Error fetching access token:", error);
        }
    };

        getAccessToken();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const getAccessToken = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/token", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setAccessToken(data.accessToken);
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
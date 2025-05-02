import { useState } from "react";
import { login, signup } from "../api/authService";

export const useAuth = () => {
    const [user, setUser] = useState<{ email: string } | null>();

    const signupUser = async (name: string,email: string, password: string) => {
        const res = await signup({ name, email, password });

        localStorage.setItem("token", res.token);
        setUser({ email });
    }

    const loginUser = async (email: string ,password: string) => {
        const res = await login({ email, password });

        localStorage.setItem("token", res.token);
        setUser({ email });
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return {
        user,
        signupUser,
        loginUser,
        logoutUser,
    };
};
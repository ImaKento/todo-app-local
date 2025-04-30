import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

interface JWTPayload {
    exp: number;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode<JWTPayload>(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }
    } catch (erro) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    return children
}
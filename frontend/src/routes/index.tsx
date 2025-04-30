import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Sinup";
import Home from "@/pages/Home";
import { PrivateRoute } from "./PrivateRoute";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />}/>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
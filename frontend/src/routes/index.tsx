import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SinupPage";
import TodoPage from "@/pages/TodoPage"
import { PrivateRoute } from "./PrivateRoute";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />}/>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <TodoPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
const BASE_USR = "http://localhost:8080/api/users"

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface SignupResponse {
    token: string;
}

export const login = async (params: LoginRequest): Promise<LoginResponse> => {
    const res = await fetch(BASE_USR + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
    }

    return await res.json();
}

export const signup = async (params: SignupRequest): Promise<SignupResponse> => {
    const res = await fetch(BASE_USR + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Signup failed");
    }

    return await res.json();
}
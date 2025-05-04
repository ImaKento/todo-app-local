import { z } from "zod";
import { loginParamsSchema, signupParamsSchema, authResponseSchema } from "../schemas/authSchema"

const BASE_USR = "http://localhost:8080/api/users"

export const login = async (params: z.infer<typeof loginParamsSchema>): Promise<z.infer<typeof authResponseSchema>> => {
    const res = await fetch(`${BASE_USR}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "ログインに失敗しました")
    }

    const json = await res.json()
    const parsed = authResponseSchema.safeParse(json)
    if (!parsed.success) {
        throw new Error("APIのレスポンスが不正です")
    }
    return parsed.data;
}

export const signup = async (params: z.infer<typeof signupParamsSchema>): Promise<z.infer<typeof authResponseSchema>> => {
    const res = await fetch(`${BASE_USR}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });
    if (!res.ok) {
        const error = await res.json();
        if (res.status === 409) {
            throw new Error("そのメールアドレスは既に使用されています")
        }
        throw new Error(error.message || "サインアップに失敗しました");
    }

    const json = await res.json()
    const parsed = authResponseSchema.safeParse(json)
    if (!parsed.success) {
        throw new Error("APIのレスポンスが不正です")
    }
    return parsed.data;
}
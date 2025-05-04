import { z } from "zod";

export const loginParamsSchema = z.object({
    email: z.string().email("正しいメールアドレスを入力してください"),
    password: z.string().min(8, "パスワードは8文字以上必要です")
})

export const signupParamsSchema = z.object({
    name: z.string().min(1, "名前は必須項目です"),
    email: z.string().email("正しいメールアドレスを入力してください"),
    password: z.string().min(8, "パスワードは8文字以上必要です")
});

export const authResponseSchema = z.object({
    token: z.string(),
})
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginParamsSchema, signupParamsSchema } from "../schemas/authSchema"
import { login, signup } from "../service/authService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { z } from "zod";

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginParamsSchema),
    })

    const onSubmit = async (input: z.infer<typeof loginParamsSchema>) => {
        try {
            const result = await login(input)
            localStorage.setItem("access-token", result.token)
            navigate("/")
        } catch (err) {
            setError("ログインに失敗しました")
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        error,
    }
}

export const useSignup = () => {
    const [error, setError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupParamsSchema),
    })

    const onSubmit = async (input: z.infer<typeof signupParamsSchema>) => {
        try {
            const results = await signup(input)
            localStorage.setItem("access-token", results.token)
            navigate("/")
        } catch (err) {
            if (err instanceof Error && err.message.includes("メールアドレス")) {
                setEmailError(err.message)
              } else {
                setEmailError(null)
                setError("サインアップに失敗しました")
              }
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        error,
        emailError,
    }
}

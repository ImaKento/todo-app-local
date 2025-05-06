import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useSignup } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export const SignupForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
    const { register, handleSubmit, errors, isSubmitting, onSubmit, error, emailError } = useSignup()

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                <CardTitle className="text-xl">Get productive!</CardTitle>
                <CardDescription>
                Create an account to manage your tasks
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Name</Label>
                                <Input 
                                    id="name"
                                    type="name"
                                    placeholder="Full name"
                                    required
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                {/* 2. サーバーエラー（emailに限定） */}
                                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    required 
                                    {...register("password")}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            {error && <p className="text-red-600 text-sm">{error}</p>}
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isSubmitting ? "Signing up..." : "Sign up"}
                            </Button>
                        </div>
                        <div className="text-center text-sm">
                            Do you already have an account?{" "}
                            <Link to="/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
                </CardContent>
            </Card>
        </div>
    )
}

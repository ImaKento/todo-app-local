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
import { Link } from "react-router-dom";
import { useLogin } from "@/features/auth/hooks/useAuth"

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
    const { register, handleSubmit, errors, isSubmitting, onSubmit, error } = useLogin()

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back!</CardTitle>
                <CardDescription>
                    Login with your account
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                        <div className="grid gap-6">
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
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required {...register("password")}/>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            {error && <p className="text-red-600 text-sm">{error}</p>}
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="underline underline-offset-4">
                            Sign up
                            </Link>
                        </div>
                    </div>
                </form>
                </CardContent>
            </Card>
        </div>
    )
}

"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {GithubIcon, Loader} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useTransition} from "react";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";

// ----------------------------------------------------------------------

export function LoginForm() {
    const [githubPendding, startGithubTransition] = useTransition();

    async function signInWithGithub() {
        startGithubTransition(async () => {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed in with GitHub, you will be redirected...");
                    },
                    onError: (error) => {
                        toast.error("Internal Server Error");
                    }
                }
            });
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">
                    Welcome Back !
                </CardTitle>
                <CardDescription>
                    Login with your Github email account
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <Button
                    disabled={githubPendding}
                    onClick={signInWithGithub}
                    className="w-full"
                    variant="outline"
                >
                    {githubPendding ? (
                        <>
                            <Loader className="size-4 animate-spin"/>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <GithubIcon className="size-4"/>
                            Sign in with GitHub
                        </>
                    )}
                </Button>

                <div
                    className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
                >
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>

                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" placeholder="m@exemple.com"/>
                    </div>

                    <Button>Continue with email</Button>
                </div>

            </CardContent>
        </Card>
    );
}

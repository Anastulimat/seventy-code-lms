"use client";

import {ThemeToggle} from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

// ----------------------------------------------------------------------

export default function Home() {
    const {
        data: session,
    } = authClient.useSession();

    const router = useRouter();

    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    toast.success("Logout successfully");
                },
            },
        });
    }

    return (
        <div className="p-24">
            <h1>Hello</h1>
            <ThemeToggle/>
            {session
                ? (
                    <div>
                        <p>{session.user.name}</p>
                        <Button onClick={signOut}>Logout</Button>
                    </div>
                )
                    : (
                        <Button>
                            Login
                        </Button>
                )
            }
        </div>
    );
}

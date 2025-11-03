import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowLeftIcon, ShieldXIcon} from "lucide-react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

export default function NotAdmin() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="bg-destructive/10 rounded-full p-4 wfit mx-auto">
                        <ShieldXIcon className="size-16 text-destructive"/>
                    </div>
                    <CardTitle className="text-2xl">
                        Access restricted
                    </CardTitle>
                    <CardDescription className="max-w-xs mx-auto">
                        Hey! You&apos;re not an admin, you&apos;re not allowed to do this operation
                    </CardDescription>
                </CardHeader>

                <CardContent className="text-center">
                    <Link href="/" className={buttonVariants({
                        className: "w-full",
                    })}>
                        <ArrowLeftIcon className="size-4 mr-1"/>
                        Back to home
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

import {ReactNode} from 'react';
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";

// ----------------------------------------------------------------------

export default function AuthLayout({children}: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center">
            <Link href="/" className={buttonVariants({
                variant: 'outline',
                className: 'absolute top-4 left-4',
            })}>
                <ArrowLeftIcon className="size-4"/>
                Back
            </Link>

            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link href="/" className="flex items-center self-center gap-2 font-medium">
                    SeventyCode LMS.
                </Link>
                {children}

                <div className="text-balance text-center text-xs text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <span className="hover:text-primary hover:underline hover:cursor-pointer">
                        Terms of service
                    </span>{" "}
                    and{" "}
                    <span className="hover:text-primary hover:underline hover:cursor-pointer">
                        Privacy policy
                    </span>.
                </div>
            </div>
        </div>
    );
}

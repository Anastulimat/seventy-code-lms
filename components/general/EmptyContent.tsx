import {BanIcon, PlusCircleIcon} from "lucide-react";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

// ----------------------------------------------------------------------

interface iAppProps {
    title: string;
    description: string;
    buttonText: string;
    href: string;
}

// ----------------------------------------------------------------------

export function EmptyContent({title, description, buttonText, href}: iAppProps) {
    return (
        <div
            className="flex flex-col flex-1 items-center justify-center h-full rounded-md border-dashed border p-8 text-center animate-in fade-in-50"
        >
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                <BanIcon className="size-12 text-primary"/>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-muted-foreground">
                {title}
            </h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
                {description}
            </p>
            <Link href={href} className={buttonVariants()}>
                <PlusCircleIcon className="size-4 mr-2"/>
                {buttonText}
            </Link>
        </div>
    )
}

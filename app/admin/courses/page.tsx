import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";

// ----------------------------------------------------------------------

export default function CoursesPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your courses</h1>

                <Link href="/admin/courses/create" className={buttonVariants()}>
                    <PlusIcon/>
                    Create new course
                </Link>
            </div>

            <div>
                <h1>Here you will see all of the courses</h1>
            </div>
        </>
    )
}


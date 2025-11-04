import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {adminGetCourses} from "@/app/data/admin/admin-get-courses";
import {AdminCourseCard} from "@/app/admin/courses/_components/AdminCourseCard";

// ----------------------------------------------------------------------

export default async function CoursesPage() {
    const data = await adminGetCourses();

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your courses</h1>

                <Link href="/admin/courses/create" className={buttonVariants()}>
                    Create new course
                    <PlusIcon/>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
                {data.map((course) => (
                    <AdminCourseCard key={course.id} data={course}/>
                ))}
            </div>
        </>
    )
}


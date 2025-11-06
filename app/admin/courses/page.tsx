import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {adminGetCourses} from "@/app/data/admin/admin-get-courses";
import {AdminCourseCard} from "@/app/admin/courses/_components/AdminCourseCard";
import {EmptyContent} from "@/components/general/EmptyContent";

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

            {data.length === 0 ? (
                <EmptyContent
                    title="No courses found"
                    description="Create your first course to get started"
                    buttonText="Create course"
                    href="/admin/courses/create"
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
                    {data.map((course) => (
                        <AdminCourseCard key={course.id} data={course}/>
                    ))}
                </div>
            )}
        </>
    )
}


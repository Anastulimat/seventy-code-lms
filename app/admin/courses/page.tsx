import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {adminGetCourses} from "@/app/data/admin/admin-get-courses";
import {AdminCourseCard} from "@/app/admin/courses/_components/AdminCourseCard";
import {EmptyContent} from "@/components/general/EmptyContent";
import {Suspense} from "react";
import {AdminCourseCardSkeleton} from "@/app/admin/courses/_components/AdminCourseCardSkeleton";

// ----------------------------------------------------------------------

export default function CoursesPage() {

    function AdminCourseGridSkeleton({count = 6}: { count?: number }) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
                {Array.from({length: count}).map((_, i) => (
                    <AdminCourseCardSkeleton key={i}/>
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your courses</h1>

                <Link href="/admin/courses/create" className={buttonVariants()}>
                    Create new course
                    <PlusIcon/>
                </Link>
            </div>

            <Suspense fallback={<AdminCourseGridSkeleton/>}>
                <RenderCourses/>
            </Suspense>
        </>
    );
}

async function RenderCourses() {
    const data = await adminGetCourses();

    return (
        <>
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


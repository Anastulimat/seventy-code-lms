import {getAllCourses} from "@/app/data/course/get-all-courses";
import {CourseCard} from "@/app/(public)/_components/CourseCard";
import {CourseCardSkeleton} from "@/components/general/CourseCardSkeleton";
import {Suspense} from "react";

// ----------------------------------------------------------------------

export default function Courses() {
    return (
        <div className="mt-5">
            <div className="flex flex-col space-y-2 mb-10">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
                    Explore courses
                </h1>
                <p className="text-muted-foreground">
                    Discover our wide range of courses designed to help you achieve your learning goals
                </p>
            </div>

            <Suspense fallback={<CourseGridSkeleton/>}>
                <RenderCourses/>
            </Suspense>
        </div>
    )
}

async function RenderCourses() {
    const courses = await getAllCourses();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <CourseCard data={course} key={course.id}/>
            ))}
        </div>
    );
}

function CourseGridSkeleton({count = 6}: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length: count}).map((_, i) => (
                <CourseCardSkeleton key={i}/>
            ))}
        </div>
    );
}

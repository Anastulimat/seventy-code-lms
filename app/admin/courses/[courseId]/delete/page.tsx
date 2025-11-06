"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {tryCatch} from "@/hooks/try-catch";
import {toast} from "sonner";
import {useTransition} from "react";
import {deleteCourse} from "@/app/admin/courses/[courseId]/delete/actions";
import {useParams, useRouter} from "next/navigation";

// ----------------------------------------------------------------------

// TODO: refactor this page and replace it with a modal
export default function DeleteCourseRoute() {
    const [isPending, startTransition] = useTransition();
    const {courseId} = useParams<{ courseId: string }>();
    const router = useRouter();

    function onSubmit() {
        startTransition(async () => {
            const {data: result, error} = await tryCatch(deleteCourse(courseId));

            if (error) {
                toast.error('An unexpected error occurred. Please try again later.');
                return
            }

            if (result?.status === 'success') {
                toast.success(result.message);
                router.push('/admin/courses');
            } else if (result?.status === 'error') {
                toast.error(result.message);
            }
        });
    }


    return (
        <div className="max-w-xl mx-auto w-full">
            <Card className="mt-32">
                <CardHeader>
                    <CardTitle>
                        Are you sure you want to delete this course?
                    </CardTitle>
                    <CardDescription>
                        This action cannot be undone. This will permanently delete the course and all its data.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex items-center justify-between">
                    <Link
                        href="/admin/courses"
                        className={buttonVariants({variant: "outline"})}
                    >
                        Cancel
                    </Link>

                    <Button
                        variant="destructive"
                        className="ml-2"
                        onClick={onSubmit}
                        disabled={isPending}
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )

}

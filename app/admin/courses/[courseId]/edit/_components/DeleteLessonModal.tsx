import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {Trash2Icon} from "lucide-react";
import {tryCatch} from "@/hooks/try-catch";
import {deleteLesson} from "@/app/admin/courses/[courseId]/edit/actions";
import {toast} from "sonner";

// ----------------------------------------------------------------------

export function DeleteLessonModal(
    {
        chapterId,
        courseId,
        lessonId,
    }: {
        chapterId: string;
        courseId: string;
        lessonId: string;
    }
) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    async function onSubmit() {
        startTransition(async () => {
            const {data: result, error} = await tryCatch(deleteLesson({chapterId, courseId, lessonId}));

            if (error) {
                toast.error('An unexpected error occurred. Please try again later.');
                return;
            }

            if (result?.status === 'success') {
                toast.success(result.message);
                setOpen(false);
            } else if (result?.status === 'error') {
                toast.error(result.message);
            }
        });
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash2Icon className="size-4"/>
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this lesson?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the lesson and remove it from your
                        course.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <Button variant="destructive" onClick={onSubmit} disabled={isPending}>
                        {isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

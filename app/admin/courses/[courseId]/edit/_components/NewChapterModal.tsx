import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {chapterSchema, ChapterSchemaType} from "@/lib/zodSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {tryCatch} from "@/hooks/try-catch";
import {createChapter} from "@/app/admin/courses/[courseId]/edit/actions";
import {toast} from "sonner";

// ----------------------------------------------------------------------

export function NewChapterModal({courseId}: { courseId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<ChapterSchemaType>({
        resolver: zodResolver(chapterSchema) as never,
        defaultValues: {
            title: "",
            courseId: courseId
        }
    });

    async function onSubmit(values: ChapterSchemaType) {
        startTransition(async () => {
            const {data: result, error} = await tryCatch(createChapter(values));

            if (error) {
                toast.error('An unexpected error occurred. Please try again later.');
                return;
            }

            if (result?.status === 'success') {
                toast.success(result.message);
                form.reset();
                setIsOpen(false);
            } else if (result?.status === 'error') {
                toast.error(result.message);
            }
        });
    }

    function handleOpenChange(open: boolean) {
        setIsOpen(open);
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <PlusIcon className="size-4"/>
                    New Chapter
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new chapter</DialogTitle>
                    <DialogDescription>
                        What would you like to name this chapter?
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Chapter name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? 'Creating...' : 'Create'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}

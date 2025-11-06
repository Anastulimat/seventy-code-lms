"use client";

import {AdminLessonType} from "@/app/data/admin/admin-get-lesson";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {Button, buttonVariants} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form"; // ← Enlevez Form ici
import {zodResolver} from "@hookform/resolvers/zod";
import {lessonSchema, LessonSchemaType} from "@/lib/zodSchemas";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"; // ← Form vient de @/components/ui/form
import {Input} from "@/components/ui/input";
import {RichTextEditor} from "@/components/rich-text-editor/Editor";
import {Uploader} from "@/components/file-uploader/Uploader";

// ----------------------------------------------------------------------

interface iAppProps {
    data: AdminLessonType;
    chapterId: string;
    courseId: string;
}

// ----------------------------------------------------------------------

export function LessonForm({data, chapterId, courseId}: iAppProps) {

    const form = useForm<LessonSchemaType>({
        resolver: zodResolver(lessonSchema),
        defaultValues: {
            title: data.title,
            description: data.description ?? undefined,
            thumbnailKey: data.videoKey ?? undefined,
            videoKey: data.videoKey ?? undefined,
            chapterId: chapterId,
            courseId: courseId,
        }
    });

    return (
        <div>
            <Link
                className={buttonVariants({variant: "outline", className: "mb-4"})}
                href={`/admin/courses/${courseId}/edit`}
            >
                <ArrowLeftIcon className="size-4"/>
                <span>Go back</span>
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Lesson configuration
                    </CardTitle>
                    <CardDescription>
                        Configure the video and description of the lesson.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Lesson name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Lesson name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <RichTextEditor field={field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="thumbnailKey"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Thumbnail image</FormLabel>
                                        <FormControl>
                                            <Uploader
                                                onChange={field.onChange}
                                                value={field.value}
                                                fileTypeAccepted="image"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="videoKey"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Video file</FormLabel>
                                        <FormControl>
                                            <Uploader
                                                onChange={field.onChange}
                                                value={field.value}
                                                fileTypeAccepted="video"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                            >
                                Save changes
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

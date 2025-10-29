"use client";

import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {courseSchema, CourseSchemaType} from "@/lib/zodSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

// ----------------------------------------------------------------------

export default function CreateCoursePage() {

    const form = useForm<CourseSchemaType>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            description: "",
            fileKey: "",
            price: 0,
            duration: 0,
            level: "Beginner",
            category: "",
            status: "Draft",
            slug: "",
            smallDescription: ""
        }
    });

    function onSubmit(values: CourseSchemaType) {
        console.log(values);
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <Link href="/admin/courses" className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                })}>
                    <ArrowLeftIcon className="size-4"/>
                </Link>
                <h1 className="text-2xl font-bold">Create a new course</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Basic Information
                    </CardTitle>
                    <CardDescription>
                        Provide basic information about the course.
                    </CardDescription>

                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

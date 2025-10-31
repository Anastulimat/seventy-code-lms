"use client";

import Link from "next/link";
import {ArrowLeftIcon, PlusIcon, SparkleIcon} from "lucide-react";
import {Button, buttonVariants} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {courseCategories, courseLevels, courseSchema, CourseSchemaType, courseStatus} from "@/lib/zodSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import slugify from "slugify";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {RichTextEditor} from "@/components/rich-text-editor/Editor";
import {Uploader} from "@/components/file-uploader/Uploader";

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
            category: "Cybersecurity",
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4 items-end">
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Slug" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <Button type="button" className="w-fit" onClick={() => {
                                    const titleValue = form.getValues("title");
                                    const slug = slugify(titleValue);
                                    form.setValue('slug', slug, {shouldValidate: true});
                                }}>
                                    Generate slug <SparkleIcon className="ml-1" size={16}/>
                                </Button>
                            </div>

                            <FormField
                                control={form.control}
                                name="smallDescription"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Small Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="min-h-[120px]"
                                                placeholder="Small Description"
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
                                    <FormItem className="w-full">
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
                                name="fileKey"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Thumbnail image</FormLabel>
                                        <FormControl>
                                            <Uploader/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Category"/>
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    {courseCategories.map((category) => (
                                                        <SelectItem value={category} key={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="level"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Level</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Value"/>
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    {courseLevels.map((level) => (
                                                        <SelectItem value={level} key={level}>
                                                            {level}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Duration (hours)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Duration"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Price ($)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Price"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="status"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select status"/>
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {courseStatus.map((status) => (
                                                    <SelectItem value={status} key={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">
                                Create course <PlusIcon className="ml-1" size={16}/>
                            </Button>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

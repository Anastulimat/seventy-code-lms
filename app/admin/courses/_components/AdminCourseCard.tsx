import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {AdminCourseType} from "@/app/data/admin/admin-get-courses";
import {useConstructUrl} from "@/hooks/use-construct-url";
import Link from "next/link";
import {ArrowRightIcon, EyeIcon, MoreVerticalIcon, PencilIcon, SchoolIcon, TimerIcon, Trash2Icon} from "lucide-react";
import {Button, buttonVariants} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// ----------------------------------------------------------------------

interface iAppProps {
    data: AdminCourseType
}

// ----------------------------------------------------------------------

export function AdminCourseCard({data}: iAppProps) {

    const thumbnailUrl = useConstructUrl(data.fileKey);

    return (
        <Card className="group relative py-0 gap-0">
            {/* Absolute dropdown */}
            <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <MoreVerticalIcon className="size-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${data.id}/edit`}>
                                <PencilIcon className="size-4 mr-1"/>
                                Edit course
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${data.slug}`}>
                                <EyeIcon className="size-4 mr-1"/>
                                Preview
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator/>

                        <DropdownMenuItem
                            asChild
                            className="group cursor-pointer transition-colors"
                        >
                            <Link
                                href={`/admin/courses/${data.id}/delete`}
                                className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
                            >
                                <Trash2Icon
                                    className="size-4 mr-1 text-red-600 group-hover:text-red-700 dark:text-red-400 dark:group-hover:text-red-300 transition-colors"
                                />
                                Delete
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Image
                src={thumbnailUrl}
                alt="Thumbnail"
                width={600}
                height={400}
                className="w-full rounded-t-lg aspect-video object-cover h-full"
            />

            <CardContent className="p-4">
                <Link
                    href={`/admin/courses/${data.id}`}
                    className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
                >
                    {data.title}
                </Link>
                <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
                    {data.smallDescription}
                </p>

                <div className="mt-4 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-2">
                        <TimerIcon className="size-6 p-1 rounded-md textprimary bg-primary/10"/>
                        <p className="text-sm text-muted-foreground">
                            {data.duration}h
                        </p>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <SchoolIcon className="size-6 p-1 rounded-md textprimary bg-primary/10"/>
                        <p className="text-sm text-muted-foreground">
                            {data.level}
                        </p>
                    </div>
                </div>

                <Link
                    href={`/admin/courses/${data.id}/edit`}
                    className={buttonVariants({
                        className: "mt-4 w-full",
                    })}
                >
                    Edit course <ArrowRightIcon className="size-4"/>
                </Link>
            </CardContent>
        </Card>
    )
}


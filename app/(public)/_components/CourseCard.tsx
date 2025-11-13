import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {CourseType} from "@/app/data/course/get-all-courses";
import Image from "next/image";
import {useConstructUrl} from "@/hooks/use-construct-url";
import Link from "next/link";
import {SchoolIcon, TimerIcon} from "lucide-react";
import {buttonVariants} from "@/components/ui/button";

// ----------------------------------------------------------------------

interface iAppProps {
    data: CourseType,
}

// ----------------------------------------------------------------------

export function CourseCard({data}: iAppProps) {
    const thumbnailUrl = useConstructUrl(data.fileKey);

    return (
        <Card className="group relative py-0 gap-0">
            <Badge className="absolute top-2 right-2 z-10">
                {data.level}
            </Badge>
            <Image
                src={thumbnailUrl}
                alt="Thumbnail Image of the course"
                width={600}
                height={400}
                className="w-full rounded-t-xl aspect-video object-cover h-full"
            />

            <CardContent className="p-4">
                <Link
                    href={`/courses/${data.slug}`}
                    className={`font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors`}
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
                            {data.category}
                        </p>
                    </div>
                </div>

                <Link
                    href={`/courses/${data.slug}`}
                    className={buttonVariants({
                        className: "mt-4 w-full",
                    })}
                >
                    Learn more
                </Link>
            </CardContent>
        </Card>
    );
}

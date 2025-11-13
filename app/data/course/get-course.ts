import {prisma} from "@/lib/prisma";
import {notFound} from "next/navigation";

// ----------------------------------------------------------------------

export async function getCourse(slug: string) {
    const course = await prisma.course.findUnique({
        where: {
            slug: slug,
        },
        select: {
            id: true,
            title: true,
            description: true,
            smallDescription: true,
            duration: true,
            level: true,
            price: true,
            status: true,
            fileKey: true,
            category: true,
            chapter: {
                select: {
                    id: true,
                    title: true,
                    lessons: {
                        select: {
                            id: true,
                            title: true,
                        },
                        orderBy: {
                            position: "asc"
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                },
            }
        }
    });

    if (!course) {
        return notFound();
    }

    return course;
}

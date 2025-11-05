import 'server-only';
import {requireAdmin} from "@/app/data/admin/require-admin";
import {prisma} from "@/lib/prisma";
import {notFound} from "next/navigation";

// ----------------------------------------------------------------------

export async function adminGetCourse(id: string) {
    await requireAdmin();

    const data = await prisma.course.findUnique({
        where: {
            id: id,
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
            slug: true,
            category: true,
            chapter: {
                select: {
                    id: true,
                    title: true,
                    position: true,
                    lessons: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            thumbnailKey: true,
                            position: true,
                            videoKey: true,
                        }
                    }
                }
            },
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export type AdminCoursSingularType = Awaited<ReturnType<typeof adminGetCourse>>;

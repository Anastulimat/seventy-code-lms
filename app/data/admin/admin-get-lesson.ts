import {requireAdmin} from "@/app/data/admin/require-admin";
import {prisma} from "@/lib/prisma";
import {notFound} from "next/navigation";

// ----------------------------------------------------------------------

export async function adminGetLesson(lessonId: string) {
    await requireAdmin();

    const data = await prisma.lesson.findUnique({
        where: {
            id: lessonId,
        },
        select: {
            id: true,
            title: true,
            description: true,
            thumbnailKey: true,
            videoKey: true,
            position: true,
        }
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;

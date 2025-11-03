import {requireAdmin} from "@/app/data/admin/require-admin";
import {prisma} from "@/lib/prisma";

// ----------------------------------------------------------------------

export async function adminGetCourses() {
    await requireAdmin();

    const data = await prisma.course.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            title: true,
            smallDescription: true,
            duration: true,
            level: true,
            price: true,
            status: true,
            fileKey: true,
            slug: true,
        }
    });

    return data;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0];

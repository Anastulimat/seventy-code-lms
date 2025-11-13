import {prisma} from "@/lib/prisma";

// ----------------------------------------------------------------------

export async function getAllCourses() {
    await new Promise(resolve => setTimeout(resolve, 10000));
    return prisma.course.findMany({
        where: {
            status: "Published",
        },
        select: {
            title: true,
            price: true,
            smallDescription: true,
            slug: true,
            fileKey: true,
            id: true,
            level: true,
            duration: true,
            category: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}

export type CourseType = Awaited<ReturnType<typeof getAllCourses>>[0];

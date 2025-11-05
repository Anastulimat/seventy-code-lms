"use server";

import {requireAdmin} from "@/app/data/admin/require-admin";
import {ApiResponse} from "@/lib/types";
import {courseSchema, CourseSchemaType} from "@/lib/zodSchemas";
import {prisma} from "@/lib/prisma";

// ----------------------------------------------------------------------

export async function editCourses(data: CourseSchemaType, courseId: string): Promise<ApiResponse> {
    const user = await requireAdmin();

    try {
        const result = courseSchema.safeParse(data);
        if (!result.success) {
            return {
                status: "error",
                message: "Invalid data",
            }
        }

        await prisma.course.updateMany({
            where: {
                id: courseId,
                userId: user.user.id
            },
            data: {
                ...result.data,
            }
        });

        return {
            status: "success",
            message: "Course updated successfully",
        }

    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to update course",
        }
    }
}

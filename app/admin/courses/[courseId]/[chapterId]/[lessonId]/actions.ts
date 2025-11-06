"use server";

import {requireAdmin} from "@/app/data/admin/require-admin";
import {ApiResponse} from "@/lib/types";
import {lessonSchema, LessonSchemaType} from "@/lib/zodSchemas";
import {prisma} from "@/lib/prisma";

// ----------------------------------------------------------------------

export async function updateLesson(values: LessonSchemaType, lessonId: string): Promise<ApiResponse> {
    await requireAdmin();

    try {
        const result = lessonSchema.safeParse(values);
        if (!result.success) {
            return {
                status: "error",
                message: "Invalid lesson data",
            };
        }

        await prisma.lesson.update({
            where: {
                id: lessonId,
            },
            data: {
                title: result.data.title,
                description: result.data.description,
                videoKey: result.data.videoKey,
                thumbnailKey: result.data.thumbnailKey,
            }
        });

        return {
            status: "success",
            message: "Lesson updated successfully",
        };

    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to update lesson",
        };
    }
}

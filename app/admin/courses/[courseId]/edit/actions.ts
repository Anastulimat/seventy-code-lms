"use server";

import {requireAdmin} from "@/app/data/admin/require-admin";
import {ApiResponse} from "@/lib/types";
import {courseSchema, CourseSchemaType} from "@/lib/zodSchemas";
import {prisma} from "@/lib/prisma";
import arcjet, {detectBot, fixedWindow} from "@/lib/arcjet";
import {request} from "@arcjet/next";

// ----------------------------------------------------------------------

const aj = arcjet.withRule(
    detectBot({
        mode: 'LIVE',
        allow: []
    }),
).withRule(
    fixedWindow({
        mode: 'LIVE',
        window: "1m",
        max: 10
    })
);

// ----------------------------------------------------------------------

export async function editCourses(data: CourseSchemaType, courseId: string): Promise<ApiResponse> {
    const user = await requireAdmin();

    try {
        const req = await request();
        const decision = await aj.protect(req, {
            fingerprint: user?.user.id,
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return {
                    status: "error",
                    message: "You have been blocked due to too many requests"
                };
            } else {
                return {
                    status: "error",
                    message: "Suspicious activity detected"
                };
            }
        }

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

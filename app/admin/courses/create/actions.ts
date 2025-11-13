"use server";

import {courseSchema, CourseSchemaType} from "@/lib/zodSchemas";
import {prisma} from "@/lib/prisma";
import {ApiResponse} from "@/lib/types";
import {requireAdmin} from "@/app/data/admin/require-admin";
import arcjet, {fixedWindow} from "@/lib/arcjet";
import {request} from "@arcjet/next";

// ----------------------------------------------------------------------

const aj = arcjet.withRule(
    fixedWindow({
        mode: 'LIVE',
        window: "1m",
        max: 10
    })
);

// ----------------------------------------------------------------------

export const createCourse = async (values: CourseSchemaType): Promise<ApiResponse> => {
    const session = await requireAdmin();

    try {
        const req = await request();
        const decision = await aj.protect(req, {
            fingerprint: session?.user.id,
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

        const validation = courseSchema.safeParse(values);
        if (!validation.success) {
            return {
                status: "error",
                message: "Invalid course data"
            };
        }

        await prisma.course.create({
            data: {
                ...validation.data,
                userId: session?.user.id as string,
            }
        });

        return {
            status: "success",
            message: "Course created successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to create course",
        };
    }
};

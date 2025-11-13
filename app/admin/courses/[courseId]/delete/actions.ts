"use server";

import {requireAdmin} from "@/app/data/admin/require-admin";
import {ApiResponse} from "@/lib/types";
import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
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

export async function deleteCourse(courseId: string): Promise<ApiResponse> {
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

        await prisma.course.delete({
            where: {
                id: courseId,
            },
        });

        revalidatePath("/admin/courses");

        return {
            status: "success",
            message: "Course deleted successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to delete course",
        };
    }
}

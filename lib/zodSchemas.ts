import {z} from "zod";

// ----------------------------------------------------------------------

export const courseLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;
export const courseStatus = ['Draft', 'Published', 'Archived'] as const;
export const courseCategories = [
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Sales',
    'Human Resources',
    'Management',
    'Finance',
    'Data Science',
    'AI/ML',
    'Cybersecurity',
    'Software Engineering',
    'IT Support',
    'Education',
    'Healthcare',
    'Arts and Crafts',
] as const;

// ----------------------------------------------------------------------

export const courseSchema = z.object({
    title: z
        .string()
        .min(3, {message: "Title must be at least 3 characters long."})
        .max(100, {message: "Title cannot exceed 100 characters."}),

    description: z
        .string()
        .min(3, {message: "Description must be at least 3 characters long."}),

    fileKey: z
        .string()
        .min(1, {message: "A course file must be uploaded."}),

    price: z.coerce
        .number()
        .min(1, {message: "Price must be at least $1."}),

    duration: z.coerce
        .number()
        .min(1, {message: "Duration must be at least 1 hour."})
        .max(500, {message: "Duration cannot exceed 500 hours."}),

    level: z.enum(courseLevels, {
        message: "Invalid course level. Must be Beginner, Intermediate, or Advanced.",
    }),

    category: z.enum(courseCategories, {message: "Category is required."}),

    smallDescription: z
        .string()
        .min(3, {message: "Short description must be at least 3 characters long."})
        .max(200, {message: "Short description cannot exceed 200 characters."}),

    slug: z
        .string()
        .min(3, {message: "Slug must be at least 3 characters long."}),

    status: z.enum(courseStatus, {
        message: "Invalid course status. Must be Draft, Published, or Archived.",
    }),
});

export const chapterSchema = z.object({
    title: z
        .string()
        .min(3, {message: "Title must be at least 3 characters long."})
        .max(150, {message: "Title cannot exceed 150 characters."}),

    courseId: z.uuid({
        message: "Invalid course ID.",
    }),
});

export const lessonSchema = z.object({
    title: z
        .string()
        .min(3, {message: "Title must be at least 3 characters long."})
        .max(150, {message: "Title cannot exceed 150 characters."}),

    description: z
        .string()
        .min(3, {message: "Description must be at least 3 characters long."})
        .max(1000, {message: "Description cannot exceed 1000 characters."})
        .optional(),

    thumbnailKey: z
        .string()
        .optional(),

    videoKey: z
        .string()
        .optional(),

    courseId: z.uuid({
        message: "Invalid course ID.",
    }),

    chapterId: z.uuid({
        message: "Invalid chapter ID.",
    }),
})

// ----------------------------------------------------------------------

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;


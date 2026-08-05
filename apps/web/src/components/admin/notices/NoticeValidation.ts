import { z } from "zod";

export const NoticeSchema = z.object({

    title: z.string().min(5),

    slug: z.string().min(3),

    summary: z.string().min(20),

    content: z.string().min(50),

    status: z.enum([
        "DRAFT",
        "REVIEW",
        "PUBLISHED",
        "ARCHIVED",
    ]),

    featured: z.boolean(),
});

export type NoticeFormValues =
    z.infer<typeof NoticeSchema>;

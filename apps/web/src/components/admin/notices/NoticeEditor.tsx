"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    NoticeSchema,
    NoticeFormValues,
} from "./NoticeValidation";

import { NoticeContentEditor } from "./NoticeContentEditor";
import { NoticePublishPanel } from "./NoticePublishPanel";
import { NoticeSEO } from "./NoticeSEO";
import { NoticeMediaPicker } from "./NoticeMediaPicker";

interface Props {
    defaultValues?: Partial<NoticeFormValues>;
    onSubmit: (values: NoticeFormValues) => Promise<void>;
}

export function NoticeEditor({
    defaultValues,
    onSubmit,
}: Props) {

    const form = useForm<NoticeFormValues>({
        resolver: zodResolver(NoticeSchema),

        defaultValues: {
            title: "",
            slug: "",
            summary: "",
            content: "",
            featured: false,
            status: "DRAFT",
            ...defaultValues,
        },
    });

    return (

        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-8 lg:grid-cols-3"
        >

            {/* Main Content */}

            <div className="space-y-6 lg:col-span-2">

                <div>

                    <label>Title</label>

                    <Input
                        {...form.register("title")}
                    />

                </div>

                <div>

                    <label>Slug</label>

                    <Input
                        {...form.register("slug")}
                    />

                </div>

                <div>

                    <label>Summary</label>

                    <textarea
                        {...form.register("summary")}
                        className="w-full rounded-md border p-3"
                        rows={4}
                    />

                </div>

                <NoticeContentEditor
                    value={form.watch("content")}
                    onChange={(value) =>
                        form.setValue("content", value)
                    }
                />

            </div>

            {/* Sidebar */}

            <div className="space-y-6">

                <NoticePublishPanel
                    form={form}
                />

                <NoticeMediaPicker
                    form={form}
                />

                <NoticeSEO
                    form={form}
                />

                <Button
                    type="submit"
                    className="w-full"
                >
                    Save Notice
                </Button>

            </div>

        </form>

    );

}

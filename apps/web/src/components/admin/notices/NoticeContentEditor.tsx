"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

import { EditorToolbar } from "./EditorToolbar";

interface Props {
    value: string;
    onChange(value: string): void;
}

export function NoticeContentEditor({
    value,
    onChange,
}: Props) {

    const editor = useEditor({

        extensions: [

            StarterKit,

            Underline,

            Highlight,

            Link.configure({
                openOnClick: false,
            }),

            Image,

            Placeholder.configure({
                placeholder:
                    "Start writing your notice...",
            }),

            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
            }),

        ],

        content: value,

        immediatelyRender: false,

        onUpdate({ editor }) {

            onChange(
                editor.getHTML()
            );

        },

    });

    if (!editor)
        return null;

    return (

        <div className="rounded-xl border">

            <EditorToolbar
                editor={editor}
            />

            <EditorContent
                editor={editor}
                className="
                    min-h-[500px]
                    p-6
                    prose
                    max-w-none
                "
            />

        </div>

    );

}

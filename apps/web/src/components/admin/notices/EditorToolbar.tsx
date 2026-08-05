"use client";

import type { Editor } from "@tiptap/react";

import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Quote,
    Code,
    Heading1,
    Heading2,
    Undo,
    Redo,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    editor: Editor;
}

export function EditorToolbar({
    editor,
}: Props) {

    return (

        <div className="flex flex-wrap gap-2 border-b p-2">

            <Button
                size="icon"
                variant={
                    editor.isActive("bold")
                        ? "default"
                        : "outline"
                }
                onClick={() =>
                    editor.chain().focus().toggleBold().run()
                }
            >
                <Bold className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant={
                    editor.isActive("italic")
                        ? "default"
                        : "outline"
                }
                onClick={() =>
                    editor.chain().focus().toggleItalic().run()
                }
            >
                <Italic className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant={
                    editor.isActive("underline")
                        ? "default"
                        : "outline"
                }
                onClick={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
            >
                <Underline className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant="outline"
                onClick={() =>
                    editor.chain().focus().toggleHeading({
                        level: 1,
                    }).run()
                }
            >
                <Heading1 className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant="outline"
                onClick={() =>
                    editor.chain().focus().toggleHeading({
                        level: 2,
                    }).run()
                }
            >
                <Heading2 className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant="outline"
                onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                <List className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant="outline"
                onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
            >
                <ListOrdered className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant="outline"
                onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                }
            >
                <Quote className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant="outline"
                onClick={() =>
                    editor.chain().focus().toggleCodeBlock().run()
                }
            >
                <Code className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant="outline"
                onClick={() =>
                    editor.chain().focus().undo().run()
                }
            >
                <Undo className="h-4 w-4"/>
            </Button>

            <Button
                size="icon"
                variant="outline"
                onClick={() =>
                    editor.chain().focus().redo().run()
                }
            >
                <Redo className="h-4 w-4"/>
            </Button>

        </div>

    );

}

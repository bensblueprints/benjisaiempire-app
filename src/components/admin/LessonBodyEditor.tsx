"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";

const toolbarButton: React.CSSProperties = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: ".06em",
  padding: "6px 10px",
  background: "transparent",
  color: "var(--cream-soft)",
  border: "1px solid transparent",
  borderRadius: 3,
  cursor: "pointer",
};

const activeBtn: React.CSSProperties = {
  ...toolbarButton,
  color: "var(--gold)",
  borderColor: "var(--gold)",
  background: "rgba(212,175,55,.08)",
};

function ToolbarBtn({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      style={active ? activeBtn : toolbarButton}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span style={{ width: 1, alignSelf: "stretch", background: "var(--line)", margin: "0 4px" }} />;
}

function Toolbar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        padding: "8px 10px",
        borderBottom: "1px solid var(--line)",
        background: "var(--ink-2)",
        position: "sticky",
        top: 72,
        zIndex: 10,
      }}
    >
      <ToolbarBtn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">B</ToolbarBtn>
      <ToolbarBtn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><em>I</em></ToolbarBtn>
      <ToolbarBtn active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">{`< >`}</ToolbarBtn>
      <Divider />
      <ToolbarBtn active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</ToolbarBtn>
      <ToolbarBtn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarBtn>
      <ToolbarBtn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarBtn>
      <Divider />
      <ToolbarBtn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>UL</ToolbarBtn>
      <ToolbarBtn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>OL</ToolbarBtn>
      <ToolbarBtn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo; &rdquo;</ToolbarBtn>
      <ToolbarBtn active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code</ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</ToolbarBtn>
      <Divider />
      <ToolbarBtn
        active={editor.isActive("link")}
        onClick={() => {
          const previous = editor.getAttributes("link").href ?? "";
          const url = window.prompt("Link URL", previous);
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
      >
        Link
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => {
          const url = window.prompt("Image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
      >
        Image
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn onClick={() => editor.chain().focus().undo().run()}>Undo</ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().redo().run()}>Redo</ToolbarBtn>
    </div>
  );
}

export default function LessonBodyEditor({
  initialContent,
  onChange,
}: {
  initialContent: unknown;
  onChange: (json: unknown) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
    ],
    content: (initialContent as never) ?? { type: "doc", content: [{ type: "paragraph" }] },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "lesson-prose",
        style: "min-height: 480px; padding: 28px 32px; outline: none; max-width: 100%;",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => () => { editor?.destroy(); }, [editor]);

  if (!editor) {
    return (
      <div
        style={{
          minHeight: 480,
          background: "var(--ink-2)",
          border: "1px solid var(--line)",
          borderRadius: 6,
          padding: 28,
          color: "var(--cream-soft)",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 12,
        }}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--ink-2)",
        border: "1px solid var(--line)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

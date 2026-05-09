// Server-side TipTap JSON → React renderer.
// Handles the node and mark types we ship from the admin TipTap editor.
import * as React from "react";

type Mark = {
  type: string;
  attrs?: Record<string, unknown>;
};

type Node = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: Node[];
  text?: string;
  marks?: Mark[];
};

function applyMarks(text: string, marks: Mark[] | undefined, key: string): React.ReactNode {
  if (!marks || marks.length === 0) return text;
  return marks.reduce<React.ReactNode>((acc, mark, i) => {
    const k = `${key}-m${i}`;
    switch (mark.type) {
      case "bold":
        return <strong key={k}>{acc}</strong>;
      case "italic":
        return <em key={k}>{acc}</em>;
      case "code":
        return <code key={k}>{acc}</code>;
      case "underline":
        return <u key={k}>{acc}</u>;
      case "strike":
        return <s key={k}>{acc}</s>;
      case "link": {
        const href = (mark.attrs?.href as string) ?? "#";
        const target = (mark.attrs?.target as string) ?? undefined;
        return (
          <a
            key={k}
            href={href}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
          >
            {acc}
          </a>
        );
      }
      default:
        return acc;
    }
  }, text);
}

function renderChildren(content: Node[] | undefined, keyPrefix: string): React.ReactNode {
  if (!content) return null;
  return content.map((node, i) => renderNode(node, `${keyPrefix}-${i}`));
}

function renderNode(node: Node, key: string): React.ReactNode {
  switch (node.type) {
    case "doc":
      return <React.Fragment key={key}>{renderChildren(node.content, key)}</React.Fragment>;

    case "paragraph":
      return <p key={key}>{renderChildren(node.content, key)}</p>;

    case "heading": {
      const level = Math.min(Math.max(Number(node.attrs?.level ?? 2), 1), 3) as 1 | 2 | 3;
      const Tag = (`h${level}` as unknown) as keyof React.JSX.IntrinsicElements;
      return <Tag key={key}>{renderChildren(node.content, key)}</Tag>;
    }

    case "bulletList":
      return <ul key={key}>{renderChildren(node.content, key)}</ul>;

    case "orderedList": {
      const start = Number(node.attrs?.start ?? 1);
      return (
        <ol key={key} start={start}>
          {renderChildren(node.content, key)}
        </ol>
      );
    }

    case "listItem":
      return <li key={key}>{renderChildren(node.content, key)}</li>;

    case "codeBlock": {
      const lang = (node.attrs?.language as string) || undefined;
      return (
        <pre key={key} data-lang={lang}>
          <code className={lang ? `language-${lang}` : undefined}>
            {renderChildren(node.content, key)}
          </code>
        </pre>
      );
    }

    case "blockquote":
      return <blockquote key={key}>{renderChildren(node.content, key)}</blockquote>;

    case "hardBreak":
      return <br key={key} />;

    case "horizontalRule":
      return <hr key={key} />;

    case "image": {
      const src = (node.attrs?.src as string) ?? "";
      const alt = (node.attrs?.alt as string) ?? "";
      const title = (node.attrs?.title as string) ?? undefined;
      return <img key={key} src={src} alt={alt} title={title} loading="lazy" />;
    }

    case "text": {
      return (
        <React.Fragment key={key}>
          {applyMarks(node.text ?? "", node.marks, key)}
        </React.Fragment>
      );
    }

    default:
      // Unknown node — render its children if any.
      if (node.content) {
        return <React.Fragment key={key}>{renderChildren(node.content, key)}</React.Fragment>;
      }
      return null;
  }
}

export function RenderTiptap({ doc }: { doc: unknown }) {
  const isEmpty =
    !doc ||
    (typeof doc === "object" &&
      doc !== null &&
      ((doc as Node).type === "doc"
        ? !((doc as Node).content && (doc as Node).content!.length > 0)
        : false));

  if (isEmpty) {
    return (
      <div className="lesson-prose">
        <p style={{ color: "var(--cream-soft)" }}>
          (No content yet — admin will fill this in.)
        </p>
      </div>
    );
  }

  return <div className="lesson-prose">{renderNode(doc as Node, "root")}</div>;
}

export default RenderTiptap;

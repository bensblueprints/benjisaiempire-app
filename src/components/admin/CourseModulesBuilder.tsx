"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import ModuleForm from "@/components/admin/ModuleForm";
import DeleteButton from "@/components/admin/DeleteButton";
import {
  createModule,
  updateModule,
  deleteModule,
  reorderModules,
  createLesson,
  deleteLesson,
  createModuleDownload,
  deleteModuleDownload,
} from "@/app/admin/_actions";

const FILE_TYPES = ["PDF", "ZIP", "MP3", "MP4", "DOCX", "XLSX", "PNG", "JPG", "Other"];

const inp: React.CSSProperties = {
  padding: "8px 12px",
  background: "var(--ink)",
  border: "1px solid var(--line)",
  borderRadius: 3,
  color: "var(--cream)",
  fontFamily: "Manrope, sans-serif",
  fontSize: 13,
};

export type BuilderLesson = {
  id: string;
  title: string;
  slug: string;
  sortOrder: number;
  durationMinutes: number | null;
  published: boolean;
};

export type BuilderDownload = {
  id: string;
  title: string;
  url: string;
  fileType: string | null;
  sortOrder: number;
};

export type BuilderModule = {
  id: string;
  title: string;
  summary: string | null;
  sortOrder: number;
  lessons: BuilderLesson[];
  downloads: BuilderDownload[];
};

function reorderList<T extends { id: string }>(items: T[], fromId: string, toId: string): T[] {
  const fromIdx = items.findIndex((m) => m.id === fromId);
  const toIdx = items.findIndex((m) => m.id === toId);
  if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return items;
  const next = [...items];
  const [moved] = next.splice(fromIdx, 1);
  next.splice(toIdx, 0, moved);
  return next;
}

export default function CourseModulesBuilder({
  courseId,
  initialModules,
}: {
  courseId: string;
  initialModules: BuilderModule[];
}) {
  const router = useRouter();
  const [modules, setModules] = useState(initialModules);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const modulesKey = initialModules.map((m) => `${m.id}:${m.title}:${m.lessons.length}`).join("|");
  useEffect(() => {
    setModules(initialModules);
  }, [modulesKey, initialModules]);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [isReordering, startReorder] = useTransition();

  const allExpanded = useMemo(
    () => modules.length > 0 && modules.every((m) => expanded.has(m.id)),
    [modules, expanded],
  );

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = () => setExpanded(new Set(modules.map((m) => m.id)));
  const collapseAll = () => setExpanded(new Set());

  const persistOrder = (ordered: BuilderModule[]) => {
    const ids = ordered.map((m) => m.id);
    startReorder(async () => {
      try {
        await reorderModules(courseId, ids);
        setModules(ordered.map((m, i) => ({ ...m, sortOrder: i })));
        router.refresh();
      } catch (err) {
        setModules(initialModules);
        alert(err instanceof Error ? err.message : "Failed to reorder modules");
      }
    });
  };

  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) {
      setDragId(null);
      setDropTargetId(null);
      return;
    }
    const next = reorderList(modules, dragId, targetId);
    setDragId(null);
    setDropTargetId(null);
    setModules(next);
    persistOrder(next);
  };

  return (
    <section>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <h2
          style={{
            fontFamily: "Anton, sans-serif",
            fontSize: 28,
            letterSpacing: ".02em",
            textTransform: "uppercase",
            color: "var(--cream)",
            margin: 0,
          }}
        >
          Modules ({modules.length})
        </h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={allExpanded ? collapseAll : expandAll}
            style={toolbarBtn}
          >
            {allExpanded ? "Collapse all" : "Expand all"}
          </button>
          {isReordering && (
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                color: "var(--gold)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                alignSelf: "center",
              }}
            >
              Saving order…
            </span>
          )}
        </div>
      </div>

      <p
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: 13,
          color: "var(--cream-soft)",
          marginBottom: 24,
          lineHeight: 1.5,
        }}
      >
        Drag the handle to reorder modules. Click a module header to expand or collapse its lessons and downloads.
      </p>

      <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
        {modules.map((m, index) => {
          const isOpen = expanded.has(m.id);
          const isDragging = dragId === m.id;
          const isDropTarget = dropTargetId === m.id && dragId !== m.id;

          return (
            <div
              key={m.id}
              onDragOver={(e) => {
                e.preventDefault();
                if (dragId && dragId !== m.id) setDropTargetId(m.id);
              }}
              onDragLeave={() => {
                if (dropTargetId === m.id) setDropTargetId(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(m.id);
              }}
              style={{
                background: "var(--ink-2)",
                border: `1px solid ${isDropTarget ? "var(--gold)" : "var(--line)"}`,
                borderRadius: 6,
                opacity: isDragging ? 0.45 : 1,
                boxShadow: isDropTarget ? "0 0 0 1px var(--gold)" : undefined,
                transition: "border-color 0.15s, opacity 0.15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: 0,
                  borderBottom: isOpen ? "1px solid var(--line)" : undefined,
                }}
              >
                <button
                  type="button"
                  draggable
                  onDragStart={() => setDragId(m.id)}
                  onDragEnd={() => {
                    setDragId(null);
                    setDropTargetId(null);
                  }}
                  title="Drag to reorder"
                  aria-label={`Drag module ${m.title}`}
                  style={{
                    width: 40,
                    flexShrink: 0,
                    border: "none",
                    borderRight: "1px solid var(--line)",
                    background: "var(--ink)",
                    color: "var(--cream-soft)",
                    cursor: "grab",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 14,
                    borderRadius: "6px 0 0 0",
                  }}
                >
                  ≡
                </button>

                <button
                  type="button"
                  onClick={() => toggle(m.id)}
                  aria-expanded={isOpen}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 18px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 11,
                      color: "var(--gold)",
                      minWidth: 28,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--cream)",
                      flex: 1,
                    }}
                  >
                    {m.title || "Untitled module"}
                  </span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 10,
                      color: "var(--cream-soft)",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                    }}
                  >
                    {m.lessons.length} lesson{m.lessons.length === 1 ? "" : "s"}
                  </span>
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 16,
                      color: "var(--gold)",
                      width: 20,
                      textAlign: "center",
                    }}
                  >
                    {isOpen ? "▾" : "▸"}
                  </span>
                </button>
              </div>

              {isOpen && (
                <div style={{ padding: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 24,
                      marginBottom: 18,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <ModuleForm
                        module={{
                          id: m.id,
                          title: m.title,
                          summary: m.summary,
                          sortOrder: index,
                        }}
                        action={updateModule.bind(null, m.id)}
                        submitLabel="Save module"
                        hideSortOrder
                        onAfterSubmit={() => router.refresh()}
                      />
                    </div>
                    <DeleteButton
                      onConfirm={deleteModule.bind(null, m.id)}
                      label="Delete module"
                      message={`Delete module "${m.title}" and all its lessons?`}
                    />
                  </div>

                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: 18 }}>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: ".14em",
                        color: "var(--cream-soft)",
                        marginBottom: 12,
                      }}
                    >
                      Lessons ({m.lessons.length})
                    </div>
                    <div style={{ display: "grid", gap: 6 }}>
                      {m.lessons.map((l) => (
                        <div
                          key={l.id}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "32px 2fr 1.5fr 80px 80px 100px 1fr",
                            gap: 14,
                            alignItems: "center",
                            padding: "10px 14px",
                            background: "var(--ink)",
                            border: "1px solid var(--line)",
                            borderRadius: 3,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                              fontSize: 11,
                              color: "var(--gold)",
                            }}
                          >
                            {String(l.sortOrder).padStart(2, "0")}
                          </div>
                          <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream)" }}>
                            {l.title}
                          </div>
                          <div
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                              fontSize: 12,
                              color: "var(--cream-soft)",
                            }}
                          >
                            /{l.slug}
                          </div>
                          <div
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                              fontSize: 12,
                              color: "var(--cream-soft)",
                              textAlign: "right",
                            }}
                          >
                            {l.durationMinutes ?? "—"}m
                          </div>
                          <div
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                              fontSize: 12,
                              color: "var(--cream-soft)",
                              textAlign: "right",
                            }}
                          >
                            #{l.sortOrder}
                          </div>
                          <div>
                            <span
                              style={{
                                fontFamily: "JetBrains Mono, monospace",
                                fontSize: 9,
                                textTransform: "uppercase",
                                letterSpacing: ".1em",
                                padding: "3px 7px",
                                borderRadius: 2,
                                background: l.published ? "rgba(212,175,55,.15)" : "var(--ink-3)",
                                color: l.published ? "var(--gold)" : "var(--cream-soft)",
                                border: l.published ? "1px solid var(--gold)" : "1px solid var(--line)",
                              }}
                            >
                              {l.published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                            <Link
                              href={`/admin/lessons/${l.id}`}
                              style={{
                                fontFamily: "JetBrains Mono, monospace",
                                fontSize: 11,
                                color: "var(--gold)",
                                textTransform: "uppercase",
                                letterSpacing: ".08em",
                              }}
                            >
                              Edit
                            </Link>
                            <DeleteButton
                              onConfirm={deleteLesson.bind(null, l.id)}
                              label="X"
                              message={`Delete lesson "${l.title}"?`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <form
                      action={createLesson.bind(null, m.id)}
                      style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <input
                        name="title"
                        placeholder="New lesson title..."
                        style={{
                          flex: 1,
                          padding: "10px 14px",
                          background: "var(--ink)",
                          border: "1px solid var(--line)",
                          borderRadius: 3,
                          color: "var(--cream)",
                          fontFamily: "Manrope, sans-serif",
                          fontSize: 14,
                        }}
                        required
                      />
                      <input
                        name="sortOrder"
                        type="number"
                        defaultValue={m.lessons.length}
                        style={{
                          width: 70,
                          padding: "10px 12px",
                          background: "var(--ink)",
                          border: "1px solid var(--line)",
                          borderRadius: 3,
                          color: "var(--cream)",
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      />
                      <button type="submit" style={goldOutlineBtn}>
                        + Add lesson
                      </button>
                    </form>
                  </div>

                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: 18, marginTop: 4 }}>
                    <div
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: ".14em",
                        color: "var(--cream-soft)",
                        marginBottom: 12,
                      }}
                    >
                      Downloads ({m.downloads.length})
                    </div>
                    <div style={{ display: "grid", gap: 6, marginBottom: 10 }}>
                      {m.downloads.map((dl) => (
                        <div
                          key={dl.id}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "32px 1fr 1.5fr 70px 36px",
                            gap: 12,
                            alignItems: "center",
                            padding: "8px 12px",
                            background: "var(--ink)",
                            border: "1px solid var(--line)",
                            borderRadius: 3,
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                              fontSize: 10,
                              color: "var(--gold)",
                            }}
                          >
                            #{dl.sortOrder}
                          </div>
                          <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "var(--cream)" }}>
                            {dl.title}
                          </div>
                          <div
                            style={{
                              fontFamily: "JetBrains Mono, monospace",
                              fontSize: 10,
                              color: "var(--cream-soft)",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {dl.url}
                          </div>
                          <div>
                            {dl.fileType && (
                              <span
                                style={{
                                  fontFamily: "JetBrains Mono, monospace",
                                  fontSize: 9,
                                  letterSpacing: ".1em",
                                  padding: "2px 6px",
                                  background: "var(--ink-3)",
                                  color: "var(--cream-soft)",
                                  borderRadius: 2,
                                }}
                              >
                                {dl.fileType}
                              </span>
                            )}
                          </div>
                          <DeleteButton
                            onConfirm={deleteModuleDownload.bind(null, dl.id)}
                            label="X"
                            message={`Remove download "${dl.title}"?`}
                          />
                        </div>
                      ))}
                    </div>
                    <form
                      action={createModuleDownload.bind(null, m.id)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 2fr 80px 60px 80px",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <input name="title" placeholder="File title..." required style={inp} />
                      <input
                        name="url"
                        type="url"
                        placeholder="https://..."
                        required
                        style={{ ...inp, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}
                      />
                      <select
                        name="fileType"
                        style={{ ...inp, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}
                      >
                        <option value="">Type</option>
                        {FILE_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <input
                        name="sortOrder"
                        type="number"
                        defaultValue={m.downloads.length}
                        style={{ ...inp, fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}
                      />
                      <button type="submit" style={{ ...goldOutlineBtn, fontSize: 10, padding: "9px 12px" }}>
                        + Add
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: "var(--ink-2)",
          border: "1px dashed var(--line)",
          borderRadius: 6,
          padding: 24,
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: ".14em",
            color: "var(--gold)",
            marginBottom: 14,
          }}
        >
          + Add module
        </div>
        <ModuleForm
          action={createModule.bind(null, courseId)}
          submitLabel="Create module"
          defaultSortOrder={modules.length}
          hideSortOrder
          onAfterSubmit={() => router.refresh()}
        />
      </div>
    </section>
  );
}

const toolbarBtn: React.CSSProperties = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: ".1em",
  padding: "8px 14px",
  border: "1px solid var(--line)",
  color: "var(--cream-soft)",
  borderRadius: 3,
  background: "transparent",
  cursor: "pointer",
};

const goldOutlineBtn: React.CSSProperties = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: ".1em",
  padding: "10px 16px",
  border: "1px solid var(--gold)",
  color: "var(--gold)",
  borderRadius: 3,
  background: "transparent",
};

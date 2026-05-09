"use client";

import { useState, useTransition } from "react";
import LessonForm, { type LessonFormFields } from "./LessonForm";
import LessonBodyEditor from "./LessonBodyEditor";
import ResourceList, { type ResourceRow } from "./ResourceList";
import DeleteButton from "./DeleteButton";

export default function LessonEditor({
  lessonId,
  initialFields,
  initialBody,
  initialResources,
  saveAction,
  saveResourcesAction,
  deleteAction,
}: {
  lessonId: string;
  initialFields: LessonFormFields;
  initialBody: unknown;
  initialResources: ResourceRow[];
  saveAction: (fields: LessonFormFields, body: unknown) => Promise<void>;
  saveResourcesAction: (resources: ResourceRow[]) => Promise<void>;
  deleteAction: () => Promise<void>;
}) {
  const [fields, setFields] = useState<LessonFormFields>(initialFields);
  const [body, setBody] = useState<unknown>(initialBody);
  const [resources, setResources] = useState<ResourceRow[]>(initialResources);
  const [isPending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function handleSave() {
    startTransition(async () => {
      try {
        await saveAction(fields, body);
        await saveResourcesAction(resources);
        setSavedAt(new Date().toLocaleTimeString());
      } catch (err) {
        if (err instanceof Error && err.message !== "NEXT_REDIRECT") {
          alert(`Save failed: ${err.message}`);
        }
      }
    });
  }

  return (
    <div style={{ display: "grid", gap: 28 }}>
      <div
        style={{
          background: "var(--ink-2)",
          border: "1px solid var(--line)",
          borderRadius: 6,
          padding: 28,
        }}
      >
        <LessonForm fields={fields} onChange={setFields} />
      </div>

      <div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: ".14em",
            color: "var(--cream-soft)",
            marginBottom: 10,
          }}
        >
          Body
        </div>
        <LessonBodyEditor initialContent={initialBody} onChange={setBody} />
      </div>

      <div
        style={{
          background: "var(--ink-2)",
          border: "1px solid var(--line)",
          borderRadius: 6,
          padding: 28,
        }}
      >
        <ResourceList rows={resources} onChange={setResources} />
      </div>

      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "color-mix(in srgb, var(--ink) 95%, transparent)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid var(--line)",
          padding: "16px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          marginTop: 12,
        }}
      >
        <DeleteButton
          onConfirm={deleteAction}
          label="Delete lesson"
          message="Delete this lesson permanently? Cannot be undone."
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {savedAt && (
            <span
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                color: "var(--cream-soft)",
              }}
            >
              Saved {savedAt}
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              padding: "12px 28px",
              background: "var(--gold)",
              color: "var(--ink)",
              borderRadius: 3,
              fontWeight: 600,
              opacity: isPending ? 0.6 : 1,
            }}
          >
            {isPending ? "Saving..." : "Save lesson"}
          </button>
        </div>
      </div>
      {/* hidden id for reference */}
      <input type="hidden" value={lessonId} readOnly />
    </div>
  );
}

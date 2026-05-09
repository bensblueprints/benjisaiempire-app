import Link from "next/link";
import CourseForm from "@/components/admin/CourseForm";
import { createCourse } from "../../_actions";

export default function NewCoursePage() {
  return (
    <div style={{ maxWidth: 880 }}>
      <Link
        href="/admin/courses"
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: ".1em",
          color: "var(--cream-soft)",
          marginBottom: 18,
          display: "inline-block",
        }}
      >
        ← All courses
      </Link>
      <h1
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "clamp(36px, 5vw, 56px)",
          textTransform: "uppercase",
          color: "var(--cream)",
          lineHeight: 1,
          marginBottom: 36,
        }}
      >
        New course
      </h1>
      <CourseForm action={createCourse} />
    </div>
  );
}

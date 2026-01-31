import { useState, useEffect } from "react";

type Lesson = {
  lesson_title: string;
  estimated_minutes?: number;
};

type Props = {
  courseId: string;
  courseTitle: string;
  lessons: Lesson[];
  currentLesson?: number;
};

function getProgress(courseId: string): Set<number> {
  try {
    const raw = localStorage.getItem(`course-progress-${courseId}`);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export default function CourseSidebar({
  courseId,
  courseTitle,
  lessons,
  currentLesson,
}: Props) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCompleted(getProgress(courseId));
    setMounted(true);

    // localStorageの変更をリッスンする(別タブでの変更を検知)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === `course-progress-${courseId}`) {
        setCompleted(getProgress(courseId));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [courseId]);

  const completedCount = mounted ? completed.size : 0;
  const percentage =
    lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="course-sidebar">
      <div className="sidebar-header">
        <a href={`/courses/${courseId}/`} className="sidebar-course-title">
          {courseTitle}
        </a>
        {mounted && (
          <div className="sidebar-progress">
            <div className="sidebar-progress-bar-container">
              <div
                className="sidebar-progress-bar"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="sidebar-progress-text">
              {completedCount}/{lessons.length} 完了
            </span>
          </div>
        )}
      </div>

      <nav className="sidebar-lessons" aria-label="レッスン一覧">
        <ul className="sidebar-lesson-list">
          {lessons.map((lesson, index) => {
            const num = index + 1;
            const isCurrent = currentLesson === num;
            const isCompleted = mounted && completed.has(num);

            return (
              <li
                key={num}
                className={`sidebar-lesson-item ${isCurrent ? "current" : ""} ${isCompleted ? "completed" : ""}`}
              >
                <a
                  href={`/courses/${courseId}/lessons/${num}/`}
                  className="sidebar-lesson-link"
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <span className="sidebar-lesson-number">
                    {isCompleted ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      String(num).padStart(2, "0")
                    )}
                  </span>
                  <span className="sidebar-lesson-title">
                    {lesson.lesson_title}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

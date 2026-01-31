import { useState, useEffect, useCallback } from "react";

type Props = {
  courseId: string;
  totalLessons: number;
  currentLesson: number;
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

function saveProgress(courseId: string, completed: Set<number>) {
  localStorage.setItem(
    `course-progress-${courseId}`,
    JSON.stringify([...completed])
  );
}

export default function CourseProgress({
  courseId,
  totalLessons,
  currentLesson,
}: Props) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCompleted(getProgress(courseId));
    setMounted(true);
  }, [courseId]);

  const isCurrentCompleted = completed.has(currentLesson);
  const completedCount = completed.size;
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const toggleComplete = useCallback(() => {
    const next = new Set(completed);
    if (next.has(currentLesson)) {
      next.delete(currentLesson);
    } else {
      next.add(currentLesson);
    }
    setCompleted(next);
    saveProgress(courseId, next);
  }, [completed, courseId, currentLesson]);

  if (!mounted) {
    return (
      <div className="course-progress-wrapper">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: "0%" }} />
        </div>
        <span className="progress-text">読み込み中...</span>
      </div>
    );
  }

  return (
    <div className="course-progress-wrapper">
      <div className="progress-header">
        <span className="progress-label">コース進捗</span>
        <span className="progress-count">
          {completedCount} / {totalLessons} 完了
        </span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }} />
      </div>
      <div className="progress-footer">
        <span className="progress-percentage">{percentage}%</span>
        <button
          type="button"
          className={`complete-btn ${isCurrentCompleted ? "completed" : ""}`}
          onClick={toggleComplete}
        >
          {isCurrentCompleted ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              完了済み
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              レッスンを完了にする
            </>
          )}
        </button>
      </div>
    </div>
  );
}

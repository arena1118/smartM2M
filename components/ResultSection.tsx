"use client";

// Figma 핵심성과 시작 화면을 기준 이미지로 노출하는 섹션입니다.
import styles from "./ResultSection.module.css";

export function ResultSection() {
  return (
    <section
      id="result"
      className={styles.section}
      aria-label="핵심성과"
    >
      <div className={styles.referenceImage} aria-hidden="true" />
    </section>
  );
}

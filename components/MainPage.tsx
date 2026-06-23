"use client";

// Figma 기준 화면과 최대한 동일하게 보이는 메인 퍼블리싱 화면을 구성합니다.
import { motion, useReducedMotion } from "framer-motion";
import styles from "./MainPage.module.css";

const heroLines = ["항만, AI, 블록체인 그리고", "사이버보안 분야의", "기술 선도에 앞장서고 있습니다."];

const sections = [
  { id: "technical", label: "기술력", image: "/assets/smartm2m/technical-reference.png", height: 1372 },
  { id: "result", label: "핵심성과", image: "/assets/smartm2m/result-reference.png", height: 1550 },
  { id: "history", label: "연혁", image: "/assets/smartm2m/history-reference.png", height: 771 },
  { id: "news", label: "소식", image: "/assets/smartm2m/news-reference.png", height: 816 },
  { id: "footer", label: "푸터", image: "/assets/smartm2m/footer-reference.png", height: 676 },
];

function TypingLine({ children, delay }: { children: string; delay: number }) {
  const reduceMotion = useReducedMotion();
  const width = `${children.length}ch`;

  return (
    <span className={styles.typingLine}>
      <span className={styles.typingGhost}>{children}</span>
      <motion.span
        className={styles.typingText}
        initial={reduceMotion ? false : { width: 0 }}
        animate={{ width }}
        transition={{ duration: reduceMotion ? 0 : 1.08, delay, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FigmaSection({
  id,
  label,
  image,
  height,
}: {
  id: string;
  label: string;
  image: string;
  height: number;
}) {
  return (
    <section
      id={id}
      className={styles.referenceSection}
      style={{ aspectRatio: `1920 / ${height}`, "--section-image": `url(${image})` } as React.CSSProperties}
      aria-label={label}
    />
  );
}

export function MainPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="메인 히어로">
        <div className={styles.heroReference} aria-hidden="true" />
        <motion.div
          className={styles.heroTyping}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, delay: 0.2 }}
        >
          <p>Smart Solutions for a Secure Tomorrow, Empowering Customers to Achieve More</p>
          <h1 aria-label={heroLines.join(" ")}>
            {heroLines.map((line, index) => (
              <TypingLine key={line} delay={0.35 + index * 0.86}>
                {line}
              </TypingLine>
            ))}
          </h1>
        </motion.div>
      </section>

      {sections.map((section) => (
        <FigmaSection key={section.id} {...section} />
      ))}
    </main>
  );
}

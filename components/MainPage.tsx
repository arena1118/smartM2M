"use client";

// Figma 기준 화면 위에 검수 가능한 메인 인터랙션을 얹습니다.
import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import styles from "./MainPage.module.css";

const heroLines = ["항만, AI, 블록체인 그리고", "사이버보안 분야의", "기술 선도에 앞장서고 있습니다."];

const sections = [
  { id: "technical", label: "기술력", image: "/assets/smartm2m/technical-reference.png", height: 1372 },
  { id: "result", label: "핵심성과", image: "/assets/smartm2m/result-reference.png", height: 1550 },
  { id: "history", label: "연혁", image: "/assets/smartm2m/history-reference.png", height: 771 },
  { id: "news", label: "소식", image: "/assets/smartm2m/news-reference.png", height: 816 },
  { id: "footer", label: "푸터", image: "/assets/smartm2m/footer-reference.png", height: 676 },
];

function RevealHeadline() {
  let charIndex = 0;

  return (
    <h1 className={styles.revealHeadline} aria-label={heroLines.join(" ")}>
      {heroLines.map((line, lineIndex) => (
        <span className={styles.revealLine} key={line}>
          {Array.from(line).map((char) => {
            const delay = `${0.35 + charIndex * 0.055}s`;
            charIndex += 1;

            return (
              <span className={styles.revealChar} style={{ "--char-delay": delay } as React.CSSProperties} key={`${line}-${charIndex}`}>
                {char}
              </span>
            );
          })}
          {lineIndex < heroLines.length - 1 ? <br /> : null}
        </span>
      ))}
    </h1>
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

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(`.${styles.referenceSection}`));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.sectionRevealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="메인 히어로">
        <div className={styles.heroReference} aria-hidden="true" />
        <motion.div
          className={styles.heroTextCover}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <p>Smart Solutions for a Secure Tomorrow, Empowering Customers to Achieve More</p>
          <RevealHeadline />
        </motion.div>
      </section>

      {sections.map((section) => (
        <FigmaSection key={section.id} {...section} />
      ))}
    </main>
  );
}

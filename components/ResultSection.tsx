"use client";

// 핵심성과 섹션: 좌측 인트로 + 우측 2열 카드 슬라이드를 구성합니다.
import { useEffect, useRef, useState } from "react";
import styles from "./ResultSection.module.css";

type IconName = "lock" | "scan" | "chip" | "shield" | "target" | "award" | "cloud" | "ship";

type ResultCard = {
  title: string[];
  icon: IconName;
};

const columnA: ResultCard[] = [
  { title: ["KCMVP", "인증 암호 개발"], icon: "lock" },
  { title: ["Agentic AI", "시스템 구축"], icon: "chip" },
  { title: ["지능형", "Penetration Testing", "솔루션"], icon: "target" },
  { title: ["조선소-협력사", "디지털 생산협업", "클라우드 서버 구축 및", "플랫폼 개발"], icon: "cloud" },
  { title: ["선박 사이버 침해사고", "분석 기술 및", "탐지·대응 기술 개발"], icon: "ship" },
];

const columnB: ResultCard[] = [
  { title: ["AI 팩토리", "전문기업 선정"], icon: "award" },
  { title: ["보안점검 자동화", "OCR 솔루션"], icon: "scan" },
  { title: ["산업(OT) 특화", "보안관제", "자동화 솔루션"], icon: "shield" },
  { title: ["온디바이스 AI 및", "Virtual Commissioning", "기반 제조혁신 플랫폼", "개발 및 실증"], icon: "chip" },
  { title: ["객체식별 AI 모델", "신뢰성 검증 기술 실증"], icon: "scan" },
];

const iconPaths: Record<IconName, JSX.Element> = {
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  scan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" />
      <path d="M4 12h16" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v5c0 4.5-3 7.7-7 10-4-2.3-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="11" cy="11" r="7" />
      <circle cx="11" cy="11" r="3" />
      <path d="M16 16l5 5" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13.5L7.5 21 12 18.5 16.5 21 15 13.5" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 18a4 4 0 0 1-.6-7.96A5 5 0 0 1 16 8a4.5 4.5 0 0 1 1 8.9" />
      <path d="M7 18h10" />
    </svg>
  ),
  ship: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 15l1.5 5h13L20 15" />
      <path d="M6 15V6h5l3 4h2l-2 5" />
      <path d="M12 3v3" />
    </svg>
  ),
};

function ResultIcon({ name }: { name: IconName }) {
  return (
    <span className={styles.cardIcon} aria-hidden="true">
      {iconPaths[name]}
    </span>
  );
}

function ResultCardItem({ card }: { card: ResultCard }) {
  return (
    <article className={styles.card}>
      <span className={styles.pill}>2025</span>
      <h4 className={styles.cardTitle}>
        {card.title.map((line, index) => (
          <span key={line}>
            {line}
            {index < card.title.length - 1 ? <br /> : null}
          </span>
        ))}
      </h4>
      <ResultIcon name={card.icon} />
    </article>
  );
}

function ResultColumn({ cards, alt }: { cards: ResultCard[]; alt?: boolean }) {
  return (
    <div className={`${styles.column} ${alt ? styles.columnAlt : ""}`}>
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div className={styles.trackGroup} key={copy} aria-hidden={copy === 1}>
            {cards.map((card, index) => (
              <ResultCardItem card={card} key={`${copy}-${index}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResultSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="result"
      ref={sectionRef}
      className={`${styles.section} ${revealed ? styles.revealed : ""}`}
      aria-label="핵심성과"
    >
      <video
        className={styles.backgroundVideo}
        src="/assets/smartm2m/result-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className={styles.backgroundOverlay} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>RESULT</p>
          <h2>핵심성과</h2>
          <p>
            소프트웨어 중심의 디지털 전환을 넘어,
            <br />
            이제는 AI 전환(AX)이
            <br />
            새로운 혁신의 중심으로 부상하고 있습니다.
          </p>
          <div className={styles.ring} aria-hidden="true" />
        </div>
        <div className={styles.slide}>
          <ResultColumn cards={columnA} />
          <ResultColumn cards={columnB} alt />
        </div>
      </div>
    </section>
  );
}

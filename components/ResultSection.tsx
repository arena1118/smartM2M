"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import styles from "./ResultSection.module.css";

// ── 컬럼 A (아래로 흐름) ──────────────────────────────────────────
const columnACards: CardData[] = [
  { year: "2026", title: "AI 팩토리\n전문기업 선정", highlight: true, icon: "chart" },
  { year: "2025", title: "조선소·협력사 디지털 생산협업\n클라우드 서버 구축 및 플랫폼 개발", highlight: false, icon: null },
  { year: "2024", title: "AI 기반 항만\n물류 자동화 시스템", highlight: false, icon: null },
  { year: "2023", title: "블록체인 기반\n공급망 추적 플랫폼", highlight: false, icon: null },
];

// ── 컬럼 B (위로 흐름) ───────────────────────────────────────────
const columnBCards: CardData[] = [
  { year: "2025", title: "온디바이스 AI 및 Virtual Commissioning 기반\n제조혁신 플랫폼 개발 및 실증", highlight: false, icon: null },
  { year: "2025", title: "선박 사이버 침해사고 분석 기술 및\n탐지·대응 기술 개발", highlight: false, icon: null },
  { year: "2024", title: "객체식별 AI 모델\n신뢰성 검증 기술 실증", highlight: false, icon: "search" },
  { year: "2023", title: "사이버보안 관제\n플랫폼 구축", highlight: false, icon: null },
];

// ── 타입 ─────────────────────────────────────────────────────────
type CardData = {
  year: string;
  title: string;
  highlight: boolean;
  icon: "chart" | "search" | null;
};

// ── SVG 아이콘 ────────────────────────────────────────────────────
function ChartIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="26" fill="rgba(255,255,255,0.12)" />
      <path d="M36 12 L50 30 L64 22 L56 46 L36 38 Z" fill="rgba(255,255,255,0.55)" />
      <path d="M36 38 L16 50 L12 26 L36 12 Z" fill="rgba(255,255,255,0.35)" />
      <path d="M36 38 L56 46 L44 62 L16 50 Z" fill="rgba(255,255,255,0.8)" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="28" cy="28" r="16" stroke="#ED1B23" strokeWidth="3.5" />
      <line x1="40" y1="40" x2="56" y2="56" stroke="#ED1B23" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="28" cy="28" r="7" fill="rgba(237,27,35,0.2)" />
    </svg>
  );
}

// ── 카드 컴포넌트 ─────────────────────────────────────────────────
function AchievementCard({
  card,
  onEnter,
  onLeave,
}: {
  card: CardData;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const iconRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    iconRef.current.style.transform = `rotate(${angle + 45}deg)`;
  };

  const handleMouseEnter = () => {
    setHovered(true);
    onEnter();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onLeave();
    if (iconRef.current) {
      iconRef.current.style.transform = "rotate(0deg)";
    }
  };

  return (
    <div
      className={[
        styles.card,
        card.highlight ? styles.cardHighlight : styles.cardDefault,
        hovered ? styles.cardHovered : "",
      ].join(" ")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={card.icon ? handleMouseMove : undefined}
    >
      <span className={styles.cardYear}>{card.year}</span>
      <p className={styles.cardTitle}>{card.title}</p>
      {card.icon && (
        <div className={styles.cardIconWrap}>
          <div
            ref={iconRef}
            className={styles.cardIcon}
            style={{ transition: hovered ? "transform 0.08s ease" : "transform 0.5s ease" }}
          >
            {card.icon === "chart" ? <ChartIcon /> : <SearchIcon />}
          </div>
        </div>
      )}
    </div>
  );
}

// ── 무한 스크롤 컬럼 ─────────────────────────────────────────────
function InfiniteColumn({
  cards,
  direction,
  isPlaying,
  duration,
  onEnter,
  onLeave,
}: {
  cards: CardData[];
  direction: "up" | "down";
  isPlaying: boolean;
  duration: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  // 카드 2배 복사 → seamless loop
  const doubled = [...cards, ...cards];

  return (
    <div className={styles.columnOuter}>
      <div
        className={`${styles.columnTrack} ${direction === "up" ? styles.trackUp : styles.trackDown}`}
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        {doubled.map((card, i) => (
          <AchievementCard key={i} card={card} onEnter={onEnter} onLeave={onLeave} />
        ))}
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────
export function ResultSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const hoverRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [boxExpanded, setBoxExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const BOX_END = 0.4;

  // 박스 확장 완료 감지
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setBoxExpanded(v >= BOX_END - 0.02);
  });

  // clipPath 박스 확장 애니메이션
  const clipT = useTransform(scrollYProgress, [0, BOX_END], [36, 0]);
  const clipR = useTransform(scrollYProgress, [0, BOX_END], [42, 0]);
  const clipB = useTransform(scrollYProgress, [0, BOX_END], [36, 0]);
  const clipL = useTransform(scrollYProgress, [0, BOX_END], [42, 0]);
  const clipRadius = useTransform(scrollYProgress, [0, BOX_END], [16, 0]);
  const clipPath = useMotionTemplate`inset(${clipT}% ${clipR}% ${clipB}% ${clipL}% round ${clipRadius}px)`;

  // 좌측 텍스트: 박스 확장 중 페이드인
  const leftOpacity = useTransform(scrollYProgress, [0.18, BOX_END], [0, 1]);
  const leftY = useTransform(scrollYProgress, [0.18, BOX_END], [30, 0]);

  // 우측 패널: 확장 직후 페이드인
  const rightOpacity = useTransform(scrollYProgress, [BOX_END, BOX_END + 0.05], [0, 1]);

  const handleEnter = () => {
    hoverRef.current += 1;
    setIsPaused(true);
  };

  const handleLeave = () => {
    hoverRef.current = Math.max(0, hoverRef.current - 1);
    if (hoverRef.current === 0) setIsPaused(false);
  };

  const isPlaying = boxExpanded && !isPaused && !reduceMotion;

  return (
    <section ref={sectionRef} id="result" className={styles.section} aria-label="핵심성과">
      <div className={styles.sticky}>
        <motion.div className={styles.expandBox} style={{ clipPath }}>
          {/* 배경 영상 — 파일 준비 후 src 주석 해제 */}
          <video
            className={styles.bgVideo}
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/smartm2m/result-visual.png"
            /* src="/assets/smartm2m/result-bg.mp4" */
          />

          <div className={styles.layout}>
            {/* 좌측 고정 텍스트 */}
            <motion.div
              className={styles.leftPanel}
              style={{ opacity: leftOpacity, y: leftY }}
            >
              <p className={styles.eyebrow}>RESULT</p>
              <h2 className={styles.headline}>핵심성과</h2>
              <p className={styles.body}>
                소프트웨어 중심의 디지털 전환을 넘어,<br />
                이제는 AI 전환(AIX)이<br />
                새로운 혁신의 중심으로 부상하고 있습니다.
              </p>
            </motion.div>

            {/* 우측 2컬럼 무한 배너 */}
            <motion.div className={styles.rightPanel} style={{ opacity: rightOpacity }}>
              {/* 왼쪽 컬럼: 아래로 흐름 */}
              <InfiniteColumn
                cards={columnACards}
                direction="down"
                isPlaying={isPlaying}
                duration={32}
                onEnter={handleEnter}
                onLeave={handleLeave}
              />
              {/* 오른쪽 컬럼: 위로 흐름 */}
              <InfiniteColumn
                cards={columnBCards}
                direction="up"
                isPlaying={isPlaying}
                duration={24}
                onEnter={handleEnter}
                onLeave={handleLeave}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

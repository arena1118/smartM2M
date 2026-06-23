"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import styles from "./ResultSection.module.css";

// ─── 성과 카드 데이터 (피그마 디자인 기준) ─────────────────────────────────
const achievements = [
  {
    year: "2020",
    title: "AI 팩토리\n전문기업 선정",
    highlight: true,
  },
  {
    year: "2025",
    title: "온디바이스 AI 및 Virtual Commissioning 기반\n제조혁신 플랫폼 개발 및 실증",
    highlight: false,
  },
  {
    year: "2025",
    title: "선박 사이버 침해사고 분석 기술 및\n탐지·대응 기술 개발",
    highlight: false,
  },
  {
    year: "2025",
    title: "조선소·협력사 디지털 생산협업\n클라우드 서버 구축 및 플랫폼 개발",
    highlight: false,
  },
  {
    year: "2024",
    title: "객체식별 AI 모델\n신뢰성 검증 기술 실증",
    highlight: false,
  },
];

// ─── 개별 카드 ───────────────────────────────────────────────────────────────
function AchievementCard({
  item,
  index,
  progress,
  cardPhaseStart,
}: {
  item: (typeof achievements)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  cardPhaseStart: number; // 카드 단계가 시작되는 progress 값
}) {
  const total = achievements.length;
  const cardRange = 1 - cardPhaseStart;
  const segment = cardRange / total;
  const start = cardPhaseStart + index * segment;
  const end = cardPhaseStart + (index + 1) * segment;
  const fadeIn = segment * 0.2;
  const fadeOut = segment * 0.2;

  const isFirst = index === 0;

  const y = useTransform(
    progress,
    isFirst
      ? [cardPhaseStart, end - fadeOut, end]
      : [start - fadeIn, start, end - fadeOut, end],
    isFirst
      ? ["0%", "0%", "-120%"]
      : ["120%", "0%", "0%", "-120%"]
  );

  const opacity = useTransform(
    progress,
    isFirst
      ? [cardPhaseStart, end - fadeOut, end]
      : [start - fadeIn, start, end - fadeOut, end],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0]
  );

  return (
    <motion.article
      className={`${styles.card} ${item.highlight ? styles.cardHighlight : ""}`}
      style={{ y, opacity }}
    >
      <span className={styles.cardYear}>{item.year}</span>
      <p className={styles.cardTitle}>{item.title}</p>
    </motion.article>
  );
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export function ResultSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 박스 확장 단계: 0 ~ 0.4
  const BOX_EXPAND_END = 0.4;

  // clipPath 인셋값 (top, right, bottom, left — %)
  // 시작: 화면 중앙에 작은 박스 (좌우 42%, 상하 38% 클립 → 약 16%×24% 크기)
  // 끝: 전체 화면 (0%)
  const clipTop = useTransform(scrollYProgress, [0, BOX_EXPAND_END], [36, 0]);
  const clipRight = useTransform(scrollYProgress, [0, BOX_EXPAND_END], [42, 0]);
  const clipBottom = useTransform(scrollYProgress, [0, BOX_EXPAND_END], [36, 0]);
  const clipLeft = useTransform(scrollYProgress, [0, BOX_EXPAND_END], [42, 0]);
  const clipRadius = useTransform(scrollYProgress, [0, BOX_EXPAND_END], [16, 0]);

  // "inset(top right bottom left round radius)"
  const clipPath = useMotionTemplate`inset(${clipTop}% ${clipRight}% ${clipBottom}% ${clipLeft}% round ${clipRadius}px)`;

  // 텍스트 패널: 박스가 50% 확장된 이후 서서히 등장
  const leftOpacity = useTransform(scrollYProgress, [0.15, BOX_EXPAND_END], [0, 1]);
  const leftY = useTransform(scrollYProgress, [0.15, BOX_EXPAND_END], [32, 0]);

  // 카드 트랙: 박스 확장 완료 후 등장
  const cardsOpacity = useTransform(
    scrollYProgress,
    [BOX_EXPAND_END, BOX_EXPAND_END + 0.05],
    [0, 1]
  );

  if (reduceMotion) {
    return (
      <section id="result" className={styles.section} aria-label="핵심성과">
        <div className={styles.staticLayout}>
          <LeftText />
          <div className={styles.cardsTrack}>
            {achievements.map((item, i) => (
              <article
                key={i}
                className={`${styles.card} ${item.highlight ? styles.cardHighlight : ""}`}
              >
                <span className={styles.cardYear}>{item.year}</span>
                <p className={styles.cardTitle}>{item.title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="result" className={styles.section} aria-label="핵심성과">
      <div className={styles.sticky}>
        {/* ── 확장되는 어두운 박스 ── */}
        <motion.div className={styles.expandBox} style={{ clipPath }}>
          {/* 배경 영상 (영상 파일 준비 후 src 연결) */}
          <video
            className={styles.bgVideo}
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/smartm2m/result-visual.png"
            /* src="/assets/smartm2m/result-bg.mp4" */
          />

          {/* 좌측 텍스트 */}
          <motion.div
            className={styles.leftPanel}
            style={{ opacity: leftOpacity, y: leftY }}
          >
            <LeftText />
          </motion.div>

          {/* 우측 카드 슬라이드 */}
          <motion.div className={styles.rightPanel} style={{ opacity: cardsOpacity }}>
            <div className={styles.cardsTrack}>
              {achievements.map((item, index) => (
                <AchievementCard
                  key={index}
                  item={item}
                  index={index}
                  progress={scrollYProgress}
                  cardPhaseStart={BOX_EXPAND_END}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function LeftText() {
  return (
    <>
      <p className={styles.eyebrow}>RESULT</p>
      <h2 className={styles.headline}>핵심성과</h2>
      <p className={styles.body}>
        소프트웨어 중심의 디지털 전환을 넘어,<br />
        이제는 AI 전환(AIX)이<br />
        새로운 혁신의 중심으로 부상하고 있습니다.
      </p>
    </>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./ResultSection.module.css";

const achievements = [
  {
    number: "01",
    title: "항만 스마트 물류\n시스템",
    subtitle: "Port Smart Logistics",
    description: "국내외 항만 물류 자동화 및 스마트 관제 솔루션을 구축하여 물류 효율과 안전성을 동시에 혁신합니다.",
  },
  {
    number: "02",
    title: "AI 기반 보안\n위협 탐지",
    subtitle: "AI Security Threat Detection",
    description: "생성형 AI와 머신러닝을 결합한 실시간 위협 탐지로 사이버 공격에 선제적으로 대응합니다.",
  },
  {
    number: "03",
    title: "블록체인 데이터\n신뢰 플랫폼",
    subtitle: "Blockchain Data Trust Platform",
    description: "블록체인 기반 데이터 무결성 검증으로 신뢰할 수 있는 디지털 거래 환경을 제공합니다.",
  },
  {
    number: "04",
    title: "사이버보안\n관제 솔루션",
    subtitle: "Cybersecurity Management",
    description: "24시간 365일 보안관제 체계와 취약점 진단 리포트로 안전한 IT 인프라를 실현합니다.",
  },
];

function AchievementCard({
  item,
  index,
  progress,
  total,
}: {
  item: (typeof achievements)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const buffer = segment * 0.18;

  const isFirst = index === 0;

  const y = useTransform(
    progress,
    isFirst
      ? [0, end - buffer, end]
      : [Math.max(0, start - segment * 0.6), start, end - buffer, end],
    isFirst ? ["0%", "0%", "-110%"] : ["100%", "0%", "0%", "-110%"]
  );
  const opacity = useTransform(
    progress,
    isFirst
      ? [0, end - buffer, end]
      : [Math.max(0, start - segment * 0.6), start, end - buffer, end],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress,
    isFirst
      ? [0, end - buffer, end]
      : [Math.max(0, start - segment), start, end - buffer, end],
    isFirst ? [1, 1, 0.96] : [0.94, 1, 1, 0.96]
  );

  return (
    <motion.article className={styles.card} data-number={item.number} style={{ y, opacity, scale }}>
      <span className={styles.cardNumber}>achievement {item.number}</span>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardSubtitle}>{item.subtitle}</p>
        <p className={styles.cardDescription}>{item.description}</p>
      </div>
      <div className={styles.cardArrow} aria-hidden="true">→</div>
    </motion.article>
  );
}

export function ResultSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} id="result" className={styles.section} aria-label="핵심성과">
      <div className={styles.sticky}>
        {/* 좌측 고정 텍스트 */}
        <div className={styles.left}>
          <p className={styles.eyebrow}>ACHIEVEMENT</p>
          <h2 className={styles.headline}>
            기술의 높이와<br />현장의 깊이로,<br />
            체감 가능한<br />혁신을 만들어갑니다.
          </h2>
          <p className={styles.body}>
            스마트M2M은 고객 비즈니스에 대한 깊은 이해를 기반으로
            데이터 준비부터 AI 에이전트 최적화에 이르기까지,
            비즈니스 특성에 최적화된 환경을 정교하게 설계합니다.
          </p>
          <p className={styles.body}>
            다양한 산업에서 축적된 기술력과 실행 경험을 바탕으로
            비즈니스 전반에 걸쳐 의미 있는 변화를 만들어내고,
            지속 가능한 성장을 실현합니다.
          </p>
        </div>

        {/* 우측 카드 스크롤 */}
        <div className={styles.right}>
          <div className={styles.cardsTrack}>
            {achievements.map((item, index) => (
              <AchievementCard
                key={item.number}
                item={item}
                index={index}
                progress={scrollYProgress}
                total={achievements.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

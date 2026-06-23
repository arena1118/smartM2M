"use client";

// 메인 화면의 섹션 구성과 공통 진입 애니메이션을 관리합니다.
import { motion, useReducedMotion } from "framer-motion";
import { TechnicalScrollSection } from "@/components/TechnicalScrollSection";
import styles from "./MainPage.module.css";

const heroLines = ["항만, AI, 블록체인 그리고", "사이버보안 분야의", "기술 선도에 앞장서고 있습니다."];

const resultCards = [
  {
    year: "2026",
    title: "AI 팩토리 전문기업 선정",
    tone: "red",
  },
  {
    year: "2025",
    title: "온디바이스 AI 및 Virtual Commissioning 기반 제조혁신 플랫폼 개발 및 실증",
    tone: "white",
  },
  {
    year: "2025",
    title: "선박 사이버 침해사고 분석 기술 및 탐지 대응 기술 개발",
    tone: "white",
  },
];

const historyItems = [
  "AI 팩토리 전문기업 선정",
  "부산항 물류 플랫폼 유지보수 용역",
  "온디바이스 AI 및 제조혁신 플랫폼 개발",
  "선박 사이버 침해사고 분석 기술 개발",
];

const newsItems = [
  "블록체인 기반 환적 모니터링 시스템 구축 및 상용화",
  "부산항 포트아이 플랫폼 고도화",
  "제조업 탄소 감축을 위한 블록체인 기술 제안",
];

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 54 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.section>
  );
}

function TypingLine({ children, delay }: { children: string; delay: number }) {
  const reduceMotion = useReducedMotion();
  const length = `${children.length}ch`;

  return (
    <span className={styles.typingLine}>
      <span className={styles.ghostText}>{children}</span>
      <motion.span
        className={styles.typedText}
        initial={reduceMotion ? false : { width: 0 }}
        animate={reduceMotion ? { width: length } : { width: length }}
        transition={{ duration: reduceMotion ? 0 : 1.15, ease: [0.4, 0, 0.2, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function MainPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className={styles.page}>
      <header className={styles.gnb}>
        <strong>SmartM2M</strong>
        <nav aria-label="주요 메뉴">
          <a href="#technical">기술력</a>
          <a href="#result">핵심성과</a>
          <a href="#history">연혁</a>
          <a href="#news">소식</a>
        </nav>
      </header>

      <aside className={styles.leftRail} aria-hidden="true">
        Smart Solutions for a Secure Tomorrow
      </aside>

      <section className={styles.hero}>
        <motion.p
          className={styles.heroEyebrow}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          Smart Solutions for a Secure Tomorrow
        </motion.p>
        <h1 className={styles.heroTitle} aria-label={heroLines.join(" ")}>
          {heroLines.map((line, index) => (
            <TypingLine key={line} delay={0.35 + index * 1.02}>
              {line}
            </TypingLine>
          ))}
        </h1>
        <motion.a
          href="#technical"
          className={styles.heroButton}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 3.45 }}
          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          홍보영상 보러가기
        </motion.a>

        <motion.div
          className={styles.heroObject}
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: -8 }}
          animate={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : {
                  opacity: 1,
                  y: [0, -18, 0],
                  rotate: [-3, 3, -3],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.8, delay: 1.3 },
                  y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 7.2, repeat: Infinity, ease: "easeInOut" },
                }
          }
        >
          <span className={styles.lightbulb} />
          <span className={styles.ring} />
        </motion.div>
      </section>

      <div id="technical">
        <TechnicalScrollSection />
      </div>

      <FadeIn className={styles.results} delay={0.05}>
        <div className={styles.sectionTitle} id="result">
          <p>RESULT</p>
          <h2>핵심성과</h2>
        </div>
        <div className={styles.resultGrid}>
          <div className={styles.resultVisual}>
            <span>SMARTM2M</span>
            <strong>AI, 보안, 물류 기술을 하나의 실행 성과로 연결합니다.</strong>
          </div>
          <div className={styles.resultCards}>
            {resultCards.map((card, index) => (
              <motion.article
                key={card.title}
                className={card.tone === "red" ? styles.resultCardRed : styles.resultCard}
                initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, delay: index * 0.09, ease: "easeOut" }}
              >
                <span>{card.year}</span>
                <h3>{card.title}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn className={styles.history}>
        <div className={styles.sectionTitle} id="history">
          <p>HISTORY</p>
          <h2>연혁</h2>
        </div>
        <div className={styles.historyPanel}>
          <strong>2025~24</strong>
          <ul>
            {historyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button type="button">펼쳐보기 +</button>
        </div>
      </FadeIn>

      <FadeIn className={styles.news}>
        <div className={styles.sectionTitle} id="news">
          <p>SMARTM2M NEWS</p>
          <h2>소식</h2>
        </div>
        <div className={styles.newsTrack}>
          {newsItems.map((item, index) => (
            <article key={item} className={index === 2 ? styles.newsCardHot : styles.newsCard}>
              <span>2025.0{index + 4}.1{index + 2}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </FadeIn>

      <footer className={styles.footer}>
        <strong>SmartM2M</strong>
        <a href="#">맨 위로</a>
      </footer>
    </main>
  );
}

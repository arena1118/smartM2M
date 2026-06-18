"use client";

// 생성형 AI 보안 기술력 섹션의 스크롤 전환을 관리합니다.
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TechnicalScrollSection.module.css";

type TechnicalStep = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  videoSrc: string;
  fit: "cover" | "contain";
};

const technicalSteps: TechnicalStep[] = [
  {
    id: "audit",
    eyebrow: "STEP 01",
    title: "생성형 AI 취약점 점검",
    description: "보안 취약점을 사전에 점검하고 진단하는 솔루션",
    tags: ["특징1", "특징2", "특징3"],
    videoSrc: "/videos/security-01.mp4",
    fit: "cover",
  },
  {
    id: "risk",
    eyebrow: "STEP 02",
    title: "AI 보안 위험 분석",
    description: "입력 데이터와 응답 흐름을 분석하여 위험 요소를 탐지",
    tags: ["탐지", "분석", "리포트"],
    videoSrc: "/videos/security-02.mp4",
    fit: "cover",
  },
  {
    id: "report",
    eyebrow: "STEP 03",
    title: "취약점 진단 리포트",
    description: "점검 결과를 시각화하고 관리자가 바로 확인할 수 있도록 제공",
    tags: ["대시보드", "리포트", "자동화"],
    videoSrc: "/videos/security-03.mp4",
    fit: "contain",
  },
];

export function TechnicalScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion === true;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["33%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      technicalSteps.length - 1,
      Math.max(0, Math.floor(latest * technicalSteps.length)),
    );
    setActiveIndex(nextIndex);
  });

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (reduceMotion || index !== activeIndex) {
        video.pause();
        return;
      }

      void video.play().catch(() => undefined);
    });
  }, [activeIndex, reduceMotion]);

  const activeStep = technicalSteps[activeIndex];
  const sectionHeight = useMemo(() => `${technicalSteps.length * 100 + 100}vh`, []);

  return (
    <main className={styles.page}>
      <section className={styles.intro} aria-label="인트로">
        <p>Scroll Sample</p>
        <h1>AI 보안 기술 소개 스크롤 인터랙션</h1>
      </section>

      <section ref={sectionRef} className={styles.technicalSection} style={{ minHeight: sectionHeight }}>
        <div className={styles.dottedBackground} aria-hidden="true" />
        <div className={styles.stickyViewport}>
          <header className={styles.sectionHeader}>
            <p>TECHNICAL</p>
            <h2>기술력</h2>
          </header>

          <div className={styles.contentGrid}>
            <div className={styles.visualColumn}>
              <div className={styles.visualStack}>
                {technicalSteps.map((step, index) => (
                  <motion.video
                    key={step.id}
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    className={styles.visualVideo}
                    style={{ objectFit: step.fit }}
                    src={step.videoSrc}
                    autoPlay={!reduceMotion && index === activeIndex}
                    muted
                    loop
                    playsInline
                    preload={index === 0 ? "auto" : "metadata"}
                    aria-label={`${step.title} 영상`}
                    initial={false}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : 28,
                      scale: activeIndex === index ? 1 : 0.98,
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
                  />
                ))}
              </div>
            </div>

            <motion.article
              key={activeStep.id}
              className={styles.textCard}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            >
              <div className={styles.iconWrap} aria-hidden="true">
                <span />
              </div>
              <p className={styles.stepLabel}>{activeStep.eyebrow}</p>
              <h3>{activeStep.title}</h3>
              <p className={styles.description}>{activeStep.description}</p>
              <div className={styles.tags}>
                {activeStep.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.article>
          </div>

          <div className={styles.progressTrack} aria-hidden="true">
            <motion.span style={{ width: progressWidth }} />
          </div>
        </div>

        <div className={styles.mobileSteps}>
          {technicalSteps.map((step, index) => (
            <article key={step.id} className={styles.mobileStep}>
              <video
                className={styles.mobileVideo}
                style={{ objectFit: step.fit }}
                src={step.videoSrc}
                muted
                loop
                playsInline
                controls={reduceMotion}
                preload="metadata"
              />
              <div>
                <p className={styles.stepLabel}>STEP {String(index + 1).padStart(2, "0")}</p>
                <h3>{step.title}</h3>
                <p className={styles.description}>{step.description}</p>
                <div className={styles.tags}>
                  {step.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.nextSection} aria-label="두 번째 기술력">
        <p>SECOND TECHNICAL</p>
        <h2>두 번째 기술력 섹션</h2>
      </section>
    </main>
  );
}

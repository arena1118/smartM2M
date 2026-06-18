"use client";

// 생성형 AI 보안 기술력 섹션의 스크롤 전환을 관리합니다.
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TechnicalScrollSection.module.css";

type VisualCard = {
  label: string;
  imageSrc: string;
  alt: string;
};

type DetailBlock = {
  title: string;
  body: string;
};

type TechnicalStep = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  videoSrc: string;
  fit: "cover" | "contain";
  visualCards: VisualCard[];
  details: DetailBlock[];
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
    visualCards: [
      {
        label: "Prompt",
        imageSrc: "/images/technical-step-01-01.png",
        alt: "프롬프트 취약점 점검 화면",
      },
      {
        label: "Model",
        imageSrc: "/images/technical-step-01-02.png",
        alt: "모델 응답 점검 화면",
      },
      {
        label: "Policy",
        imageSrc: "/images/technical-step-01-03.png",
        alt: "정책 우회 점검 화면",
      },
    ],
    details: [
      {
        title: "취약점 점검",
        body: "프롬프트, 모델 응답, 정책 우회 가능성을 한 흐름으로 점검합니다.",
      },
    ],
  },
  {
    id: "risk",
    eyebrow: "STEP 02",
    title: "AI 보안 위험 분석",
    description: "입력 데이터와 응답 흐름을 분석하여 위험 요소를 탐지",
    tags: ["탐지", "분석", "리포트"],
    videoSrc: "/videos/security-02.mp4",
    fit: "cover",
    visualCards: [
      {
        label: "Risk",
        imageSrc: "/images/technical-step-02-01.png",
        alt: "AI 보안 위험 분석 화면",
      },
    ],
    details: [
      {
        title: "위험 분석",
        body: "입력과 출력 사이의 이상 징후를 추적해 관리자가 확인할 위험 요소를 정리합니다.",
      },
    ],
  },
  {
    id: "report",
    eyebrow: "STEP 03",
    title: "취약점 진단 리포트",
    description: "점검 결과를 시각화하고 관리자가 바로 확인할 수 있도록 제공",
    tags: ["대시보드", "리포트", "자동화"],
    videoSrc: "/videos/security-03.mp4",
    fit: "contain",
    visualCards: [
      {
        label: "Dashboard",
        imageSrc: "/images/technical-step-03-01.png",
        alt: "취약점 진단 대시보드 화면",
      },
      {
        label: "Export",
        imageSrc: "/images/technical-step-03-02.png",
        alt: "취약점 진단 리포트 내보내기 화면",
      },
    ],
    details: [
      {
        title: "시각화 대시보드",
        body: "취약점 분포와 위험도를 한 화면에서 비교할 수 있게 제공합니다.",
      },
      {
        title: "자동 리포트",
        body: "점검 이력과 조치 항목을 리포트 형태로 정리해 후속 대응을 돕습니다.",
      },
    ],
  },
];

function StepFallbackVisual({
  step,
  failedImages,
  onImageError,
}: {
  step: TechnicalStep;
  failedImages: Record<string, boolean>;
  onImageError: (src: string) => void;
}) {
  return (
    <div
      className={styles.fallbackVisual}
      data-card-count={step.visualCards.length}
      data-detail-count={step.details.length}
      aria-hidden="true"
    >
      <div className={styles.fallbackHeader}>
        <span>{step.eyebrow}</span>
        <span>AI SECURITY</span>
      </div>
      <div className={styles.fallbackBody}>
        <div className={styles.fallbackGrid}>
          {step.visualCards.map((card, index) => (
            <div key={card.imageSrc} className={styles.visualImageCard} data-index={index + 1}>
              {!failedImages[card.imageSrc] && (
                <img
                  src={card.imageSrc}
                  alt={card.alt}
                  loading="lazy"
                  onError={() => {
                    onImageError(card.imageSrc);
                  }}
                />
              )}
              <span>{card.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.fallbackDetails}>
          {step.details.map((detail) => (
            <div key={detail.title} className={styles.fallbackPanel}>
              <strong>{detail.title}</strong>
              <p>{detail.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TechnicalScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
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

  const handleImageError = (src: string) => {
    setFailedImages((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <main className={styles.page}>
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
                  <motion.div
                    key={step.id}
                    className={styles.visualLayer}
                    initial={false}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      y: activeIndex === index ? 0 : 28,
                      scale: activeIndex === index ? 1 : 0.98,
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
                  >
                    <StepFallbackVisual
                      step={step}
                      failedImages={failedImages}
                      onImageError={handleImageError}
                    />
                    <video
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      className={styles.visualVideo}
                      data-hidden={failedVideos[step.id] ? "true" : "false"}
                      style={{ objectFit: step.fit }}
                      src={step.videoSrc}
                      autoPlay={!reduceMotion && index === activeIndex}
                      muted
                      loop
                      playsInline
                      preload={index === 0 ? "auto" : "metadata"}
                      aria-label={`${step.title} 영상`}
                      onError={() => {
                        setFailedVideos((prev) => ({ ...prev, [step.id]: true }));
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.article
              key={activeStep.id}
              className={styles.textCard}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
            >
              <div className={styles.iconWrap} aria-hidden="true">
                <span />
              </div>
              <p className={styles.stepLabel}>{activeStep.eyebrow}</p>
              <h3>{activeStep.title}</h3>
              <div className={styles.detailList}>
                {activeStep.details.map((detail) => (
                  <div key={detail.title} className={styles.detailItem}>
                    <strong>{detail.title}</strong>
                    <p>{detail.body}</p>
                  </div>
                ))}
              </div>
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
              <div className={styles.mobileVisual}>
                <StepFallbackVisual step={step} failedImages={failedImages} onImageError={handleImageError} />
                <video
                  className={styles.mobileVideo}
                  data-hidden={failedVideos[step.id] ? "true" : "false"}
                  style={{ objectFit: step.fit }}
                  src={step.videoSrc}
                  muted
                  loop
                  playsInline
                  controls={reduceMotion}
                  preload="metadata"
                  onError={() => {
                    setFailedVideos((prev) => ({ ...prev, [step.id]: true }));
                  }}
                />
              </div>
              <div>
                <p className={styles.stepLabel}>STEP {String(index + 1).padStart(2, "0")}</p>
                <h3>{step.title}</h3>
                <div className={styles.detailList}>
                  {step.details.map((detail) => (
                    <div key={detail.title} className={styles.detailItem}>
                      <strong>{detail.title}</strong>
                      <p>{detail.body}</p>
                    </div>
                  ))}
                </div>
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

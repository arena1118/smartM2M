"use client";

// 생성형 AI 보안 기술 섹션의 스크롤 전환을 관리합니다.
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type CSSProperties, useMemo, useRef, useState } from "react";
import styles from "./TechnicalScrollSection.module.css";

type TechnicalScene = {
  id: string;
  step: "STEP 01" | "STEP 02" | "STEP 03";
  sceneLabel: string;
  imageLabel: string;
  imageSrc: string;
  title: string;
  detailTitle: string;
  detailBody: string;
  tags: string[];
};

const technicalScenes: TechnicalScene[] = [
  {
    id: "step-01-01",
    step: "STEP 01",
    sceneLabel: "1-1",
    imageLabel: "Prompt",
    imageSrc: "/images/technical-step-01-01.png",
    title: "생성형 AI 취약점 점검",
    detailTitle: "프롬프트 취약점 탐색",
    detailBody: "입력 단계에서 정책 우회, 민감정보 유도, 금칙어 회피 가능성을 점검합니다.",
    tags: ["프롬프트", "취약점", "점검"],
  },
  {
    id: "step-01-02",
    step: "STEP 01",
    sceneLabel: "1-2",
    imageLabel: "Model",
    imageSrc: "/images/technical-step-01-02.png",
    title: "생성형 AI 취약점 점검",
    detailTitle: "모델 응답 검증",
    detailBody: "모델 응답이 보안 정책을 벗어나거나 위험 정보를 노출하는지 흐름별로 검증합니다.",
    tags: ["응답", "검증", "모델"],
  },
  {
    id: "step-01-03",
    step: "STEP 01",
    sceneLabel: "1-3",
    imageLabel: "Policy",
    imageSrc: "/images/technical-step-01-03.png",
    title: "생성형 AI 취약점 점검",
    detailTitle: "정책 우회 점검",
    detailBody: "반복 질문, 역할 전환, 간접 지시 같은 우회 패턴으로 방어 정책의 유지 여부를 확인합니다.",
    tags: ["정책", "우회", "방어"],
  },
  {
    id: "step-02-01",
    step: "STEP 02",
    sceneLabel: "2",
    imageLabel: "Risk",
    imageSrc: "/images/technical-step-02-01.png",
    title: "AI 보안 위협 분석",
    detailTitle: "위험 요소 분석",
    detailBody: "입력 데이터와 응답 흐름을 분석해 위험 요소를 탐지하고 관리자 확인 우선순위를 정리합니다.",
    tags: ["탐지", "분석", "리포트"],
  },
  {
    id: "step-03-01",
    step: "STEP 03",
    sceneLabel: "3-1",
    imageLabel: "Dashboard",
    imageSrc: "/images/technical-step-03-01.png",
    title: "취약점 진단 리포트",
    detailTitle: "시각화 대시보드",
    detailBody: "취약점 분포, 위험도, 점검 상태를 시각화해 관리자가 한 화면에서 흐름을 파악하게 합니다.",
    tags: ["대시보드", "시각화", "상태"],
  },
  {
    id: "step-03-02",
    step: "STEP 03",
    sceneLabel: "3-2",
    imageLabel: "Report",
    imageSrc: "/images/technical-step-03-02.png",
    title: "취약점 진단 리포트",
    detailTitle: "자동 리포트",
    detailBody: "점검 결과와 조치 항목을 리포트로 정리해 후속 대응을 바로 진행할 수 있게 제공합니다.",
    tags: ["리포트", "자동화", "관리"],
  },
];

function SceneVisual({ scene }: { scene: TechnicalScene }) {
  return (
    <div className={styles.sceneVisual} aria-hidden="true">
      <div className={styles.visualHeader}>
        <span>{scene.step}</span>
        <span>AI SECURITY</span>
      </div>
      <div className={styles.sceneVisualBody}>
        <div
          className={styles.sceneImageCard}
          data-index={scene.sceneLabel}
          style={{ "--visual-image": `url(${scene.imageSrc})` } as CSSProperties}
        >
          <span>{scene.imageLabel}</span>
        </div>
        <div className={styles.visualTextPanel}>
          <strong>{scene.detailTitle}</strong>
          <p>{scene.detailBody}</p>
        </div>
      </div>
    </div>
  );
}

export function TechnicalScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion === true;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["16.6%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      technicalScenes.length - 1,
      Math.max(0, Math.floor(latest * technicalScenes.length)),
    );
    setActiveIndex(nextIndex);
  });

  const activeScene = technicalScenes[activeIndex];
  const sectionHeight = useMemo(() => `${technicalScenes.length * 100 + 100}vh`, []);

  return (
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
              {technicalScenes.map((scene, index) => (
                <motion.div
                  key={scene.id}
                  className={styles.visualLayer}
                  initial={false}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    y: activeIndex === index ? 0 : 28,
                    scale: activeIndex === index ? 1 : 0.98,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
                >
                  <SceneVisual scene={scene} />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.article
            key={activeScene.id}
            className={styles.textCard}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
          >
            <div className={styles.iconWrap} aria-hidden="true">
              <span />
            </div>
            <p className={styles.stepLabel}>
              {activeScene.step} / {activeScene.sceneLabel}
            </p>
            <h3>{activeScene.title}</h3>
            <div className={styles.detailList}>
              <div className={styles.detailItem}>
                <strong>{activeScene.detailTitle}</strong>
                <p>{activeScene.detailBody}</p>
              </div>
            </div>
            <div className={styles.tags}>
              {activeScene.tags.map((tag) => (
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
        {technicalScenes.map((scene) => (
          <article key={scene.id} className={styles.mobileStep}>
            <div className={styles.mobileVisual}>
              <SceneVisual scene={scene} />
            </div>
            <div>
              <p className={styles.stepLabel}>
                {scene.step} / {scene.sceneLabel}
              </p>
              <h3>{scene.title}</h3>
              <div className={styles.detailList}>
                <div className={styles.detailItem}>
                  <strong>{scene.detailTitle}</strong>
                  <p>{scene.detailBody}</p>
                </div>
              </div>
              <div className={styles.tags}>
                {scene.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

"use client";

// Figma 기준 화면 위에 커서, 리빌, 스크롤 인터랙션을 얹습니다.
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.css";
import { ResultSection } from "./ResultSection";

const heroLines = ["항만, AI, 블록체인 그리고", "사이버보안 분야의", "기술 선도에 앞장서고 있습니다."];

const pageSections = [
  { id: "history", label: "연혁", image: "/assets/smartm2m/history-reference.png", height: 2082 },
  { id: "news", label: "소식", image: "/assets/smartm2m/news-reference.png", height: 816 },
  { id: "footer", label: "푸터", image: "/assets/smartm2m/footer-reference.png", height: 676 },
];

const technicalTexts = [
  {
    eyebrow: "STEP 01",
    title: "생성형 AI 취약점 점검",
    body: "프롬프트, 모델 응답, 정책 우회 흐름을 순차적으로 점검해 AI 보안 취약점을 확인합니다.",
  },
  {
    eyebrow: "STEP 02",
    title: "AI 보안 위협 분석",
    body: "위협 요소를 분석하고 관리자에게 우선적으로 확인해야 할 보안 포인트를 정리합니다.",
  },
  {
    eyebrow: "STEP 03",
    title: "취약점 진단 리포트",
    body: "진단 결과를 시각화하고 조치 항목을 리포트로 정리해 후속 대응을 지원합니다.",
  },
];

const technicalScenes = [
  { id: "image-11", label: "이미지 11", group: 0, image: "/assets/smartm2m/technical-image-11.png" },
  { id: "image-12", label: "이미지 12", group: 0, image: "/assets/smartm2m/technical-image-12.png" },
  { id: "image-13", label: "이미지 13", group: 0, image: "/assets/smartm2m/technical-image-13.png" },
  { id: "image-2", label: "이미지 2", group: 1, image: "/assets/smartm2m/technical-image-2.png" },
  { id: "image-31", label: "이미지 31", group: 2, image: "/assets/smartm2m/technical-image-31.png" },
  { id: "image-32", label: "이미지 32", group: 2, image: "/assets/smartm2m/technical-image-32.png" },
];

function CursorFollower() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointerMove);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />;
}

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
              <span
                className={styles.revealChar}
                style={{ "--char-delay": delay } as React.CSSProperties}
                key={`${line}-${charIndex}`}
              >
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
      className={`${styles.referenceSection} ${styles.fadeSection}`}
      style={{ aspectRatio: `1920 / ${height}`, "--section-image": `url(${image})` } as React.CSSProperties}
      aria-label={label}
    />
  );
}

function TechnicalSceneCard({
  scene,
  index,
  progress,
}: {
  scene: (typeof technicalScenes)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segment = 1 / technicalScenes.length;
  const start = index * segment;
  const end = (index + 1) * segment;
  const fade = segment * 0.16;
  const enterY = index === 0 ? 0 : -150;
  const enterOpacity = index === 0 ? 1 : 0;
  const y = useTransform(progress, [start, start + fade, end - fade, end], [enterY, 0, 0, 150]);
  const opacity = useTransform(progress, [start, start + fade, end - fade, end], [enterOpacity, 1, 1, 0]);
  const scale = useTransform(progress, [start, start + fade, end - fade, end], [1, 1, 1, 0.99]);

  return (
    <motion.article className={styles.technicalVisualCard} style={{ y, opacity, scale }}>
      <span>{scene.label}</span>
      <img src={scene.image} alt="" />
    </motion.article>
  );
}

function TechnicalInteractionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeSceneRef = useRef(0);
  const snapLockRef = useRef(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sceneIndex = Math.min(technicalScenes.length - 1, Math.max(0, Math.floor(latest * technicalScenes.length)));
    activeSceneRef.current = sceneIndex;
    setActiveGroup(technicalScenes[sceneIndex].group);
  });

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const getSceneScrollTop = (index: number) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const maxScrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const step = maxScrollable / Math.max(1, technicalScenes.length - 1);

      return sectionTop + step * index;
    };

    const handleWheel = (event: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const isInsideTechnical = rect.top <= 2 && rect.bottom >= window.innerHeight - 2;

      if (!isInsideTechnical || snapLockRef.current || Math.abs(event.deltaY) < 18) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentScene = activeSceneRef.current;
      const nextScene = Math.min(technicalScenes.length - 1, Math.max(0, currentScene + direction));

      if (nextScene === currentScene) {
        return;
      }

      event.preventDefault();
      snapLockRef.current = true;
      window.scrollTo({
        top: getSceneScrollTop(nextScene),
        behavior: "smooth",
      });

      window.setTimeout(() => {
        snapLockRef.current = false;
      }, 720);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const activeText = technicalTexts[activeGroup];

  return (
    <section ref={sectionRef} id="technical" className={styles.technicalSection}>
      <div className={styles.technicalSticky}>
        <div className={styles.technicalBackground} aria-hidden="true" />
        <header className={styles.technicalTitle}>
          <div className={styles.technicalTitleIcon} aria-hidden="true" />
          <p>TECHNICAL</p>
          <h2>기술력</h2>
        </header>
        <div className={styles.technicalStage}>
          <div className={styles.technicalVisuals}>
            {technicalScenes.map((scene, index) => (
              <TechnicalSceneCard key={scene.id} scene={scene} index={index} progress={scrollYProgress} />
            ))}
          </div>
          <motion.article
            key={activeText.title}
            className={styles.technicalText}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease: "easeOut" }}
          >
            <div className={styles.technicalIcon} aria-hidden="true" />
            <p>{activeText.eyebrow}</p>
            <h3>{activeText.title}</h3>
            <span>{activeText.body}</span>
          </motion.article>
        </div>
        <div className={styles.technicalScrollCue} aria-hidden="true">
          <span className={styles.technicalScrollLine} />
          <img
            className={styles.technicalMouseIcon}
            src="/assets/smartm2m/technical-scroll-mouse.svg"
            alt=""
          />
          <span className={styles.technicalScrollText}>Scroll</span>
        </div>
      </div>
    </section>
  );
}

export function MainPage() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(`.${styles.fadeSection}`));
    const revealVisibleSections = () => {
      targets.forEach((target) => {
        if (target.classList.contains(styles.sectionRevealed)) {
          return;
        }

        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.82 && rect.bottom > window.innerHeight * 0.1) {
          target.classList.add(styles.sectionRevealed);
        }
      });
    };

    revealVisibleSections();
    window.addEventListener("scroll", revealVisibleSections, { passive: true });
    window.addEventListener("resize", revealVisibleSections);

    return () => {
      window.removeEventListener("scroll", revealVisibleSections);
      window.removeEventListener("resize", revealVisibleSections);
    };
  }, [reduceMotion]);

  return (
    <main className={styles.page}>
      <CursorFollower />
      <section className={styles.hero} aria-label="메인 히어로">
        <div className={styles.heroReference} aria-hidden="true" />
        <video
          className={styles.heroVideo}
          src="/assets/smartm2m/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
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

      <TechnicalInteractionSection />

      <ResultSection />

      {pageSections.map((section) => (
        <FigmaSection key={section.id} {...section} />
      ))}
    </main>
  );
}

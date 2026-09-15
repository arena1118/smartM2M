"use client";
// 배경 전환부터 솔루션, 메시지, 주요성과까지 하나의 스크롤 흐름을 구성합니다.
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import styles from "./SolutionJourney.module.css";

const assets = "/assets/smartm2m/current/";
const achievements = [
  { title: "우수성장 서비스\n강소기업 선정", icon: "laurel.svg" },
  { title: "SmartX 생성형 AI 기반\n사이버보안 솔루션", icon: "laurel.svg" },
  { title: "KCMVP\n인증 암호 개발", icon: "trophy.svg" },
  { title: "AI 레드팀\n테스트베드 및\nAI 포렌식 솔루션", icon: "trophy.svg" },
];

function Achievement({
  card,
  index,
  progress,
}: {
  card: (typeof achievements)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(
    progress,
    [0.8 + index * 0.022, 0.87 + index * 0.022],
    [0, 1],
  );
  const y = useTransform(
    progress,
    [0.8 + index * 0.022, 0.87 + index * 0.022],
    [24, 0],
  );
  return (
    <motion.article className={styles.card} style={{ opacity, y }}>
      <h3>{card.title}</h3>
      <img src={assets + card.icon} alt="" />
    </motion.article>
  );
}

export function SolutionJourney() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const background = useTransform(
    progress,
    [0, 0.13, 0.48, 0.59],
    ["#f9f9f9", "#071b31", "#071b31", "#353535"],
  );
  const texture = useTransform(progress, [0, 0.13, 0.48, 0.59], [0, 1, 1, 0]);
  const insetX = useTransform(progress, [0.44, 0.58], [0, 3.65]);
  const insetY = useTransform(progress, [0.44, 0.58], [0, 6]);
  const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% round 3px)`;
  const solutionOpacity = useTransform(
    progress,
    [0.14, 0.23, 0.37, 0.44],
    [0, 1, 1, 0],
  );
  const solutionY = useTransform(progress, [0.14, 0.23], [40, 0]);
  const solutionVisibility = useTransform(progress, (p) =>
    p >= 0.14 && p < 0.44 ? "visible" : "hidden",
  );
  const messageOpacity = useTransform(
    progress,
    [0.6, 0.66, 0.72, 0.78],
    [0, 1, 1, 0],
  );
  const messageY = useTransform(
    progress,
    [0.6, 0.66, 0.72, 0.78],
    [24, 0, 0, -24],
  );
  const resultOpacity = useTransform(progress, [0.8, 0.87], [0, 1]);
  const resultVisibility = useTransform(progress, (p) =>
    p >= 0.8 ? "visible" : "hidden",
  );

  return (
    <section
      ref={ref}
      id="technical"
      className={`${styles.journey} ${reduced ? styles.reduced : ""}`}
      aria-label="솔루션과 주요성과"
    >
      <div className={styles.stage}>
        <motion.div
          className={styles.background}
          style={{ backgroundColor: background, clipPath }}
          aria-hidden="true"
        >
          <motion.div className={styles.texture} style={{ opacity: texture }} />
        </motion.div>
        <motion.div
          className={styles.solution}
          style={{
            opacity: solutionOpacity,
            y: solutionY,
            visibility: solutionVisibility,
          }}
        >
          <header className={styles.heading}>
            <p>SOLUTION</p>
            <h2>주요 솔루션</h2>
          </header>
          <div className={styles.solutionBody}>
            <div className={styles.copy}>
              <img
                className={styles.smartx}
                src={assets + "smartx-white.svg"}
                alt="SmartX"
              />
              <h3>
                생성형 AI기반
                <br />
                <span>취약점 진단 플랫폼</span>
              </h3>
              <p>
                생성형 AI기반 취약점 진단 플랫폼 SmartX는
                <br className={styles.desktopBreak} /> 취약점 진단부터
                결과보고서 생성까지 자동화하며,
                <br className={styles.desktopBreak} /> 이를 통해 내재된
                사이버위협을 빠르게 발견하고
                <br className={styles.desktopBreak} /> 대응할 수 있습니다.
              </p>
              <a
                className={styles.cta}
                href="https://www.smartm2m.co.kr/ko/solutions/ai-security/pen-testing"
              >
                SmartX 더 보기 <span aria-hidden="true">›</span>
              </a>
            </div>
            <img
              className={styles.dashboard}
              src={assets + "dashboard.png"}
              alt="SmartX 네트워크 보안 점검 대시보드"
            />
          </div>
          <div className={styles.cue} aria-hidden="true">
            <img src="/assets/smartm2m/technical-scroll-mouse.svg" alt="" />
            <span>Scroll</span>
          </div>
        </motion.div>
        <motion.p
          className={styles.message}
          style={{ opacity: messageOpacity, y: messageY }}
        >
          소프트웨어 중심의 디지털 전환을 넘어,
          <br />
          이제는 AI 전환(AX)이
          <br />
          새로운 혁신의 중심으로 부상하고 있습니다.
        </motion.p>
        <motion.div
          id="result"
          className={styles.results}
          style={{ opacity: resultOpacity, visibility: resultVisibility }}
        >
          <span className={styles.watermark} aria-hidden="true">
            Smart Solutions
          </span>
          <header className={styles.resultHeading}>
            <p>ACHIEVEMENTS</p>
            <h2>주요성과</h2>
            <div>
              소프트웨어 중심의 디지털 전환을 넘어,
              <br />
              이제는 AI 전환(AX)이 새로운 혁신의 중심으로 부상하고 있습니다.
            </div>
          </header>
          <div className={styles.cards}>
            {achievements.map((card, index) => (
              <Achievement
                key={card.title}
                card={card}
                index={index}
                progress={progress}
              />
            ))}
            <a
              className={styles.historyLink}
              href="https://www.smartm2m.co.kr/ko/about#history"
            >
              SmartM2M
              <br />
              연혁&amp;인증
              <br />
              보러가기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

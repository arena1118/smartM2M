"use client";

// Figma 기준 화면 위에 커서, 리빌, 스크롤 인터랙션을 얹습니다.
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./MainPage.module.css";
import { HistorySection } from "./HistorySection";
import { ResultSection } from "./ResultSection";
import { PartnerLogos } from "./PartnerLogos";
import { NewsSection } from "./NewsSection";
import { TechnicalSection } from "./TechnicalSection";
import { FooterSection } from "./FooterSection";

const heroLines = ["항만, AI, 블록체인 그리고", "사이버보안 분야의", "기술 선도에 앞장서고 있습니다."];

const heroNavItems = ["회사소개", "항만물류 IT", "항만 블록체인", "AI 자율제조", "사이버보안", "소식", "인재채용", "지식자산"];

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

  const renderLines = () =>
    heroLines.map((line, lineIndex) => (
      <span className={styles.revealLine} key={line}>
        {line}
        {lineIndex < heroLines.length - 1 ? <br /> : null}
      </span>
    ));

  return (
    <h1 className={styles.revealHeadline} aria-label={heroLines.join(" ")}>
      <span className={styles.revealBase} aria-hidden="true">
        {renderLines()}
      </span>
      <span className={styles.revealTyping} aria-hidden="true">
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
      </span>
    </h1>
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
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <header className={styles.heroHeader}>
          <a className={styles.heroLogo} href="/" aria-label="SmartM2M 홈">
            <span className={styles.heroLogoMark} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.heroLogoText}>
              Smart<span>M2M</span>
            </span>
          </a>
          <nav className={styles.heroNav} aria-label="주요 메뉴">
            {heroNavItems.map((item) => (
              <a href="/" key={item}>
                {item}
              </a>
            ))}
          </nav>
          <div className={styles.heroContact}>
            <a href="/">Contact Us</a>
            <span className={styles.heroMenuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          </div>
        </header>
        <aside className={styles.heroRail} aria-hidden="true">
          <span>More</span>
          <span>Smart Solutions for a Secure Tomorrow, Empowering Customers to Achieve More</span>
          <span>Back to the top</span>
        </aside>
        <div className={styles.heroMediaFrame} aria-hidden="true">
          <video
            className={styles.heroVideo}
            src="/assets/smartm2m/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <motion.div
          className={styles.heroTextCover}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <p>Smart Solutions for a Secure Tomorrow, Empowering Customers to Achieve More</p>
          <RevealHeadline />
          <a className={styles.heroButton} href="/">
            홍보영상 보러가기
            <span aria-hidden="true">›</span>
          </a>
        </motion.div>
      </section>

      <TechnicalSection />

      <ResultSection />

      <PartnerLogos />

      <HistorySection />

      <NewsSection />

      <FooterSection />
    </main>
  );
}

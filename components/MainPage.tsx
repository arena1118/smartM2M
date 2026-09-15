"use client";
// 공개 사이트의 히어로와 최신 Figma 기반 스크롤 장면을 연결합니다.
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./MainPage.module.css";
import { SolutionJourney } from "./SolutionJourney";
import { PartnerLogos } from "./PartnerLogos";
import { NewsSection } from "./NewsSection";
import { FooterSection } from "./FooterSection";
const origin = "https://www.smartm2m.co.kr";
const menus = [
  ["회사소개", "/ko/about"],
  ["생성형 AI기반 사이버보안", "/ko/solutions/ai-security/pen-testing"],
  ["AI기반 KCMVP 평가", "/ko/solutions/ai-kcmvp/crypto-development"],
  ["AI 응용서비스", "/ko/solutions/ai-application/ocr"],
  ["자율 제조", "/ko/solutions/ai-smart-manufacturing/ops-optimization"],
  ["소식", "/ko/news"],
  ["인재채용", "/ko/careers"],
];
const lines = [
  "생성형 AI기반 취약점 진단 플랫폼",
  "SmartX를 통해",
  "보다 안전한 환경을 구축하세요.",
];
export function MainPage() {
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const brandVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reduced) video.current?.pause();
    else video.current?.play().catch(() => {});
  }, [reduced]);
  return (
    <main
      className={styles.page}
      onKeyDown={(e) => {
        if (e.key === "Escape") setMenuOpen(false);
      }}
    >
      <header className={styles.header}>
        <a href="#top" aria-label="SmartM2M 홈">
          <img
            className={styles.logo}
            src="/assets/smartm2m/current/logo.svg"
            alt="SmartM2M"
          />
        </a>
        <nav className={styles.nav} aria-label="주요 메뉴">
          {menus.map(([name, url]) => (
            <a key={name} href={origin + url}>
              {name}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <a className={styles.contact} href="mailto:smartm2m@smartm2m.co.kr">
            Contact Us
          </a>
          <a className={styles.language} href="#top" lang="ko">
            KR
          </a>
          <a className={styles.language} href={origin + "/en"} lang="en">
            EN
          </a>
          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            aria-label={menuOpen ? "전체 메뉴 닫기" : "전체 메뉴 열기"}
          >
            <span />
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav
          id="main-menu"
          className={styles.menu}
          aria-label="전체 메뉴"
          onKeyDown={(e) => {
            if (e.key === "Escape") setMenuOpen(false);
          }}
        >
          {menus.map(([name, url]) => (
            <a key={name} href={origin + url}>
              {name}
            </a>
          ))}
          <a href="mailto:smartm2m@smartm2m.co.kr">Contact Us</a>
        </nav>
      )}
      <aside className={styles.rail} aria-hidden="true">
        <span>AI-Powered Security, Protecting Tomorrow</span>
        <a href="#top" tabIndex={-1}>
          Back to the top ↑
        </a>
      </aside>
      <section id="top" className={styles.hero} aria-label="메인 히어로">
        <div className={styles.heroCopy}>
          <p>AI-Powered Security, Protecting Tomorrow</p>
          <h1 aria-label={lines.join(" ")}>
            {lines.map((line, row) => (
              <span
                className={styles.headlineRow}
                aria-hidden="true"
                key={line}
              >
                {Array.from(line).map((char, index) => (
                  <span
                    key={index}
                    className={`${styles.character} ${row === 1 && index < 6 ? styles.blue : ""}`}
                    style={
                      {
                        "--delay": `${0.2 + (row * 18 + index) * 0.035}s`,
                      } as React.CSSProperties
                    }
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <button
            className={styles.filmButton}
            onClick={() => dialog.current?.showModal()}
          >
            SmartM2M Brand Film <span aria-hidden="true">›</span>
          </button>
        </div>
        <video
          ref={video}
          className={styles.heroVideo}
          src="/assets/smartm2m/current/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="SmartM2M 메인 비주얼"
        />
      </section>
      <SolutionJourney />
      <PartnerLogos />
      <NewsSection />
      <FooterSection />
      <dialog
        ref={dialog}
        className={styles.dialog}
        onClose={() => brandVideo.current?.pause()}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          onClick={() => dialog.current?.close()}
          aria-label="브랜드 필름 닫기"
        >
          닫기 ×
        </button>
        <video
          ref={brandVideo}
          controls
          playsInline
          preload="none"
          src={origin + "/videos/ShortForm.mp4"}
          aria-label="SmartM2M 브랜드 필름"
        />
      </dialog>
    </main>
  );
}

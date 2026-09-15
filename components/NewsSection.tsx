"use client";
// 실제 소식을 사진과 호버 카드, 순환 탐색으로 표시합니다.
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import news from "../public/assets/smartm2m/current/news.json";
import styles from "./NewsSection.module.css";
export function NewsSection() {
  const [index, setIndex] = useState(news.length);
  const [resetting, setResetting] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (paused || reduced) return;
    const timer = setInterval(
      () =>
        setIndex((i) =>
          reduced
            ? news.length + ((i + 1) % news.length)
            : Math.min(i + 1, news.length * 2),
        ),
      4500,
    );
    return () => clearInterval(timer);
  }, [paused, reduced]);
  const visible = [...news, ...news, ...news];
  useEffect(() => {
    if (!resetting) return;
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(() => setResetting(false)),
    );
    return () => cancelAnimationFrame(frame);
  }, [resetting]);
  return (
    <section
      id="news"
      className={styles.section}
      aria-label="소식"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <header className={styles.header}>
        <div className={styles.title}>
          <p>
            SMARTM2M <span>NEWS</span>
          </p>
          <h2>소식</h2>
        </div>
        <a
          className={styles.moreLink}
          href="https://www.smartm2m.co.kr/ko/news?category=internal"
        >
          더보기 <img src="/assets/smartm2m/figma/news-more-arrow.svg" alt="" />
        </a>
      </header>
      <div
        className={styles.board}
        style={{
          transform: `translateX(calc(-1 * ${index} * (var(--card-width) + var(--card-gap))))`,
          transition: resetting || reduced ? "none" : undefined,
        }}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (index >= news.length * 2 || index < news.length) {
            setResetting(true);
            setIndex(news.length + (index % news.length));
          }
        }}
      >
        {visible.map((card, n) => (
          <a
            className={`${styles.card} ${n === index + 3 ? styles.featured : ""}`}
            href={`https://www.smartm2m.co.kr${card.href}`}
            key={n}
            tabIndex={n >= index && n < index + 4 ? 0 : -1}
            aria-label={card.text.slice(10)}
          >
            <img
              src={
                card.image.startsWith("/")
                  ? `https://www.smartm2m.co.kr${card.image}`
                  : card.image
              }
              alt=""
              loading="lazy"
            />
            <div className={styles.overlay}>
              <time>{card.text.slice(0, 10)}</time>
              <h3>{card.text.slice(10)}</h3>
              <img src="/assets/smartm2m/figma/news-card-arrow.svg" alt="" />
            </div>
          </a>
        ))}
      </div>
      <div className={styles.controls}>
        <span className={styles.progress}>
          <span
            style={{
              width: `${(((index % news.length) + 1) / news.length) * 100}%`,
            }}
          />
        </span>
        <div className={styles.arrows}>
          <button
            type="button"
            aria-label="이전 소식"
            onClick={() =>
              setIndex((i) =>
                reduced
                  ? news.length + ((i - 1 + news.length) % news.length)
                  : Math.max(i - 1, news.length - 1),
              )
            }
          >
            <img src="/assets/smartm2m/figma/news-before.svg" alt="" />
          </button>
          <button
            type="button"
            aria-label="다음 소식"
            onClick={() =>
              setIndex((i) =>
                reduced
                  ? news.length + ((i + 1) % news.length)
                  : Math.min(i + 1, news.length * 2),
              )
            }
          >
            <img src="/assets/smartm2m/figma/news-after.svg" alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

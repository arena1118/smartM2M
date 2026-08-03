// 최신 소식 섹션을 Figma 기준의 정적 카드 배열로 퍼블리싱합니다.
import { useState } from "react";
import styles from "./NewsSection.module.css";

type NewsCard = {
  name: string;
  image?: string;
  dark?: boolean;
  crop?: {
    width: number;
    height: number;
    left: number;
    top: number;
    opacity?: number;
  };
};

const newsCards: NewsCard[] = [
  {
    name: "6",
    image: "/assets/smartm2m/figma/news-figma-30.png",
    dark: true,
    crop: { width: 798, height: 478, left: -89, top: -2, opacity: 0.3 },
  },
  {
    name: "1",
    image: "/assets/smartm2m/figma/news-figma-24.png",
    crop: { width: 681, height: 511, left: -155, top: -40 },
  },
  {
    name: "2",
    image: "/assets/smartm2m/figma/news-figma-28.png",
    crop: { width: 806, height: 471, left: -167, top: -50 },
  },
  {
    name: "3",
    image: "/assets/smartm2m/figma/news-figma-29.png",
    crop: { width: 691, height: 478, left: -111, top: -2 },
  },
  {
    name: "4",
  },
  {
    name: "5",
    image: "/assets/smartm2m/figma/news-figma-24.png",
    dark: true,
    crop: { width: 681, height: 511, left: -155, top: -40, opacity: 0.3 },
  },
];

export function NewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + newsCards.length) % newsCards.length);
  };

  return (
    <section id="news" className={styles.section} aria-label="소식">
      <header className={styles.header}>
        <div className={styles.title}>
          <p>
            SMARTM2M <span>NEWS</span>
          </p>
          <h2>소식</h2>
        </div>
        <a className={styles.moreLink} href="#news">
          더보기
          <img src="/assets/smartm2m/figma/news-more-arrow.svg" alt="" />
        </a>
      </header>

      <div className={styles.board} style={{ transform: `translateX(-${activeIndex * 350}px)` }}>
        {newsCards.map((card) => (
          <article className={styles.cardShell} aria-label={`소식 카드 ${card.name}`} key={card.name}>
            {card.image && card.crop ? (
              <div className={`${styles.imageCard} ${card.dark ? styles.darkCard : ""}`}>
                <img
                  src={card.image}
                  alt=""
                  style={
                    {
                      width: `${card.crop.width}px`,
                      height: `${card.crop.height}px`,
                      left: `${card.crop.left}px`,
                      top: `${card.crop.top}px`,
                      opacity: card.crop.opacity ?? 1,
                    } as React.CSSProperties
                  }
                />
              </div>
            ) : (
              <div className={styles.featuredCard}>
                <time>2024-10-28</time>
                <h3>블록체인 기반 환적 모니터링 시스템(Port-i) 구축 및 상용화</h3>
                <img src="/assets/smartm2m/figma/news-card-arrow.svg" alt="" />
              </div>
            )}
          </article>
        ))}
      </div>

      <div className={styles.controls}>
        <span className={styles.progress}>
          <span style={{ width: `${165 + activeIndex * 20}px` }} />
        </span>
        <div className={styles.arrows}>
          <button type="button" aria-label="이전 소식" onClick={() => move(-1)}>
            <img src="/assets/smartm2m/figma/news-before.svg" alt="" />
          </button>
          <button type="button" aria-label="다음 소식" onClick={() => move(1)}>
            <img src="/assets/smartm2m/figma/news-after.svg" alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}

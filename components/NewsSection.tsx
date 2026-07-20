"use client";

// 최신 소식 카드 슬라이더의 정적 퍼블리싱 구조를 제공합니다.
import styles from "./NewsSection.module.css";

type NewsCard = {
  title: string;
  date: string;
  image?: string;
  featured?: boolean;
};

const newsCards: NewsCard[] = [
  {
    title: "부산항 환적정보, 블록체인 기술로 실시간 공유한다",
    date: "2024.12.06",
    image: "/assets/smartm2m/news-thumb-04.png",
  },
  {
    title: "블록체인·AI 기술로 물류 혁신, 북극항로 개척에도 앞장",
    date: "2025.09.15",
    image: "/assets/smartm2m/news-thumb-01.png",
  },
  {
    title: "부산항 ‘포트아이’ 안착…플랫폼 고도화도 착착",
    date: "2025.09.08",
    image: "/assets/smartm2m/news-thumb-02.png",
  },
  {
    title: "김호원 스마트엠투엠 대표 “제조업 탄소 감축, 블록체인이 해답”",
    date: "2025.04.16",
    image: "/assets/smartm2m/news-thumb-03.png",
  },
  {
    title: "블록체인 기반 환적 모니터링 시스템(Port-i) 구축 및 상용화",
    date: "2024.10.28",
    featured: true,
  },
  {
    title: "블록체인·AI 기술로 물류 혁신, 북극항로 개척에도 앞장",
    date: "2025.09.15",
    image: "/assets/smartm2m/news-thumb-01.png",
  },
];

export function NewsSection() {
  return (
    <section id="news" className={styles.section} aria-label="소식">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p>SMARTM2M NEWS</p>
            <h2>소식</h2>
          </div>
          <a className={styles.moreLink} href="/">
            더보기
            <span aria-hidden="true">→</span>
          </a>
        </header>

        <div className={styles.board}>
          {newsCards.map((card, index) => (
            <article className={`${styles.card} ${card.featured ? styles.featured : ""}`} key={`${card.title}-${index}`}>
              {card.image ? (
                <img src={card.image} alt="" />
              ) : (
                <div className={styles.textCard}>
                  <time>{card.date.replaceAll(".", "-")}</time>
                  <h3>{card.title}</h3>
                  <span aria-hidden="true">↗</span>
                </div>
              )}
              <div className={styles.caption}>
                <h3>{card.title}</h3>
                <time>{card.date}</time>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.controls} aria-hidden="true">
          <span className={styles.progress}>
            <span />
          </span>
          <div className={styles.arrows}>
            <button type="button" tabIndex={-1}>←</button>
            <button type="button" tabIndex={-1}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}

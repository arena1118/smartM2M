// 핵심성과 섹션을 피그마 기준의 정적 카드 블록으로 퍼블리싱합니다.
import styles from "./ResultSection.module.css";

type ResultCard = {
  year: string;
  title: string[];
  tone?: "red";
};

const leftCards: ResultCard[] = [
  { year: "2025", title: ["KCMVP", "인증 암호 개발"], tone: "red" },
  { year: "2025", title: ["Agentic AI", "시스템 구축"] },
  { year: "2025", title: ["지능형", "Penetration Testing", "솔루션"] },
];

const rightCards: ResultCard[] = [
  { year: "2025", title: ["AI 팩토리", "전문기업 선정"] },
  { year: "2025", title: ["보안점검 자동화", "OCR 솔루션"], tone: "red" },
  { year: "2025", title: ["산업(OT) 특화", "보안관제", "자동화 솔루션"] },
];

function ResultCardItem({ card }: { card: ResultCard }) {
  return (
    <article className={`${styles.card} ${card.tone === "red" ? styles.redCard : ""}`}>
      <span className={styles.pill}>{card.year}</span>
      <h3>
        {card.title.map((line, index) => (
          <span key={line}>
            {line}
            {index < card.title.length - 1 ? <br /> : null}
          </span>
        ))}
      </h3>
      <span className={styles.cardMark} aria-hidden="true" />
    </article>
  );
}

function CardColumn({ cards, lowered }: { cards: ResultCard[]; lowered?: boolean }) {
  return (
    <div className={`${styles.column} ${lowered ? styles.lowered : ""}`}>
      {cards.map((card) => (
        <ResultCardItem card={card} key={card.title.join("-")} />
      ))}
    </div>
  );
}

export function ResultSection() {
  return (
    <section id="result" className={styles.section} aria-label="핵심성과">
      <div className={styles.panel}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>RESULT</p>
          <h2>핵심성과</h2>
          <p className={styles.description}>
            소프트웨어 중심의 디지털 전환을 넘어,
            <br />
            이제는 AI 전환(AX)이 새로운 혁신의
            <br />
            중심으로 부상하고 있습니다.
          </p>
          <div className={styles.ring} aria-hidden="true" />
        </div>
        <div className={styles.cards} aria-label="핵심성과 카드">
          <CardColumn cards={leftCards} />
          <CardColumn cards={rightCards} lowered />
        </div>
      </div>
    </section>
  );
}

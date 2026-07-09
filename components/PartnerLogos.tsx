"use client";

// 핵심성과와 연혁 사이의 파트너/기관 로고 배너를 가로 무한 슬라이딩으로 표시합니다.
import styles from "./PartnerLogos.module.css";

const partnerLogos = [
  { name: "부산광역시", file: "busan-city.png" },
  { name: "부산대 융합보안대학원", file: "pnu-security.png" },
  { name: "부산대학교", file: "pnu.png" },
  { name: "부산테크노파크", file: "btp.png" },
  { name: "부산항만공사", file: "bpa.png" },
  { name: "블록체인플랫폼연구센터", file: "blockchain-center.png" },
  { name: "컨테인어스", file: "containearth.png" },
  { name: "울산항만공사", file: "ulsan-pa.png" },
  { name: "정보통신기획평가원", file: "iitp.png" },
  { name: "한국남부발전", file: "kospo.png" },
  { name: "한국연구재단", file: "nrf.png" },
  { name: "한국인터넷진흥원", file: "kisa.png" },
  { name: "한국전자통신연구원", file: "etri.png" },
  { name: "스마트큐브", file: "smartcube.png" },
];

function LogoRow({ direction }: { direction: "right" | "left" }) {
  return (
    <div className={styles.row}>
      <div className={`${styles.track} ${direction === "right" ? styles.trackRight : styles.trackLeft}`}>
        {[0, 1].map((copy) => (
          <ul className={styles.list} key={copy} aria-hidden={copy === 1}>
            {partnerLogos.map((logo) => (
              <li className={styles.item} key={`${copy}-${logo.file}`}>
                <img src={`/assets/smartm2m/partners/${logo.file}`} alt={copy === 0 ? logo.name : ""} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function PartnerLogos() {
  return (
    <section className={styles.section} aria-label="파트너 및 협력기관">
      <LogoRow direction="right" />
      <LogoRow direction="left" />
    </section>
  );
}

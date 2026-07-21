// 핵심성과와 연혁 사이의 파트너/기관 로고를 정적 행으로 표시합니다.
import styles from "./PartnerLogos.module.css";

const topLogos = [
  { name: "부산광역시", file: "busan-city.png" },
  { name: "부산대 융합보안대학원", file: "pnu-security.png" },
  { name: "부산대학교", file: "pnu.png" },
  { name: "부산테크노파크", file: "btp.png" },
  { name: "부산항만공사", file: "bpa.png" },
  { name: "블록체인플랫폼연구센터", file: "blockchain-center.png" },
  { name: "컨테인어스", file: "containearth.png" },
];

const bottomLogos = [
  { name: "울산항만공사", file: "ulsan-pa.png" },
  { name: "정보통신기획평가원", file: "iitp.png" },
  { name: "한국남부발전", file: "kospo.png" },
  { name: "한국연구재단", file: "nrf.png" },
  { name: "한국인터넷진흥원", file: "kisa.png" },
  { name: "한국전자통신연구원", file: "etri.png" },
  { name: "스마트큐브", file: "smartcube.png" },
];

function LogoRow({ logos, offset }: { logos: typeof topLogos; offset?: boolean }) {
  return (
    <ul className={`${styles.row} ${offset ? styles.offset : ""}`}>
      {logos.map((logo) => (
        <li className={styles.item} key={logo.file}>
          <img src={`/assets/smartm2m/partners/${logo.file}`} alt={logo.name} />
        </li>
      ))}
    </ul>
  );
}

export function PartnerLogos() {
  return (
    <section className={styles.section} aria-label="파트너 및 협력기관">
      <LogoRow logos={topLogos} />
      <LogoRow logos={bottomLogos} offset />
    </section>
  );
}

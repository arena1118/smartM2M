// 협력기관 로고를 두 줄의 끊김 없는 슬라이드로 표시합니다.
import styles from "./PartnerLogos.module.css";
const logos = [
  ["부산항만공사", "bpa.png"],
  ["부산테크노파크", "btp.png"],
  ["부산광역시", "busan-city.png"],
  ["한국전자통신연구원", "etri.png"],
  ["정보통신기획평가원", "iitp.png"],
  ["블록체인플랫폼연구센터", "blockchain-center.png"],
  ["한국인터넷진흥원", "kisa.png"],
  ["한국남부발전", "kospo.png"],
  ["한국연구재단", "nrf.png"],
  ["부산대학교", "pnu.png"],
  ["스마트큐브", "smartcube.png"],
  ["울산항만공사", "ulsan-pa.png"],
];
export function PartnerLogos() {
  return (
    <section className={styles.section} aria-label="파트너 및 협력기관">
      {[0, 1].map((row) => (
        <div
          className={`${styles.track} ${row ? styles.offset : ""}`}
          key={row}
        >
          {[0, 1].map((copy) => (
            <ul
              className={styles.row}
              key={copy}
              aria-hidden={copy === 1 || row === 1}
            >
              {logos.map(([name, file]) => (
                <li className={styles.item} key={file}>
                  <img src={`/assets/smartm2m/partners/${file}`} alt={name} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </section>
  );
}

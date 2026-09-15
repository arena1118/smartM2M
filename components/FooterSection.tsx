// 푸터 회사 정보와 링크 영역을 Figma 기준 DOM으로 퍼블리싱합니다.
import styles from "./FooterSection.module.css";

const addresses = [
  [
    "본사",
    "부산광역시 해운대구 센텀중앙로 97 센텀스카이비즈 A동 701호, 702호, 703호, 709호",
  ],
  [
    "인도네시아 지사",
    "HQuarter Business Residence, 16th Floor Jl. Asia Afrika No. 158, Bandung, Jawa Barat 40261",
  ],
  ["중앙동 지사", "부산광역시 중구 중앙대로 11, 부산무역회관 505호"],
  ["서울 지사", "서울특별시 강남구 봉은사로 37길 9, 3032호"],
];

const solutionLinks = [
  ["생성형 AI기반 사이버보안", "solutions/ai-security/pen-testing"],
  ["AI기반 KCMVP 평가", "solutions/ai-kcmvp/crypto-development"],
  ["AI 응용서비스", "solutions/ai-application/ocr"],
  ["자율 제조", "solutions/ai-smart-manufacturing/ops-optimization"],
];
const serviceLinks = [
  ["회사소개", "about"],
  ["소식", "news"],
  ["인재채용", "careers"],
];

export function FooterSection() {
  return (
    <footer id="footer" className={styles.footer} aria-label="푸터">
      <div className={styles.content}>
        <div className={styles.top}>
          <a className={styles.logo} href="/" aria-label="SmartM2M 홈">
            <img src="/assets/smartm2m/current/logo.svg" alt="SmartM2M" />
          </a>
          <span className={styles.line} aria-hidden="true" />
          <a className={styles.topButton} href="#top" aria-label="맨 위로 이동">
            <img src="/assets/smartm2m/figma/footer-top-arrow.svg" alt="" />
          </a>
        </div>

        <div className={styles.body}>
          <div className={styles.mainRow}>
            <section className={styles.company} aria-label="회사 정보">
              <h2>COMPANY</h2>
              <dl className={styles.addressGrid}>
                {addresses.map(([label, value]) => (
                  <div className={styles.addressItem} key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className={styles.quickMenus}>
              <nav className={styles.quickMenu} aria-label="솔루션">
                <h3>SOLUTIONS</h3>
                {solutionLinks.map(([label, path]) => (
                  <a href={`https://www.smartm2m.co.kr/ko/${path}`} key={path}>
                    {label}
                  </a>
                ))}
              </nav>

              <nav className={styles.quickMenu} aria-label="서비스">
                <h3>SERVICES</h3>
                {serviceLinks.map(([label, path]) => (
                  <a href={`https://www.smartm2m.co.kr/ko/${path}`} key={path}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className={styles.bottom}>
            <p>
              <span>대표 : 김호원</span>
              <span>대표번호 : 051-518-2143</span>
              <span>팩스 : 051-793-0677</span>
            </p>
            <p>SmartM2M. Co., Ltd. © All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

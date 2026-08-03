// 푸터 회사 정보와 링크 영역을 Figma 기준 DOM으로 퍼블리싱합니다.
import styles from "./FooterSection.module.css";

const addresses = [
  ["본사", "부산광역시 해운대구 센텀중앙로 97 센텀스카이비즈 A동 701호, 702호, 703호, 709호"],
  ["인도네시아 지사", "9th Floor Menara Asia Afrika, Jl. Asia Afrika 133-137, Bandung, Jawa Barat, Indonesia"],
  ["문현금융단지 지사", "부산광역시 남구 문현금융로 40, 21층 5호실"],
  ["사무소", "부산광역시 중구 충장대로 11, 부산무역회관 4층 407호"],
];

const solutionLinks = ["항만물류 IT 시스템", "항만 블록체인", "항만 사이버보안", "항만 민원대응 AI 솔루션"];
const serviceLinks = ["회사소개", "소식", "인재채용"];

export function FooterSection() {
  return (
    <footer id="footer" className={styles.footer} aria-label="푸터">
      <div className={styles.content}>
        <div className={styles.top}>
          <a className={styles.logo} href="/" aria-label="SmartM2M 홈">
            <span className={styles.logoMark} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className={styles.logoText}>SmartM2M</span>
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
                {solutionLinks.map((link) => (
                  <a href="/" key={link}>
                    {link}
                  </a>
                ))}
              </nav>

              <nav className={styles.quickMenu} aria-label="서비스">
                <h3>SERVICES</h3>
                {serviceLinks.map((link) => (
                  <a href="/" key={link}>
                    {link}
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

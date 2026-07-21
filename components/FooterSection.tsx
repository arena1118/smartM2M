// 푸터 회사 정보와 링크 영역을 DOM으로 퍼블리싱합니다.
import styles from "./FooterSection.module.css";

const solutionLinks = ["항만물류 IT", "항만 블록체인", "AI 자율제조", "사이버보안"];
const serviceLinks = ["회사소개", "소식", "인재채용", "지식자산"];

export function FooterSection() {
  return (
    <footer className={styles.footer} aria-label="푸터">
      <div className={styles.inner}>
        <div className={styles.topLine}>
          <a className={styles.logo} href="/">
            Smart<span>M2M</span>
          </a>
          <a className={styles.topButton} href="#top" aria-label="맨 위로 이동">
            TOP
            <span aria-hidden="true">↑</span>
          </a>
        </div>

        <div className={styles.content}>
          <section className={styles.company} aria-label="회사 정보">
            <h2>SmartM2M</h2>
            <p>
              주식회사 스마트엠투엠
              <br />
              부산광역시 해운대구 센텀중앙로 48
              <br />
              센텀임페리얼타워 1402호
            </p>
            <p>
              TEL. 051-747-8565
              <br />
              EMAIL. smartm2m@smartm2m.co.kr
            </p>
          </section>

          <nav className={styles.navGroup} aria-label="솔루션">
            <h3>SOLUTIONS</h3>
            {solutionLinks.map((link) => (
              <a href="/" key={link}>
                {link}
              </a>
            ))}
          </nav>

          <nav className={styles.navGroup} aria-label="서비스">
            <h3>SERVICES</h3>
            {serviceLinks.map((link) => (
              <a href="/" key={link}>
                {link}
              </a>
            ))}
          </nav>
        </div>

        <p className={styles.copy}>COPYRIGHT 2026 SMARTM2M. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}

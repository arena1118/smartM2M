// 기술력 섹션을 피그마 기준의 정적 화면으로 퍼블리싱합니다.
import styles from "./TechnicalSection.module.css";

import { useState } from "react";

const featureTabs = [
  {
    label: "취약점 진단",
    title: "생성형 AI 보안 검증 솔루션",
    description: "프롬프트, 모델 응답, 정책 우회 흐름을 순차적으로 점검해 AI 보안 취약점을 확인합니다.",
    image: "/assets/smartm2m/technical-image-11.png",
  },
  {
    label: "분석",
    title: "AI 보안 위협 분석",
    description: "공격 흐름과 모델의 응답 결과를 분석해 위험 패턴과 우선 대응 항목을 확인합니다.",
    image: "/assets/smartm2m/technical-image-12.png",
  },
  {
    label: "리포트",
    title: "보안 검증 리포트",
    description: "진단 결과를 시각화하고 조치 항목을 리포트로 정리해 후속 대응을 지원합니다.",
    image: "/assets/smartm2m/technical-image-13.png",
  },
];

export function TechnicalSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeFeature = featureTabs[activeTab];

  return (
    <section id="technical" className={styles.section} aria-label="기술력">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span className={styles.iconBox} aria-hidden="true">
            <span />
          </span>
          <p>TECHNICAL</p>
          <h2>기술력</h2>
        </header>

        <div className={styles.visualWrap}>
          <div className={styles.shadowLayer} aria-hidden="true" />
          <img className={styles.dashboard} src={activeFeature.image} alt="" />
        </div>

        <aside className={styles.copy}>
          <span className={styles.copyIcon} aria-hidden="true" />
          <h3 key={activeFeature.title}>{activeFeature.title}</h3>
          <p key={activeFeature.description}>{activeFeature.description}</p>
          <div className={styles.tabs} aria-label="기술력 분류">
            {featureTabs.map((tab, index) => (
              <button
                className={index === activeTab ? styles.activeTab : ""}
                type="button"
                aria-pressed={index === activeTab}
                key={tab.label}
                onClick={() => setActiveTab(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <div className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollLine} />
          <span className={styles.mouse} />
          <span className={styles.scrollText}>Scroll</span>
        </div>
      </div>
    </section>
  );
}

"use client";

// 연혁 섹션의 접힘과 펼침 인터랙션을 관리합니다.
import { useState } from "react";
import styles from "./HistorySection.module.css";

type HistoryItem = {
  text: string;
  featured?: boolean;
};

type HistoryYear = {
  year: string;
  items: HistoryItem[];
};

type HistoryGroup = {
  range: string;
  years: HistoryYear[];
};

const historyGroups: HistoryGroup[] = [
  {
    range: "2025~2024",
    years: [
      {
        year: "2025",
        items: [
          { text: "AI 팩토리 전문기업 선정", featured: true },
          { text: "2025-2027 부산항 물류 플랫폼(체인포털)유지보수 용역" },
          { text: "온디바이스 AI 및 Virtual Commissioning 기반 제조혁신 플랫폼 개발 및 실증", featured: true },
          { text: "선박 사이버 침해사고 분석 기술 및 탐지·대응 기술 개발", featured: true },
          { text: "조선소-협력사 디지털 생산협업 클라우드 서버 구축 및 플랫폼 개발" },
          { text: "블록체인 기반 해운항만물류 실시간 정보 공유 플랫폼 고도화" },
          { text: "객체식별 AI 모델 신뢰성 검증 기술 실증" },
          { text: "부산항 물류통합플랫폼(체인포털)활성화 및 고도화 사업" },
          { text: "AI 공격 데이터셋 구축 및 보안점검 도구 개발" },
          { text: "자율제조 운영을 위한 SDM 플랫폼 기술 개발" },
        ],
      },
      {
        year: "2024",
        items: [
          { text: "부산정보산업진흥원(BIPA)-동남권정보보호클러스터 구축사업 우수과제 선정", featured: true },
          { text: "부산테크노파크(BTP)-블록체인 특화 클러스터 조성사업 유공 포상", featured: true },
          { text: "한국산업기술진흥원(KIAT)-지역혁신클러스터 사업 우수사례 기업 선정", featured: true },
          { text: "2024년 체인포털 24시간 콜센터 및 시스템 운영 용역" },
          { text: "JAVA언어 KCMVP 암호모듈 DnACrypto 개발 용역" },
          { text: "리눅스 커널 KCMVP 암호모듈 Sniper Crypto Lite V1.2 구현 및 검증대응 용역" },
          { text: "FPGA기반 암호모듈의 동작시험 자동화 방법론 연구" },
          { text: "그린스마트빌딩 메가스테이션 에너지 및 안전 관리 플랫폼 기술개발 및 실증" },
          { text: "선박 및 항만의 국내외 보안 규정 대응을 위한 사이버보안 핵심 기술 개발" },
          { text: "블록체인 기반 해운항만물류 실시간 정보 공유 플랫폼 구축" },
          { text: "통신모듈 MAC Layer 암복호화 모듈(KCMVP 검증 암호) 연동 및 KCMVP 검증" },
          { text: "국방 AI 보안성검증기술 확보 및 보안제도 시행방안 연구용역" },
          { text: "조선소-협력사 디지털 생산협업 클라우드 서버 구축 및 플랫폼 개발" },
          { text: "체인포털 중장기 고도화 ISP 및 민간 비즈니스 플랫폼 시스템 설계 용역" },
          { text: "청년친화강소기업 선정", featured: true },
        ],
      },
    ],
  },
  {
    range: "2023~2020",
    years: [
      {
        year: "2023",
        items: [
          { text: "한국정보보호산업협회 회원 등록", featured: true },
          { text: "부산서비스 강소기업 선정", featured: true },
        ],
      },
      {
        year: "2022",
        items: [
          { text: "대구 지점 설립", featured: true },
          { text: "인도네시아 지사 설립", featured: true },
          { text: "부산국제금융센터점 설립", featured: true },
        ],
      },
      {
        year: "2021",
        items: [{ text: "기술혁신형 중소기업(Inno-Biz) 인증", featured: true }],
      },
      {
        year: "2020",
        items: [
          { text: "AI 바우처 지원사업 공급기업 선정(자연어 처리, 챗봇 기술)", featured: true },
          { text: "병역지정업체 선정", featured: true },
        ],
      },
    ],
  },
  {
    range: "2019~2016",
    years: [
      {
        year: "2019",
        items: [
          { text: "연구개발 서비스업 등록", featured: true },
          { text: "연구개발 서비스업 등록", featured: true },
        ],
      },
      {
        year: "2018",
        items: [{ text: "기업부설연구소 설립", featured: true }],
      },
    ],
  },
  {
    range: "2015~2012",
    years: [
      {
        year: "2012",
        items: [
          { text: "소프트웨어 사업자 신고", featured: true },
          { text: "공공기관 경쟁입찰 참가자 등록", featured: true },
        ],
      },
    ],
  },
];

export function HistorySection() {
  const [openRange, setOpenRange] = useState<string | null>(null);

  return (
    <section id="history" className={styles.section} aria-label="연혁">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>HISTORY</p>
        <h2>연혁</h2>
        <div className={styles.groups}>
          {historyGroups.map((group) => {
            const isOpen = openRange === group.range;

            return (
              <article className={`${styles.group} ${isOpen ? styles.open : ""}`} key={group.range}>
                <div className={styles.range}>{group.range}</div>
                <div className={styles.timeline}>
                  {group.years.map((year) => (
                    <div className={styles.yearRow} key={year.year}>
                      <div className={styles.year}>
                        <span>{year.year}</span>
                      </div>
                      <ul>
                        {year.items.map((item, itemIndex) => {
                          const itemClassName = item.featured
                            ? styles.featured
                            : isOpen
                              ? styles.detailVisible
                              : undefined;

                          return (
                            <li className={itemClassName} key={`${year.year}-${itemIndex}`}>
                              <span>{item.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <button
                  className={styles.toggle}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenRange(isOpen ? null : group.range)}
                >
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  {isOpen ? "주요항목만 보기" : "전체보기"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

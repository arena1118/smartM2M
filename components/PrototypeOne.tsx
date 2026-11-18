"use client";
// Figma 1·2·3·4번 시안의 공통 기업 소개 화면과 슬라이드·아코디언 동작을 제공합니다.
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import styles from "./PrototypeOne.module.css";
import { officialNews } from "./officialNews";

const base = "/assets/sian-a/";
const asset = (name: string) =>
  base + "assets/" + name.replace(/\.png$/, ".webp");
const origin = "https://www.smartm2m.co.kr";
const security = origin + "/ko/solutions/ai-security/pen-testing";
const blockchain = origin + "/ko/solutions/blockchain/cicd";
const menus = [
  ["회사소개", origin + "/ko/about"],
  ["생성형 AI기반 사이버보안", security],
  ["AI기반 KCMVP 평가", origin + "/ko/solutions/ai-kcmvp/crypto-development"],
  ["AI 응용서비스", origin + "/ko/solutions/ai-application/ocr"],
  [
    "자율 제조",
    origin + "/ko/solutions/ai-smart-manufacturing/quality-automation",
  ],
  ["항만 블록체인", origin + "/ko/solutions/port/process-optimization"],
  ["소식", "#news"],
  ["인재채용", origin + "/ko/careers"],
];
const officialMenus = [
  {
    name: "회사소개",
    items: [
      ["비전", "/ko/about#vision"],
      ["핵심가치", "/ko/about#core-values"],
      ["연혁", "/ko/about#history"],
      ["지식재산", "/ko/about#intellectual-property"],
      ["오시는 길", "/ko/about#location"],
    ],
  },
  {
    name: "생성형 AI기반 사이버보안",
    items: [
      [
        "SmartX",
        "/ko/solutions/ai-security/pen-testing",
        "AI 에이전트 기반 자율 취약점 진단 플랫폼",
      ],
      ["생성형 AI 보안", "/ko/solutions/ai-security/generative"],
      [
        "AI 레드팀 테스트베드 및 AI 포렌식 솔루션",
        "/ko/solutions/ai-security/red-team-forensics",
      ],
      ["비전 AI 보안", "/ko/solutions/ai-security/vision"],
      ["도메인 특화 AI 보안", "/ko/solutions/ai-security/domain"],
      ["지능형 SIEM/SOAR", "/ko/solutions/ai-security/siem-soar"],
      ["AI 보안 컨설팅", "/ko/solutions/ai-security/consulting"],
      ["모빌리티 사이버보안 솔루션", "/ko/solutions/cybersecurity/mobility"],
      ["항만 사이버보안 솔루션", "/ko/solutions/cybersecurity/port"],
    ],
  },
  {
    name: "AI기반 KCMVP 평가",
    items: [
      ["KCMVP 인증 암호 개발", "/ko/solutions/ai-kcmvp/crypto-development"],
      ["KCMVP 컨설팅", "/ko/solutions/ai-kcmvp/consulting"],
      [
        "AI기반 KCMVP 검증 및 평가",
        "/ko/solutions/ai-kcmvp/verification-evaluation",
      ],
      [
        "LLM/에이전트 기반 암호 검증",
        "/ko/solutions/ai-kcmvp/llm-agent-crypto-verification",
      ],
    ],
  },
  {
    name: "AI 응용서비스",
    items: [
      ["AI OCR", "/ko/solutions/ai-application/ocr"],
      ["AI Agent", "/ko/solutions/ai-application/agent"],
    ],
  },
  {
    name: "자율 제조",
    items: [
      [
        "공정 운영시스템 최적화",
        "/ko/solutions/ai-smart-manufacturing/ops-optimization",
      ],
      [
        "공정 품질 관리 자동화",
        "/ko/solutions/ai-smart-manufacturing/quality-automation",
      ],
      [
        "작업자 안전 검사",
        "/ko/solutions/ai-smart-manufacturing/worker-safety",
      ],
      [
        "공정 예지보전",
        "/ko/solutions/ai-smart-manufacturing/predictive-maintenance",
      ],
    ],
  },
  {
    name: "항만 블록체인",
    items: [
      [
        "ACCIO",
        "/ko/solutions/blockchain/cicd",
        "클라우드 기반 블록체인 구축 및 개발 환경",
      ],
      [
        "항만물류 특화 블록체인 플랫폼",
        "/ko/solutions/blockchain/port-logistics-platform",
      ],
      ["DID 기반 사용자 인증/인가", "/ko/solutions/blockchain/did-auth"],
    ],
  },
  {
    name: "소식",
    items: [
      ["언론보도", "/ko/news"],
      ["사내소식", "/ko/news?category=internal"],
    ],
  },
];

function OfficialMenuItems({ expanded = false }: { expanded?: boolean }) {
  return (
    <>
      {officialMenus.map(({ name, items }) => (
        <details
          key={name}
          name={expanded ? "official-menu" : "official-header"}
          className={styles.menuGroup}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.currentTarget.open = false;
              event.currentTarget.querySelector("summary")?.focus();
            }
          }}
        >
          <summary>{name}</summary>
          <div className={styles.submenu}>
            {items.map(([label, path, description]) => (
              <a key={path} href={origin + path}>
                {label}
                {description && <small>{description}</small>}
              </a>
            ))}
          </div>
        </details>
      ))}
      <a href={origin + "/ko/careers"}>인재채용</a>
    </>
  );
}

const defaultHeroImages = [
  asset("3309-95482-imgChatGpt202610210210121.png"),
  asset(
    "3309-95482-imgU4617165514FuturisticAiSemiconductorManufacturingSceneCe8AeeafAaab49868B5CAc6C9C4B293012.png",
  ),
  base + "hero-3.webp",
  base + "hero-4.webp",
  asset(
    "3309-95482-imgU4617165514Premium3DVisualizationOfDesktopCybersecurityC5E309007C574C06Baf2A0A0655E69A211.png",
  ),
];
const revisedHeroImages = [
  "/assets/sian-b-revision/hero-1.png",
  "/assets/sian-b-revision/hero-2.png",
  "/assets/sian-b-revision/hero-blockchain.png",
  "/assets/sian-b-revision/hero-3.png",
  "/assets/sian-b-revision/hero-4.png",
];
const strengths = [
  [
    "AI와 보안의 결합",
    "Agentic 보안 진단 · AI 보안 검증",
    "SmartX의 자율 진단, 비전 AI 및 생성형 AI 보안 검증 기술을 제공합니다.",
    "imgGroup1261156664",
  ],
  [
    "SW / HW 전문성",
    "SW 구축·운영부터 암호모듈까지",
    "100건 이상 공공 SW 구축·운영 경험과 KCMVP 검증필 암호모듈 기술을 보유하고 있습니다.",
    "imgIcon",
  ],
  [
    "산업 특화 기술력",
    "연구개발부터 상용화 및 운영까지",
    "부산항만공사 디지털-AI 통합 플랫폼 (체인포털) 구축 및 운영을 수행하고 있습니다.",
    "imgIcon1",
  ],
  [
    "외부 검증으로 확보한 신뢰",
    "인증된 품질과 검증된 보안",
    "이지스 · ACCIO BaaS: GS 1등급\nSMC V1.0: KCMVP 검증필",
    "imgIcon2",
  ],
];
const businesses = [
  {
    title: "AI·사이버보안",
    en: "Artificial Intelligence",
    summary: "자율 보안 진단과 AI 모델 보안 검증",
    body: [
      "SmartX를 기반으로 자율 취약점 진단을 수행합니다.",
      "비전 AI와 생성형 AI 모델의 취약점을 분석하고 보안성을 검증합니다.",
    ],
    href: security,
    image: asset("3306-83996-imgImage93.png"),
    background: asset("expertise-ai.png"),
    dark: false,
  },
  {
    title: "암호기술",
    en: "Cryptography",
    summary: "암호모듈 개발과 KCMVP 검증 지원",
    body: [
      "검증된 암호기술로 안전한 정보 환경을 구축합니다.",
      "암호모듈 개발과 KCMVP 검증을 지원합니다.",
    ],
    href: menus[2][1],
    image: base + "crypto-technology.webp",
    background: asset("expertise-crypto.png"),
    dark: false,
  },
  {
    title: "스마트항만",
    en: "Smart Ports",
    summary: "항만 정보공유와 AI 기반 운영 위험 예측",
    body: [
      "Port-i를 통해 항만 정보를 공유하고 운영 위험을 분석합니다.",
      "AI 예측과 이상 알림으로 항만 운영 판단을 지원합니다.",
    ],
    href: menus[5][1],
    image: base + "thumb-port.webp",
    background: asset("expertise-port.png"),
    dark: true,
  },
  {
    title: "블록체인",
    en: "Blockchain",
    summary: "기업용 블록체인 개발과 산업 적용",
    body: [
      "기업용 블록체인 플랫폼과 산업별 서비스를 제공합니다.",
      "신뢰할 수 있는 데이터 연결로 새로운 가치를 만듭니다.",
    ],
    href: blockchain,
    image: base + "thumb-blockchain.webp",
    background: asset("expertise-blockchain.png"),
    dark: true,
  },
  {
    title: "제조 AX",
    en: "Manufacturing AI Transformation",
    summary: "AI 기반 품질검사 자동화와 설비 예지보전",
    body: [
      "생산 현장의 영상과 설비 데이터를 AI로 분석합니다.",
      "제품 결함 검사와 설비 점검·유지보수 일정 수립을 지원합니다.",
    ],
    href: menus[4][1],
    image: base + "thumb-manufacturing.webp",
    background: asset("expertise-manufacturing.png"),
    dark: false,
  },
];
const cases = [
  ["공공기관", "imgCm260010791"],
  ["국방", "imgCm2800292811"],
  ["금융", "imgTc005800000781"],
  ["보안", "imgTae0008A00072"],
  ["제조", "imgTd018300005061"],
  ["의료", "imgTica10100029631"],
  ["여행", "imgTip24900070481"],
];
const news = [
  ["부산항 환적정보, 블록체인 기술로 실시간 공유한다", "img32"],
  ["OFFSHORE KOREA 2026 참가", "imgImage92"],
  ["블록체인·AI 부산 디지털금융 혁신 연구센터 개소식", "imgImage93"],
  ["FLY ASIA 2026 아시아 창업 엑스포 참가", "imgImage94"],
  ["부산항 환적정보, 블록체인 기술로 실시간 공유한다", "imgImage30"],
];
const partners = [
  ["04-mof.2ojmo04lax3f4.svg", "해양수산부"],
  ["05-molit.2u4288g1des9t.svg", "국토교통부"],
  ["06-iitp.1jokp2acwe0gu.svg", "정보통신기획평가원"],
  ["07-nipa.2e686fbaqt79f.svg", "정보통신산업진흥원"],
  ["08-kisa.180-5l2l0c82t.svg", "한국인터넷진흥원"],
  ["09-etri.3wjv-l7o00bb7.svg", "한국전자통신연구원"],
  ["19-bpa.3sidlx0s3m8jv.svg", "부산항만공사"],
  ["20-upa.23buxylldyyjg.svg", "울산항만공사"],
  ["21-ygpa.108nojcj_hi-9.svg", "여수광양항만공사"],
  ["22-kr.0r7brsgln2n44.svg", "한국선급"],
  ["23-rims.svg", "중소조선연구원"],
  ["24-hanwha.svg", "한화에어로스페이스"],
];

function Arrow({ white = false }: { white?: boolean }) {
  return (
    <img
      src={asset(white ? "3306-85035-imgGroup.svg" : "3306-83996-imgGroup.svg")}
      alt=""
    />
  );
}
function SectionTitle({
  en,
  title,
  description,
  texture,
}: {
  en: string;
  title: string;
  description?: string;
  texture: string;
}) {
  return (
    <div className={styles.sectionTitle}>
      <p
        className={styles.eyebrow}
        style={{
          backgroundImage: `url(${texture.startsWith("/") ? texture : asset(texture)})`,
        }}
      >
        {en}
      </p>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

function PartnerMarquee({ variant }: { variant: number }) {
  return (
    <div
      className={`${styles.partners} ${variant <= 3 ? styles.partnersAuto : ""}`}
      tabIndex={0}
      role="group"
      aria-label={
        variant <= 3
          ? "파트너 및 협력기관 자동 슬라이드"
          : "파트너 및 협력기관, 마우스 또는 키보드 포커스 시 이동 일시정지"
      }
    >
      {[0, 1].map((row) => (
        <div key={row}>
          <div className={styles.partnerTrack}>
            {[0, 1].map((copy) => (
              <div
                className={styles.partnerGroup}
                key={copy}
                aria-hidden={copy === 1}
              >
                {partners.slice(row * 6, row * 6 + 6).map(([file, name]) => (
                  <span key={file}>
                    <img src={base + file} alt={copy === 0 ? name : ""} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CaseMarquee() {
  return (
    <div
      className={styles.caseMarquee}
      tabIndex={0}
      role="region"
      aria-label="적용범위 자동 슬라이드, 마우스 또는 키보드 포커스 시 일시정지"
    >
      <div className={styles.caseMarqueeLane}>
        {[0, 1].map((copy) => (
          <div
            className={styles.caseMarqueeGroup}
            key={copy}
            aria-hidden={copy === 1}
          >
            {cases.map(([name, img], i) => (
              <article
                className={`${styles.caseCard} ${i > 1 ? styles.darkCase : ""}`}
                key={name}
              >
                <img
                  src={asset(`3306-85106-${img}.png`)}
                  alt={copy === 0 ? `${name} 산업` : ""}
                />
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PrototypeOne({
  variant = 1,
  copyVariant = 2,
  supportingCopy,
  designRevision = false,
}: {
  variant?: 1 | 2 | 3 | 4;
  copyVariant?: 1 | 2 | 3 | 4;
  supportingCopy?: [string, string];
  designRevision?: boolean;
}) {
  const heroImages = designRevision ? revisedHeroImages : defaultHeroImages;
  const newsItems = designRevision
    ? [...officialNews, ...officialNews].map((item) => ({
        ...item,
        placeholder: false,
      }))
    : news.map(([title, img], i) => ({
        title,
        image: asset(`3306-85212-${img}.png`),
        href: origin + "/ko/news",
        placeholder: i === 0,
      }));
  const reducedMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroHovered, setHeroHovered] = useState(false);
  const [heroFocused, setHeroFocused] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const [scrollExpertise, setScrollExpertise] = useState(false);
  const [menu, setMenu] = useState(false);
  const [language, setLanguage] = useState(false);
  const [newsPosition, setNewsPosition] = useState(0);
  const [newsHovered, setNewsHovered] = useState(false);
  const [newsFocused, setNewsFocused] = useState(false);
  const [highlightedStrength, setHighlightedStrength] = useState(0);
  const [caseHovered, setCaseHovered] = useState(false);
  const caseTrack = useRef<HTMLDivElement>(null);
  const caseDirection = useRef(1);
  const newsTrack = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const expertise = useRef<HTMLElement>(null);
  const expertiseMotion = useRef({ index: 0, until: 0 });
  const heroInView = useInView(hero, { amount: 0.2 });
  const casesInView = useInView(caseTrack, { amount: 0.2 });

  useEffect(() => {
    const track = newsTrack.current;
    if (designRevision && track?.firstElementChild) {
      let previousStep = 0;
      const alignCards = () => {
        const step =
          track.firstElementChild!.getBoundingClientRect().width +
          parseFloat(getComputedStyle(track).columnGap);
        const index = previousStep ? Math.round(track.scrollLeft / previousStep) : 1;
        track.scrollTo({ left: index * step, behavior: "instant" });
        previousStep = step;
      };
      alignCards();
      const observer = new ResizeObserver(alignCards);
      observer.observe(track);
      return () => observer.disconnect();
    }
  }, [designRevision]);

  useEffect(() => {
    const track = caseTrack.current;
    if (
      designRevision ||
      variant !== 2 ||
      reducedMotion ||
      caseHovered ||
      !casesInView ||
      !track
    )
      return;
    let frame = 0;
    const timer = window.setInterval(() => {
      if (document.hidden || frame) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      if (track.scrollLeft >= max - 1) caseDirection.current = -1;
      if (track.scrollLeft <= 1) caseDirection.current = 1;
      const first = track.children[0] as HTMLElement;
      const second = track.children[1] as HTMLElement;
      const step = second.offsetLeft - first.offsetLeft;
      const start = track.scrollLeft;
      const target = Math.max(
        0,
        Math.min(max, start + step * caseDirection.current),
      );
      const started = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - started) / 700, 1);
        const eased = (1 - Math.cos(Math.PI * progress)) / 2;
        track.scrollLeft = start + (target - start) * eased;
        frame = progress < 1 ? requestAnimationFrame(animate) : 0;
      };
      frame = requestAnimationFrame(animate);
    }, 6000);
    return () => {
      window.clearInterval(timer);
      cancelAnimationFrame(frame);
    };
  }, [variant, reducedMotion, caseHovered, casesInView, designRevision]);
  const reveal = {
    initial: reducedMotion ? (false as const) : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reducedMotion ? 0 : 0.75,
      ease: "easeOut" as const,
    },
  };
  const accordionTransition = {
    duration: reducedMotion ? 0 : variant === 2 ? 0.3 : 0.55,
    ease: "easeInOut" as const,
  };

  const selectBusiness = useCallback(
    (index: number | null) => {
      if (scrollExpertise && index === null) return;
      if (index !== null) expertiseMotion.current.index = index;
      expertiseMotion.current.until =
        performance.now() + (variant === 2 ? 300 : 700);
      setOpen(index);
    },
    [scrollExpertise, variant],
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
    const update = () => {
      setScrollExpertise(media.matches);
      if (media.matches) setOpen(expertiseMotion.current.index);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = expertise.current;
    if (!scrollExpertise || !section) return;
    let wheelAmount = 0;
    let lastWheel = 0;
    let burstAmount = 0;
    let burstStarted = 0;
    let fastGesture = false;
    let lastInput = 0;
    let previousY = window.scrollY;
    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        !event.deltaY
      )
        return;
      const bounds = section.getBoundingClientRect();
      const now = performance.now();
      const direction = Math.sign(event.deltaY);
      const delta =
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1);
      if (variant === 2) {
        if (now - lastInput > 200) fastGesture = false;
        lastInput = now;
        if (now - burstStarted > 120 || Math.sign(burstAmount) !== direction) {
          burstStarted = now;
          burstAmount = 0;
        }
        burstAmount += delta;
        if (Math.abs(delta) >= 180 || Math.abs(burstAmount) >= 260) {
          fastGesture = true;
          wheelAmount = 0;
        }
        if (fastGesture) return;
        // 화면을 끌어올리지 않고 카드가 충분히 보이는 위치에서만 전환합니다.
        if (bounds.top > Math.max(24, window.innerHeight - bounds.height - 24))
          return;
      }
      if (
        (bounds.top > window.innerHeight * 0.35 &&
          bounds.top - Math.max(delta, 0) > window.innerHeight * 0.35) ||
        bounds.bottom < window.innerHeight * 0.5
      )
        return;
      if (variant !== 2 && now < expertiseMotion.current.until) {
        event.preventDefault();
        return;
      }
      const index = expertiseMotion.current.index;
      if (
        (direction < 0 && index === 0) ||
        (direction > 0 && index === businesses.length - 1)
      )
        return;
      if (variant === 2 && now < expertiseMotion.current.until) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      if (
        variant !== 2 &&
        ((direction > 0 && bounds.top > 26) ||
          (direction < 0 && bounds.top < 22))
      ) {
        window.scrollTo({
          top: window.scrollY + bounds.top - 24,
          behavior: "instant",
        });
        expertiseMotion.current.until = now + 700;
        return;
      }
      if (now - lastWheel > 180 || Math.sign(wheelAmount) !== direction)
        wheelAmount = 0;
      lastWheel = now;
      wheelAmount += delta;
      if (Math.abs(wheelAmount) < 55) return;
      wheelAmount = 0;
      selectBusiness(index + direction);
    };
    const onScroll = () => {
      if (variant === 2) return;
      const currentY = window.scrollY;
      const distance = currentY - previousY;
      previousY = currentY;
      if (Math.abs(distance) < 2) return;
      const bounds = section.getBoundingClientRect();
      const anchorY = currentY + bounds.top - 24;
      const direction = Math.sign(distance);
      const index = expertiseMotion.current.index;
      const crossedDown =
        direction > 0 &&
        previousY >= anchorY &&
        currentY - distance <= anchorY + bounds.height;
      const crossedUp =
        direction < 0 && currentY <= anchorY && currentY - distance >= anchorY;
      if (
        (!crossedDown && !crossedUp) ||
        (direction > 0 && index === businesses.length - 1) ||
        (direction < 0 && index === 0)
      )
        return;
      previousY = anchorY;
      window.scrollTo({ top: anchorY, behavior: "instant" });
      if (performance.now() >= expertiseMotion.current.until) {
        selectBusiness(index + direction);
      }
    };
    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollExpertise, selectBusiness, variant]);

  useEffect(() => {
    if (
      reducedMotion ||
      heroPaused ||
      heroHovered ||
      heroFocused ||
      !heroInView
    )
      return;
    const timer = window.setInterval(() => {
      if (!document.hidden)
        setSlide((current) => (current + 1) % heroImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, heroPaused, heroHovered, heroFocused, heroInView, slide]);
  const moveNews = useCallback(
    (direction: number) => {
      const track = newsTrack.current;
      if (!track) return;
      if (designRevision && track.firstElementChild) {
        const step =
          track.firstElementChild.getBoundingClientRect().width +
          parseFloat(getComputedStyle(track).columnGap);
        const cycle = officialNews.length * step;
        const current = track.scrollLeft;
        const reset =
          direction > 0 && current >= cycle
            ? current - cycle
            : direction < 0 && current < step
              ? current + cycle
              : current;
        const advance = () =>
          track.scrollTo({
            left: reset + direction * step,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
        if (reset !== current) {
          track.scrollTo({ left: reset, behavior: "instant" });
          requestAnimationFrame(advance);
        } else advance();
      } else
        track.scrollBy({
          left:
            direction *
              (track.firstElementChild?.getBoundingClientRect().width || 340) +
            direction * 40,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
    },
    [designRevision],
  );
  useEffect(() => {
    if (!designRevision || reducedMotion || newsHovered || newsFocused) return;
    const timer = window.setInterval(() => moveNews(1), 4500);
    return () => window.clearInterval(timer);
  }, [designRevision, reducedMotion, newsHovered, newsFocused, moveNews]);
  return (
    <main
      id="top"
      className={`${styles.page} ${variant !== 1 ? styles.variantTwo : ""} ${variant >= 3 ? styles.variantThree : ""} ${variant === 4 ? styles.variantFour : ""} ${designRevision ? styles.designRevision : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setMenu(false);
          setLanguage(false);
        }
      }}
    >
      {variant === 4 && (
        <div className={styles.buildingBackdrop} aria-hidden="true">
          <img src="/assets/sian-d/building.webp" alt="" />
          <div />
        </div>
      )}
      {(variant === 2 || variant === 3) && (
        <div className={styles.heroBackdrop} aria-hidden="true">
          <img
            src={
              variant === 3
                ? "/assets/sian-c/hero-background.webp"
                : "/assets/sian-b/hero-background.webp"
            }
            alt=""
          />
          {variant === 2 && <img src="/assets/sian-b/hero-fade.png" alt="" />}
        </div>
      )}
      <a href="#content" className={styles.skip}>
        본문 바로가기
      </a>
      <header className={styles.header}>
        <a href="#top" aria-label="SmartM2M 홈">
          <img
            src={
              variant === 2 || variant === 3
                ? "/assets/sian-b/logo-light.svg"
                : asset("3306-83886-imgLogo.svg")
            }
            alt="SmartM2M"
          />
        </a>
        <nav aria-label="주요 메뉴" className={styles.desktopNav}>
          {variant === 2 ? (
            <OfficialMenuItems />
          ) : (
            menus.map(([name, href]) => (
              <a key={name} href={href}>
                {name}
              </a>
            ))
          )}
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.contact} href="mailto:smartm2m@smartm2m.co.kr">
            Contact Us
          </a>
          <div className={styles.language}>
            <button
              aria-expanded={language}
              aria-controls="language-menu"
              onClick={() => setLanguage(!language)}
            >
              KR{" "}
              <img
                src={
                  variant === 2 || variant === 3
                    ? "/assets/sian-b/chevron-light.svg"
                    : asset("3306-83886-imgVector.svg")
                }
                alt=""
              />
            </button>
            {language && (
              <div id="language-menu">
                <a href="#top" onClick={() => setLanguage(false)}>
                  한국어
                </a>
                <a href={origin + "/en"}>English</a>
              </div>
            )}
          </div>
          <button
            className={styles.menuButton}
            aria-label={menu ? "전체 메뉴 닫기" : "전체 메뉴 열기"}
            aria-expanded={menu}
            aria-controls="prototype-menu"
            onClick={() => setMenu(!menu)}
          >
            <img
              src={
                variant === 2 || variant === 3
                  ? "/assets/sian-b/menu-light.svg"
                  : asset("3306-83886-imgGroup4055.svg")
              }
              alt=""
            />
          </button>
        </div>
      </header>
      {menu && (
        <nav
          id="prototype-menu"
          className={`${styles.mobileNav} ${variant === 2 ? styles.officialFullMenu : ""}`}
          onKeyDown={(event) => {
            if (event.key === "Escape") setMenu(false);
          }}
          aria-label="전체 메뉴"
        >
          {variant === 2 ? (
            <OfficialMenuItems expanded />
          ) : (
            menus.map(([name, href]) => (
              <a key={name} href={href} onClick={() => setMenu(false)}>
                {name}
              </a>
            ))
          )}
          <a href="mailto:smartm2m@smartm2m.co.kr">Contact Us</a>
        </nav>
      )}
      <div id="content" className={styles.content}>
        <section
          ref={hero}
          className={styles.hero}
          aria-label="스마트엠투엠 소개"
        >
          <div className={styles.heroCopy}>
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.7 }}
            >
              Smart Solutions for a Secure Tomorrow, Empowering Customers to
              Achieve More
            </motion.p>
            <h1>
              <motion.span
                initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.8,
                  delay: reducedMotion ? 0 : 0.2,
                }}
              >
                {variant === 3 ? (
                  "더 똑똑하게, 더 안전하게."
                ) : variant === 2 ? (
                  copyVariant === 1 ? (
                    <mark>AI, 사이버보안, 블록체인,</mark>
                  ) : copyVariant === 3 ? (
                    "더 똑똑하게, 더 안전하게."
                  ) : copyVariant === 4 ? (
                    "일은 더 쉽게, 보안은 더 든든하게."
                  ) : (
                    "더 안전한 데이터, 더 효율적인 현장."
                  )
                ) : (
                  <mark>AI, 사이버보안, 블록체인,</mark>
                )}
              </motion.span>
              <motion.span
                initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.8,
                  delay: reducedMotion ? 0 : 0.4,
                }}
              >
                {variant === 3 ? (
                  "AI로 시작되는 변화입니다."
                ) : variant === 2 ? (
                  copyVariant === 1 ? (
                    <>
                      <mark>스마트항만, 자율제조</mark> 분야에서
                    </>
                  ) : copyVariant === 3 ? (
                    <>
                      <mark>AI로 시작되는 변화</mark>입니다.
                    </>
                  ) : copyVariant === 4 ? (
                    <mark>AI가 함께합니다.</mark>
                  ) : (
                    <>
                      <mark>기술로 만드는 변화</mark>입니다.
                    </>
                  )
                ) : (
                  <>
                    <mark>스마트항만, 자율제조 분야</mark>에서
                  </>
                )}
              </motion.span>
              {(variant === 1 ||
                variant === 4 ||
                (variant === 2 && copyVariant === 1)) && (
                <motion.span
                  initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.8,
                    delay: reducedMotion ? 0 : 0.6,
                  }}
                >
                  기술을 현장의 변화로 잇습니다.
                </motion.span>
              )}
            </h1>
            {(variant === 2 || variant === 3) && (
              <p
                className={`${styles.heroDescription} ${supportingCopy ? styles.longDescription : ""}`}
              >
                {supportingCopy ? (
                  <>{supportingCopy.join(" ")}</>
                ) : variant === 2 && copyVariant === 1 ? (
                  <>
                    스마트엠투엠은 AI 보안, 블록체인, 사이버보안/암호분야 초격차
                    기술을 통해
                    <br />
                    글로벌 강소 벤처기업으로 성장하고 있는 IT 보안 전문
                    기업입니다.
                  </>
                ) : (
                  <>
                    스마트엠투엠은 AI·사이버보안·블록체인 기술로 데이터를
                    보호하고,
                    <br />
                    항만과 제조 현장의 업무 효율을 높입니다.
                  </>
                )}
              </p>
            )}
          </div>
          {variant !== 4 && (
            <motion.div
              className={styles.heroVisual}
              initial={reducedMotion ? false : { opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 1,
                delay: reducedMotion ? 0 : 0.3,
              }}
            >
              <div
                className={styles.heroImage}
                onPointerEnter={() => setHeroHovered(true)}
                onPointerLeave={() => setHeroHovered(false)}
                onFocusCapture={() => setHeroFocused(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setHeroFocused(false);
                }}
              >
                {variant !== 1
                  ? heroImages.map((image, i) => {
                      const depth =
                        (i - slide + heroImages.length) % heroImages.length;
                      return (
                        <motion.div
                          key={image}
                          className={styles.heroDeckCard}
                          aria-hidden={depth !== 0}
                          initial={false}
                          animate={{
                            x: reducedMotion ? 0 : depth < 3 ? depth * 20 : -70,
                            scaleY: reducedMotion
                              ? 1
                              : depth < 3
                                ? 1 - depth * 0.077
                                : 0.96,
                            opacity:
                              depth === 0
                                ? 1
                                : depth === 1
                                  ? 0.5
                                  : depth === 2
                                    ? 0.2
                                    : 0,
                            rotate: reducedMotion || depth < 3 ? 0 : -3,
                          }}
                          style={{
                            zIndex: depth < 3 ? 3 - depth : 4,
                            pointerEvents: "none",
                          }}
                          transition={{
                            duration: reducedMotion ? 0 : 0.85,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <img
                            src={image}
                            alt={
                              (designRevision
                                ? [
                                    "사이버보안 인프라",
                                    "AI 기술",
                                    "블록체인 플랫폼",
                                    "스마트항만 물류",
                                    "제조 공정 자동화",
                                  ]
                                : [
                                    "AI 사이버보안 플랫폼",
                                    "AI 반도체 제조",
                                    "스마트항만 물류",
                                    "산업 기술 비주얼",
                                    "사이버보안 인프라",
                                  ])[i]
                            }
                          />
                        </motion.div>
                      );
                    })
                  : heroImages.map((image, i) => (
                      <motion.img
                        key={image}
                        src={image}
                        aria-hidden={slide !== i}
                        initial={false}
                        animate={{
                          opacity: slide === i ? 1 : 0,
                          scale: reducedMotion || slide === i ? 1 : 1.035,
                        }}
                        transition={{
                          opacity: { duration: reducedMotion ? 0 : 0.8 },
                          scale: { duration: reducedMotion ? 0 : 1.2 },
                        }}
                        alt={
                          [
                            "AI 사이버보안 플랫폼",
                            "AI 반도체 제조",
                            "스마트항만 물류",
                            "산업 기술 비주얼",
                            "사이버보안 인프라",
                          ][i]
                        }
                      />
                    ))}
                <div className={styles.dots}>
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`메인 비주얼 ${i + 1}번 보기`}
                      aria-pressed={slide === i}
                      onClick={() => setSlide(i)}
                    />
                  ))}
                </div>
                {variant === 1 && !reducedMotion && (
                  <button
                    className={styles.heroPlayback}
                    aria-label={
                      heroPaused
                        ? "메인 비주얼 자동 재생"
                        : "메인 비주얼 자동 재생 일시정지"
                    }
                    aria-pressed={heroPaused}
                    onClick={() => setHeroPaused(!heroPaused)}
                  >
                    {heroPaused ? "자동 재생" : "일시정지"}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </section>
        <motion.section
          {...reveal}
          className={styles.strengths}
          aria-labelledby="strength-heading"
        >
          <h2 id="strength-heading">
            고객의 성장을 이끄는 스마트엠투엠의 경쟁력을 소개합니다.
          </h2>
          <div
            className={styles.strengthGrid}
            onMouseLeave={() => setHighlightedStrength(0)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setHighlightedStrength(0);
            }}
          >
            {strengths.map(([title, sub, body, icon], i) => (
              <motion.article
                {...reveal}
                transition={{
                  ...reveal.transition,
                  delay: reducedMotion ? 0 : i * 0.12,
                }}
                key={title}
                className={highlightedStrength === i ? styles.featured : ""}
                onMouseEnter={() => setHighlightedStrength(i)}
                onFocusCapture={() => setHighlightedStrength(i)}
              >
                <div className={styles.strengthIcon}>
                  <img
                    src={
                      designRevision && i === 1
                        ? "/assets/sian-b-revision/strength-2.svg"
                        : variant === 4
                          ? `/assets/sian-d/${icon}.svg`
                          : asset(`3309-95482-${icon}.svg`)
                    }
                    alt=""
                  />
                </div>
                <h3>{title}</h3>
                <h4>{sub}</h4>
                <p>
                  {designRevision && i === 1 ? (
                    <>
                      100건 이상 공공 SW 구축·운영 경험과
                      <br />
                      KCMVP 검증필 암호모듈 기술을
                      <br />
                      보유하고 있습니다.
                    </>
                  ) : (
                    body
                  )}
                </p>
                {i === 0 && (
                  <a className={styles.pill} href={security}>
                    SmartX 자세히보기 <Arrow />
                  </a>
                )}
                {i === 2 && (
                  <div className={styles.brandRow}>
                    {["imgImage89", "imgImage90", "imgImage91"].map(
                      (name, j) => (
                        <img
                          key={name}
                          src={asset(`3309-95482-${name}.png`)}
                          alt={["CHAINPORTAL", "Port-i", "올컨e"][j]}
                        />
                      ),
                    )}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </motion.section>
        <section
          ref={expertise}
          id="expertise"
          className={`${styles.expertise} ${scrollExpertise ? styles.expertiseWheel : ""}`}
        >
          <SectionTitle
            en="CORE EXPERTISE"
            title="핵심 사업 분야"
            description="핵심 기술과 산업 전문성을 바탕으로 다양한 사업 분야의 혁신을 이끕니다."
            texture="3306-83996-imgCoreExpertise.png"
          />
          <div className={styles.accordion}>
            {businesses.map((business, i) => (
              <article key={business.title} id={`business-panel-${i}`}>
                <AnimatePresence initial={false}>
                  {open === i ? (
                    <motion.div
                      key="expanded"
                      className={styles.accordionClip}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={accordionTransition}
                    >
                      <div
                        className={`${styles.businessPanel} ${business.dark ? styles.businessPanelDark : ""}`}
                        style={{
                          backgroundImage: `url(${business.background})`,
                        }}
                      >
                        <div className={styles.businessCopy}>
                          <button
                            className={styles.businessHeading}
                            onClick={() =>
                              selectBusiness(scrollExpertise ? i : null)
                            }
                            aria-expanded="true"
                            aria-controls={`business-panel-${i}`}
                          >
                            <h3>{business.title}</h3>
                            <span>{business.en}</span>
                          </button>
                          <h4>{business.summary}</h4>
                          <div className={styles.businessBody}>
                            {business.body.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                          <a className={styles.pill} href={business.href}>
                            자세히보기 <Arrow />
                          </a>
                        </div>
                        {variant !== 1 ? (
                          <div className={styles.businessMedia}>
                            <img
                              className={styles.businessImage}
                              src={business.image}
                              alt={`${business.title} 소개`}
                            />
                            {i === 0 && (
                              <a
                                className={styles.businessPlay}
                                href={business.href}
                                aria-label="SmartX 소개 페이지 보기"
                              >
                                <img src="/assets/sian-b/play.svg" alt="" />
                              </a>
                            )}
                          </div>
                        ) : (
                          <img
                            className={styles.businessImage}
                            src={business.image}
                            alt={`${business.title} 소개`}
                          />
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      className={styles.accordionClip}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={accordionTransition}
                    >
                      <button
                        className={styles.businessRow}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectBusiness(i)}
                        aria-expanded="false"
                        aria-controls={`business-panel-${i}`}
                      >
                        <h3>{business.title}</h3>
                        <span>{business.summary}</span>
                        <img src={asset("3306-83996-imgIcon.svg")} alt="" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
        </section>
        <motion.section
          {...reveal}
          viewport={{ once: true, amount: 0 }}
          id="solutions"
          className={styles.solutions}
        >
          <SectionTitle
            en="SOLUTION"
            title="대표 솔루션"
            description="스마트엠투엠의 대표 솔루션을 소개합니다."
            texture="3306-84134-imgSolution.png"
          />
          <div className={styles.solutionGrid}>
            {[0, 1].map((i) => (
              <motion.article
                {...reveal}
                transition={{
                  ...reveal.transition,
                  delay: reducedMotion ? 0 : i * 0.15,
                }}
                className={styles.solutionCard}
                key={i}
              >
                <img
                  className={styles.glowOne}
                  src={base + (i ? "glow-mint.svg" : "glow-purple.svg")}
                  alt=""
                />
                <img
                  className={styles.glowTwo}
                  src={base + (i ? "glow-indigo.svg" : "glow-blue.svg")}
                  alt=""
                />
                {i === 0 && (
                  <img
                    className={styles.glowThree}
                    src={base + "glow-cyan.svg"}
                    alt=""
                  />
                )}
                {i === 0 ? (
                  <img
                    className={styles.smartxMockup}
                    src={base + "smartx-mockup.webp"}
                    alt="SmartX 네트워크 보안 점검 대시보드"
                  />
                ) : (
                  <div className={styles.accioMockup}>
                    <div>
                      <img src={asset("3306-85056-imgFrame5664.svg")} alt="" />
                    </div>
                    <img
                      src={asset("3306-85056-img21.png")}
                      alt="ACCIO 블록체인 관리 화면"
                    />
                  </div>
                )}
                <div className={styles.solutionCopy}>
                  <p>
                    {i
                      ? "차세대 블록체인 서비스 플랫폼"
                      : "생성형 AI기반 취약점 진단 플랫폼"}
                  </p>
                  <img
                    className={i ? styles.accioLogo : styles.smartxLogo}
                    src={
                      i
                        ? base + "accio-logo.svg"
                        : asset("3306-85035-imgLogo.svg")
                    }
                    alt={i ? "ACCIO" : "SmartX"}
                  />
                </div>
                <div className={styles.solutionActions}>
                  <a
                    className={`${styles.pill} ${i === 0 ? styles.redPill : ""}`}
                    href={i ? blockchain : security}
                  >
                    자세히보기 <Arrow white={i === 0} />
                  </a>
                  <a
                    className={styles.pill}
                    href={`mailto:smartm2m@smartm2m.co.kr?subject=${encodeURIComponent(i ? "[ACCIO] 상담 신청" : "[SmartX] 데모 신청")}`}
                  >
                    {i ? "상담 신청" : "데모 신청"}
                    <Arrow />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
        {variant !== 4 && (
          <motion.section {...reveal} className={styles.useCases}>
            <SectionTitle
              en={designRevision ? "SECTORS & PARTNERS" : "USE CASE"}
              title={designRevision ? "주요기관 및 파트너" : "적용범위"}
              description="산업별 특성과 현장의 요구에 맞춰 최적의 솔루션을 제공합니다."
              texture={
                designRevision
                  ? "/assets/sian-b-revision/sectors-title.png"
                  : "3306-85106-imgUseCase.png"
              }
            />
            {designRevision ? (
              <CaseMarquee />
            ) : (
              <div
                ref={caseTrack}
                className={`${styles.caseTrack} ${variant === 2 ? styles.caseTrackAuto : ""}`}
                onPointerEnter={() => setCaseHovered(true)}
                onPointerLeave={() => setCaseHovered(false)}
                tabIndex={0}
                role="region"
                aria-label="적용범위, 좌우로 스크롤"
              >
                {cases.map(([name, img], i) => (
                  <article
                    className={`${styles.caseCard} ${i > 1 ? styles.darkCase : ""}`}
                    key={name}
                  >
                    <img
                      src={asset(`3306-85106-${img}.png`)}
                      alt={`${name} 산업`}
                    />
                    <h3>{name}</h3>
                  </article>
                ))}
              </div>
            )}
            <PartnerMarquee variant={variant} />
          </motion.section>
        )}
        <motion.section
          {...reveal}
          id="news"
          className={styles.news}
          onFocusCapture={() => {
            if (designRevision) setNewsFocused(true);
          }}
          onBlurCapture={(event) => {
            if (
              designRevision &&
              !event.currentTarget.contains(event.relatedTarget)
            )
              setNewsFocused(false);
          }}
        >
          <SectionTitle
            en="SMARTM2M NEWS"
            title="소식"
            texture="3306-85212-imgSmartm2MNews.png"
          />
          <a
            className={styles.more}
            href={
              designRevision
                ? origin + "/news?category=internal"
                : origin + "/ko/news"
            }
            aria-label="소식 더보기"
          >
            <img src={asset("3306-85212-imgGroup.svg")} alt="" />
          </a>
          <div className={designRevision ? styles.newsViewport : undefined}>
            <div
              ref={newsTrack}
              className={styles.newsTrack}
              onMouseEnter={() => {
                if (designRevision) setNewsHovered(true);
              }}
              onMouseLeave={() => {
                if (designRevision) setNewsHovered(false);
              }}
              onScroll={(e) => {
                const el = e.currentTarget;
                setNewsPosition(
                  el.scrollLeft / (el.scrollWidth - el.clientWidth || 1),
                );
              }}
            >
              {newsItems.map(({ title, image, href, placeholder }, i) => (
                <a
                  className={styles.newsCard}
                  key={`${href}-${i}`}
                  href={href}
                  aria-label={title}
                >
                  <div>
                    <img src={image} alt="" />
                    {placeholder && (
                      <img
                        className={styles.newsLogo}
                        src={asset("3306-85212-imgLogo.svg")}
                        alt="SmartM2M"
                      />
                    )}
                  </div>
                  <h3>{title}</h3>
                </a>
              ))}
            </div>
          </div>
          <div className={styles.newsControls}>
            <div
              className={styles.progress}
              role="progressbar"
              aria-label="소식 슬라이드 위치"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(newsPosition * 100)}
            >
              <span style={{ left: `${newsPosition * 88.62}%` }} />
            </div>
            <button onClick={() => moveNews(-1)} aria-label="이전 소식">
              <img src={asset("3306-85212-imgBefore.svg")} alt="" />
            </button>
            <button onClick={() => moveNews(1)} aria-label="다음 소식">
              <img src={asset("3306-85212-imgAfter.svg")} alt="" />
            </button>
          </div>
        </motion.section>
        {variant === 4 && (
          <div className={styles.bottomPartners}>
            <PartnerMarquee variant={variant} />
          </div>
        )}
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <a href="#top" aria-label="SmartM2M 홈">
            <img src={asset("3306-85267-imgLogo.svg")} alt="SmartM2M" />
          </a>
          <span />
          <a href="#top" aria-label="맨 위로 이동">
            <img src={asset("3306-85267-imgFrame5608.svg")} alt="" />
          </a>
        </div>
        <dl>
          {[
            [
              "본사",
              "부산광역시 해운대구 센텀중앙로 97 센텀스카이비즈 A동 701호, 702호, 703호, 709호",
            ],
            ["중앙동 지사", "부산광역시 중구 중앙대로 11, 부산무역회관 505호"],
            ["서울 지사", "서울특별시 강남구 봉은사로 37길 9, 3032호"],
          ].map(([label, address]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{address}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.footerContact}>
          <span>대표 : 김호원</span>
          <a href="tel:0515182143">대표번호 : 051-518-2143</a>
          <span>팩스 : 051-793-0677</span>
        </div>
        <p>SmartM2M. Co., Ltd. © All Rights Reserved.</p>
      </footer>
    </main>
  );
}

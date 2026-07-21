# smartM2M

SmartM2M 메인 페이지를 Next.js 기반으로 퍼블리싱하는 작업 저장소입니다.

## 작업 내역

### 2026-07-21 디자인 보정 정적 퍼블리싱

- 기술력 섹션 렌더링에서 sticky/휠 인터랙션을 제거하고 Figma 기준의 정적 퍼블리싱 컴포넌트로 교체했습니다.
- 핵심성과 섹션의 blur/중첩 모션 상태를 제거하고 다크 패널과 정적 카드 레이아웃으로 다시 구성했습니다.
- 파트너 로고 행의 위치, 이미지 크기, 간격을 정적 배치 기준으로 재조정했습니다.
- 소식 섹션을 Figma 카드 배열에 맞춰 캡션 오버레이 없이 정적 DOM 구조로 다시 정리했습니다.
- 푸터는 `footer-reference.png` 통이미지 렌더링을 제거하고 회사 정보, 링크, TOP 버튼을 DOM 퍼블리싱으로 전환했습니다.
- 작업 체크리스트와 결정 기록은 `checklist.md`, `context-notes.md`에 반영했습니다.

### 2026-07-20 Part 1 정적 퍼블리싱

- 최신 Figma 링크의 메인 1920 프레임을 기준으로 데스크톱 정적 퍼블리싱 흐름을 정리했습니다.
- 소식 섹션을 기존 통짜 레퍼런스 이미지 방식에서 DOM 기반 `NewsSection` 컴포넌트로 전환했습니다.
- 기술력 섹션은 Part 1 검수를 위해 긴 sticky 인터랙션 높이 대신 Figma 정적 구간 높이에 맞춰 배치했습니다.
- 핵심성과 섹션은 없는 `result-video.mp4` 참조를 제거하고 기존 레퍼런스 이미지를 정적 배경으로 사용하도록 정리했습니다.
- 푸터 레퍼런스 높이를 최신 Figma footer 인스턴스 기준에 맞췄습니다.
- Part 1, Part 2, Part 3 작업 게이트와 완료 조건을 `checklist.md`에 정리했습니다.

## 검증

- `npm.cmd run build` 통과.
- 최신 디자인 보정 캡처는 `G:\내 드라이브\project\smartM2M\figma-gap-review\local-after-design-correction.png`에 저장했습니다.
- Part 1 검수용 캡처는 `G:\내 드라이브\project\smartM2M\part1-review`에 저장했습니다.

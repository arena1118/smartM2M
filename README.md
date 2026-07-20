# smartM2M

SmartM2M 메인 페이지를 Next.js 기반으로 퍼블리싱하는 작업 저장소입니다.

## 작업 내역

### 2026-07-20 Part 1 정적 퍼블리싱

- 최신 Figma 링크의 메인 1920 프레임을 기준으로 데스크톱 정적 퍼블리싱 흐름을 정리했습니다.
- 소식 섹션을 기존 통짜 레퍼런스 이미지 방식에서 DOM 기반 `NewsSection` 컴포넌트로 전환했습니다.
- 기술력 섹션은 Part 1 검수를 위해 긴 sticky 인터랙션 높이 대신 Figma 정적 구간 높이에 맞춰 배치했습니다.
- 핵심성과 섹션은 없는 `result-video.mp4` 참조를 제거하고 기존 레퍼런스 이미지를 정적 배경으로 사용하도록 정리했습니다.
- 푸터 레퍼런스 높이를 최신 Figma footer 인스턴스 기준에 맞췄습니다.
- Part 1, Part 2, Part 3 작업 게이트와 완료 조건을 `checklist.md`에 정리했습니다.

## 검증

- `npm.cmd run build` 통과.
- Part 1 검수용 캡처는 `G:\내 드라이브\project\smartM2M\part1-review`에 저장했습니다.

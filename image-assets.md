# 이미지 교체 목록

아래 파일들은 Figma 화면과 99% 이상 유사도를 맞추기 위해 만든 교체 가능한 에셋 슬롯입니다.
같은 파일명으로 이미지를 교체하면 코드 수정 없이 화면에 반영됩니다.
픽셀 유사도를 유지하려면 권장 크기를 맞춰 교체하는 것이 좋습니다.

| 파일 | 권장 크기 | 사용 위치 | 교체 용도 |
| --- | ---: | --- | --- |
| `public/assets/smartm2m/hero-reference.png` | 1920x1288 | 히어로 전체 | GNB, 좌측 레일, 히어로 배경, 오브젝트 기준 화면 |
| `public/assets/smartm2m/hero-reference-clean.png` | 1920x1288 | 히어로 reveal 시작 상태 | 히어로 타이틀 텍스트가 제거된 reveal 전용 배경 |
| `public/assets/smartm2m/technical-reference.png` | 1920x1372 | 기술력 섹션 전체 | 기술력 배경과 화면/텍스트 기준 |
| `public/assets/smartm2m/result-reference.png` | 1920x1550 | 핵심성과 섹션 전체 | 성과 카드, 로고, 배경 기준 |
| `public/assets/smartm2m/history-reference.png` | 1920x2082 | 연혁 섹션 전체 | Figma 기준 전체 연혁 리스트 |
| `public/assets/smartm2m/news-reference.png` | 1920x816 | 소식 섹션 전체 | 뉴스 카드와 슬라이드 컨트롤 기준 |
| `public/assets/smartm2m/footer-reference.png` | 1920x676 | 푸터 전체 | 푸터 정보와 top 버튼 기준 |
| `public/assets/smartm2m/hero-object.png` | 560x470 | 히어로 오브젝트 후보 | 추후 히어로를 DOM화할 때 교체할 3D 오브젝트 |
| `public/assets/smartm2m/technical-screen.png` | 1270x825 | 기술력 화면 후보 | 추후 기술력 섹션을 DOM화할 때 교체할 대시보드 이미지 |
| `public/assets/smartm2m/technical-image-11.png` | 1270x825 | 기술력 스크롤 이미지 11 | 텍스트 1에 연결되는 첫 번째 이미지 |
| `public/assets/smartm2m/technical-image-12.png` | 1270x825 | 기술력 스크롤 이미지 12 | 텍스트 1에 연결되는 빈 이미지 슬롯 |
| `public/assets/smartm2m/technical-image-13.png` | 1270x825 | 기술력 스크롤 이미지 13 | 텍스트 1에 연결되는 빈 이미지 슬롯 |
| `public/assets/smartm2m/technical-image-2.png` | 1270x825 | 기술력 스크롤 이미지 2 | 텍스트 2에 연결되는 이미지 |
| `public/assets/smartm2m/technical-image-31.png` | 1270x825 | 기술력 스크롤 이미지 31 | 텍스트 3에 연결되는 첫 번째 이미지 |
| `public/assets/smartm2m/technical-image-32.png` | 1270x825 | 기술력 스크롤 이미지 32 | 텍스트 3에 연결되는 빈 이미지 슬롯 |
| `public/assets/smartm2m/result-visual.png` | 880x1350 | 핵심성과 비주얼 후보 | 추후 핵심성과 섹션을 DOM화할 때 교체할 대형 비주얼 |
| `public/assets/smartm2m/news-thumb-01.png` | 200x283 | 뉴스 썸네일 후보 | 뉴스 카드 1 이미지 |
| `public/assets/smartm2m/news-thumb-02.png` | 200x283 | 뉴스 썸네일 후보 | 뉴스 카드 2 이미지 |
| `public/assets/smartm2m/news-thumb-03.png` | 200x283 | 뉴스 썸네일 후보 | 뉴스 카드 3 이미지 |
| `public/assets/smartm2m/news-thumb-04.png` | 200x283 | 뉴스 썸네일 후보 | 뉴스 카드 4 이미지 |

## 현재 구현 메모

- 현재 배포용 화면은 Figma 섹션을 기준 이미지로 잘라 배경에 배치하는 방식입니다.
- 이 방식은 픽셀 유사도 검수에는 가장 안정적이지만, 텍스트/카드/뉴스를 개별 DOM으로 편집하는 단계는 아닙니다.
- 다음 단계에서 섹션별 DOM화를 진행할 때 위 후보 에셋을 개별 이미지 슬롯으로 연결하면 됩니다.

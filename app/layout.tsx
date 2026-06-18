// 앱 라우트의 공통 HTML 구조와 메타데이터를 제공합니다.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartM2M Technical Scroll Sample",
  description: "생성형 AI 취약점 점검 시스템 소개 스크롤 인터랙션 샘플",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}


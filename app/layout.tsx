// 애플리케이션의 공통 HTML 구조와 메타데이터를 제공합니다.
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartM2M Main Animation Prototype",
  description: "SmartM2M 메인 페이지 애니메이션 퍼블리싱 검토용 프로토타입",
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

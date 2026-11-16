// 애플리케이션의 공통 HTML 구조와 메타데이터를 제공합니다.
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartM2M | 디자인 시안 1",
  description: "스마트엠투엠 기업 홈페이지 디자인 시안 1 프로토타입",
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

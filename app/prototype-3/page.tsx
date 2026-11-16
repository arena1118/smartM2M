// Figma 3번 시안을 최신 카드 넘김과 사업 분야 스크롤 동작으로 제공합니다.
import type { Metadata } from "next";
import { PrototypeOne } from "@/components/PrototypeOne";

export const metadata: Metadata = {
  title: "SmartM2M | 디자인 시안 3",
  description: "스마트엠투엠 기업 홈페이지 디자인 시안 3 프로토타입",
};

export default function Page() {
  return <PrototypeOne variant={3} />;
}

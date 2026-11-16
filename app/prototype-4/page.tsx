// Figma 4번 시안의 본사 비주얼과 확정된 공통 인터랙션을 제공합니다.
import type { Metadata } from "next";
import { PrototypeOne } from "@/components/PrototypeOne";

export const metadata: Metadata = {
  title: "SmartM2M | 디자인 시안 4",
  description: "스마트엠투엠 기업 홈페이지 디자인 시안 4 프로토타입",
};

export default function Page() {
  return <PrototypeOne variant={4} />;
}

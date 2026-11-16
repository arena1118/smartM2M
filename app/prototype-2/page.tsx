// Figma 2번 시안을 기존 프로토타입 동작과 함께 제공합니다.
import type { Metadata } from "next";
import { PrototypeOne } from "@/components/PrototypeOne";

export const metadata: Metadata = {
  title: "SmartM2M | 디자인 시안 2",
  description: "스마트엠투엠 기업 홈페이지 디자인 시안 2 프로토타입",
};

export default function Page() {
  return <PrototypeOne variant={2} />;
}

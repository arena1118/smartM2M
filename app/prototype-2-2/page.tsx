// 프로토타입2의 공통 디자인에 2 번 메인 카피를 적용합니다.
import type { Metadata } from "next";
import { PrototypeOne } from "@/components/PrototypeOne";

export const metadata: Metadata = {
  title: "SmartM2M | 디자인 시안 2-2",
  description: "스마트엠투엠 프로토타입2 카피 비교 시안 2-2",
};

export default function Page() {
  return <PrototypeOne variant={2} copyVariant={2} />;
}

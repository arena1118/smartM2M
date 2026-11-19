// 기존 2-1과 핵심 사업 분야의 휠 전환 감도를 비교하는 시안입니다.
import type { Metadata } from "next";
import { PrototypeOne } from "@/components/PrototypeOne";

export const metadata: Metadata = {
  title: "SmartM2M | 디자인 시안 2-5 휠 감도 비교",
  description: "기존 2-1 디자인에 무게감 있는 핵심 사업 분야 휠 전환을 적용한 비교 시안",
};

export default function Page() {
  return <PrototypeOne variant={2} copyVariant={1} designRevision heavierExpertiseWheel />;
}

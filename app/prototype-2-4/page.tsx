// 프로토타입2의 공통 디자인에 4 번 메인 카피를 적용합니다.
import type { Metadata } from "next";
import { PrototypeOne } from "@/components/PrototypeOne";

export const metadata: Metadata = {
  title: "SmartM2M | 디자인 시안 2-4",
  description: "스마트엠투엠 프로토타입2 카피 비교 시안 2-4",
};

export default function Page() {
  return (
    <PrototypeOne
      variant={2}
      copyVariant={4}
      supportingCopy={[
        "보안 솔루션 개발과 산업 플랫폼 구축·운영 경험을 바탕으로,",
        "산업별 업무 환경에 맞춘 AI 자동화와 보안 체계를 구현해 업무 효율과 시스템 안정성을 높입니다.",
      ]}
    />
  );
}

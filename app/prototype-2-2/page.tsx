// 프로토타입2의 공통 디자인에 2 번 메인 카피를 적용합니다.
import type { Metadata } from "next";
import { PrototypeOne } from "@/components/PrototypeOne";

export const metadata: Metadata = {
  title: "SmartM2M | 디자인 시안 2-2",
  description: "스마트엠투엠 프로토타입2 카피 비교 시안 2-2",
};

export default function Page() {
  return (
    <PrototypeOne
      variant={2}
      copyVariant={2}
      supportingCopy={[
        "AI 보안 진단·암호 검증·블록체인 구축 역량으로 기업 보안을 강화하고,",
        "산업별 요구에 맞춘 업무 지능화·자동화 솔루션을 제공합니다.",
      ]}
    />
  );
}

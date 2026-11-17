// 프로토타입2의 공통 디자인에 3 번 메인 카피를 적용합니다.
import type { Metadata } from "next";
import { PrototypeOne } from "@/components/PrototypeOne";

export const metadata: Metadata = {
  title: "SmartM2M | 디자인 시안 2-3",
  description: "스마트엠투엠 프로토타입2 카피 비교 시안 2-3",
};

export default function Page() {
  return (
    <PrototypeOne
      variant={2}
      copyVariant={3}
      supportingCopy={[
        "AI 모델의 보안성 검증과 암호·블록체인 기술로 데이터 활용의 신뢰성을 높이고,",
        "산업별 요구에 맞춘 AI 분석과 업무 자동화를 통해 현장의 판단과 운영을 고도화합니다.",
      ]}
    />
  );
}

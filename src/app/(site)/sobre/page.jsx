import Sobre from "@/components/sections/Sobre";

export const metadata = {
  title: "Sobre | AW Marcenaria e Móveis Planejados",
  description:
    "Conheça a historia, a missao, os valores e o processo de fabricacao da AW Marcenaria.",
};

export default function SobrePage() {
  return (
    <div className="pt-20">
      <Sobre />
    </div>
  );
}

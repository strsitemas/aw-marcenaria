import Faq from "@/components/sections/Faq";

export const metadata = {
  title: "Perguntas Frequentes | AW Marcenaria e Moveis Planejados",
  description:
    "Tire suas duvidas sobre prazos, garantia, materiais e o processo de marcenaria planejada da AW Marcenaria.",
};

export const dynamic = "force-dynamic";

export default function FaqPage() {
  return (
    <div className="pt-20">
      <Faq />
    </div>
  );
}

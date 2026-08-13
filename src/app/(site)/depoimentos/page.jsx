import Depoimentos from "@/components/sections/Depoimentos";

export const metadata = {
  title: "Depoimentos | AW Marcenaria e Móveis Planejados",
  description:
    "Veja o que nossos clientes dizem sobre os projetos da AW Marcenaria.",
};

export const dynamic = "force-dynamic";

export default function DepoimentosPage() {
  return (
    <div className="pt-20">
      <Depoimentos />
    </div>
  );
}

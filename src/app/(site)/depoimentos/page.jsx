import Depoimentos from "@/components/sections/Depoimentos";

export const metadata = {
  title: "Depoimentos | AW Marcenaria e Moveis Planejados",
  description:
    "Veja o que nossos clientes dizem sobre os projetos da AW Marcenaria.",
};

export default function DepoimentosPage() {
  return (
    <div className="pt-20">
      <Depoimentos />
    </div>
  );
}

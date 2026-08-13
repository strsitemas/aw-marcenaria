import Portfolio from "@/components/sections/Portfolio";

export const metadata = {
  title: "Portfólio | AW Marcenaria e Móveis Planejados",
  description:
    "Confira projetos de marcenaria planejada de alto padrão já entregues pela AW Marcenaria.",
};

export const dynamic = "force-dynamic";

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <Portfolio />
    </div>
  );
}

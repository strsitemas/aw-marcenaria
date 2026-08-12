import Portfolio from "@/components/sections/Portfolio";

export const metadata = {
  title: "Portfolio | AW Marcenaria e Moveis Planejados",
  description:
    "Confira projetos de marcenaria planejada de alto padrao ja entregues pela AW Marcenaria.",
};

export const dynamic = "force-dynamic";

export default function PortfolioPage() {
  return (
    <div className="pt-20">
      <Portfolio />
    </div>
  );
}

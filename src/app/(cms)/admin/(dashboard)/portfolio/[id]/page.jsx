import { prisma } from "@/lib/prisma";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { notFound } from "next/navigation";

export default async function EditarProjetoPage({ params }) {
  const projeto = await prisma.projetoPortfolio.findUnique({
    where: { id: params.id },
  });

  if (!projeto) notFound();

  return (
    <div>
      <h1 className="font-titulo text-2xl text-preto-fosco mb-6">
        Editar Projeto
      </h1>
      <PortfolioForm projeto={projeto} />
    </div>
  );
}

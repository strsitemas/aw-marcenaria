import { prisma } from "@/lib/prisma";
import DepoimentoForm from "@/components/admin/DepoimentoForm";
import { notFound } from "next/navigation";

export default async function EditarDepoimentoPage({ params }) {
  const depoimento = await prisma.depoimento.findUnique({
    where: { id: params.id },
  });

  if (!depoimento) notFound();

  return (
    <div>
      <h1 className="font-titulo text-2xl text-preto-fosco mb-6">
        Editar Depoimento
      </h1>
      <DepoimentoForm depoimento={depoimento} />
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import AmbienteForm from "@/components/admin/AmbienteForm";
import { notFound } from "next/navigation";

export default async function EditarAmbientePage({ params }) {
  const ambiente = await prisma.ambiente.findUnique({
    where: { id: params.id },
  });

  if (!ambiente) notFound();

  return (
    <div>
      <h1 className="font-titulo text-2xl text-preto-fosco mb-6">
        Editar Ambiente
      </h1>
      <AmbienteForm ambiente={ambiente} />
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import FaqForm from "@/components/admin/FaqForm";
import { notFound } from "next/navigation";

export default async function EditarFaqPage({ params }) {
  const faq = await prisma.faqItem.findUnique({
    where: { id: params.id },
  });

  if (!faq) notFound();

  return (
    <div>
      <h1 className="font-titulo text-2xl text-preto-fosco mb-6">
        Editar Pergunta
      </h1>
      <FaqForm faq={faq} />
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function FaqListPage() {
  const faqs = await prisma.faqItem.findMany({
    orderBy: { ordem: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-titulo text-2xl text-preto-fosco">FAQ</h1>
        <Link
          href="/admin/faq/novo"
          className="rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-5 py-2 hover:bg-dourado-claro transition"
        >
          + Nova Pergunta
        </Link>
      </div>

      {faqs.length === 0 ? (
        <p className="font-texto text-madeira">
          Nenhuma pergunta cadastrada ainda.
        </p>
      ) : (
        <div className="bg-white rounded-md border border-madeira/10 overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-branco-gelo border-b border-madeira/10">
              <tr>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Pergunta
                </th>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Ordem
                </th>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Status
                </th>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Acoes
                </th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-b border-madeira/5 last:border-0">
                  <td className="font-texto text-sm text-preto-fosco px-4 py-3 max-w-md truncate">
                    {faq.pergunta}
                  </td>
                  <td className="font-texto text-sm text-madeira px-4 py-3">
                    {faq.ordem}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        faq.publicado
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {faq.publicado ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/faq/${faq.id}`}
                        className="font-texto text-sm text-dourado hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/faq/${faq.id}`}
                        confirmText={`Excluir a pergunta "${faq.pergunta}"?`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

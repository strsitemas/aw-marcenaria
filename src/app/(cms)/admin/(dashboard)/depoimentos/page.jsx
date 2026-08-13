import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function DepoimentosListPage() {
  const depoimentos = await prisma.depoimento.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-titulo text-2xl text-preto-fosco">Depoimentos</h1>
        <Link
          href="/admin/depoimentos/novo"
          className="rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-5 py-2 hover:bg-dourado-claro transition"
        >
          + Novo Depoimento
        </Link>
      </div>

      {depoimentos.length === 0 ? (
        <p className="font-texto text-madeira">
          Nenhum depoimento cadastrado ainda.
        </p>
      ) : (
        <div className="bg-white rounded-md border border-madeira/10 overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-branco-gelo border-b border-madeira/10">
              <tr>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Cliente
                </th>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Nota
                </th>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Video
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
              {depoimentos.map((depoimento) => (
                <tr
                  key={depoimento.id}
                  className="border-b border-madeira/5 last:border-0"
                >
                  <td className="font-texto text-sm text-preto-fosco px-4 py-3">
                    {depoimento.nomeCliente}
                  </td>
                  <td className="font-texto text-sm text-madeira px-4 py-3">
                    {depoimento.notaEstrelas} / 5
                  </td>
                  <td className="font-texto text-sm text-madeira px-4 py-3">
                    {depoimento.videoUrl ? "Sim" : "Não"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        depoimento.publicado
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {depoimento.publicado ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/depoimentos/${depoimento.id}`}
                        className="font-texto text-sm text-dourado hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/depoimentos/${depoimento.id}`}
                        confirmText={`Excluir depoimento de "${depoimento.nomeCliente}"?`}
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

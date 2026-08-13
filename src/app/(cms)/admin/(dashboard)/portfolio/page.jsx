import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function PortfolioListPage() {
  const projetos = await prisma.projetoPortfolio.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-titulo text-2xl text-preto-fosco">Portfólio</h1>
        <Link
          href="/admin/portfolio/novo"
          className="rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-5 py-2 hover:bg-dourado-claro transition"
        >
          + Novo Projeto
        </Link>
      </div>

      {projetos.length === 0 ? (
        <p className="font-texto text-madeira">
          Nenhum projeto cadastrado ainda.
        </p>
      ) : (
        <div className="bg-white rounded-md border border-madeira/10 overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-branco-gelo border-b border-madeira/10">
              <tr>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Titulo
                </th>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Categoria
                </th>
                <th className="font-texto text-xs uppercase text-madeira px-4 py-3">
                  Destaque
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
              {projetos.map((projeto) => (
                <tr
                  key={projeto.id}
                  className="border-b border-madeira/5 last:border-0"
                >
                  <td className="font-texto text-sm text-preto-fosco px-4 py-3">
                    {projeto.titulo}
                  </td>
                  <td className="font-texto text-sm text-madeira px-4 py-3">
                    {projeto.categoria}
                  </td>
                  <td className="px-4 py-3">
                    {projeto.destaque ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-dourado/20 text-preto-fosco">
                        Destaque
                      </span>
                    ) : (
                      <span className="text-xs text-madeira/50">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        projeto.publicado
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {projeto.publicado ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/portfolio/${projeto.id}`}
                        className="font-texto text-sm text-dourado hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/portfolio/${projeto.id}`}
                        confirmText={`Excluir "${projeto.titulo}"?`}
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

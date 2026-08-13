import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function BannersListPage() {
  const banners = await prisma.banner.findMany({
    orderBy: { ordem: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-titulo text-2xl text-preto-fosco">Banners</h1>
        <Link
          href="/admin/banners/novo"
          className="rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-5 py-2 hover:bg-dourado-claro transition"
        >
          + Novo Banner
        </Link>
      </div>

      {banners.length === 0 ? (
        <p className="font-texto text-madeira">
          Nenhum banner cadastrado ainda.
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
                  Botão
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
              {banners.map((banner) => (
                <tr
                  key={banner.id}
                  className="border-b border-madeira/5 last:border-0"
                >
                  <td className="font-texto text-sm text-preto-fosco px-4 py-3">
                    {banner.titulo}
                  </td>
                  <td className="font-texto text-sm text-madeira px-4 py-3">
                    {banner.textoBotao || "-"}
                  </td>
                  <td className="font-texto text-sm text-madeira px-4 py-3">
                    {banner.ordem}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        banner.ativo
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {banner.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/banners/${banner.id}`}
                        className="font-texto text-sm text-dourado hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteButton
                        endpoint={`/api/admin/banners/${banner.id}`}
                        confirmText={`Excluir banner "${banner.titulo}"?`}
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

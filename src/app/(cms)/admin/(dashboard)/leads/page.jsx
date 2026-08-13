import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";

export const dynamic = "force-dynamic";

const rotulosStatus = {
  NOVO: "Novo",
  EM_CONTATO: "Em contato",
  ORCAMENTO_ENVIADO: "Orçamento enviado",
  FECHADO: "Fechado",
  PERDIDO: "Perdido",
};

const STATUS_ARQUIVADOS = ["FECHADO", "PERDIDO"];

export default async function LeadsPage({ searchParams }) {
  const params = await searchParams;
  const mostrarArquivados = params?.arquivados === "1";

  const leads = await prisma.lead.findMany({
    where: mostrarArquivados
      ? { status: { in: STATUS_ARQUIVADOS } }
      : { status: { notIn: STATUS_ARQUIVADOS } },
    orderBy: { criadoEm: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-titulo text-2xl text-dourado">Leads</h1>
        <Link
          href={mostrarArquivados ? "/admin/leads" : "/admin/leads?arquivados=1"}
          className="font-texto text-sm text-dourado hover:underline"
        >
          {mostrarArquivados ? "Ver leads ativos" : "Ver arquivados"}
        </Link>
      </div>

      {leads.length === 0 ? (
        <p className="font-texto text-bege">
          {mostrarArquivados
            ? "Nenhum lead arquivado."
            : "Nenhum lead recebido ainda."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-texto text-sm">
            <thead>
              <tr className="border-b border-dourado/30 text-dourado">
                <th className="py-3 pr-4">Nome</th>
                <th className="py-3 pr-4">Telefone</th>
                <th className="py-3 pr-4">Mensagem</th>
                <th className="py-3 pr-4">Ambiente</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Recebido em</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-dourado/10 text-preto-fosco">
                  <td className="py-3 pr-4">{lead.nome}</td>
                  <td className="py-3 pr-4">{lead.telefone}</td>
                  <td className="py-3 pr-4 max-w-xs truncate">{lead.mensagem || "-"}</td>
                  <td className="py-3 pr-4">{lead.ambienteInteresse || "-"}</td>
                  <td className="py-3 pr-4">
                    <LeadStatusSelect leadId={lead.id} statusAtual={lead.status} />
                  </td>
                  <td className="py-3 pr-4">
                    {new Date(lead.criadoEm).toLocaleDateString("pt-BR")}
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

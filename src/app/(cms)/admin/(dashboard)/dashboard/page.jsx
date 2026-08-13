import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const [
    totalAmbientes,
    totalPortfolio,
    totalDepoimentos,
    totalLeadsNovos,
    totalLeads,
  ] = await Promise.all([
    prisma.ambiente.count(),
    prisma.projetoPortfolio.count(),
    prisma.depoimento.count(),
    prisma.lead.count({ where: { status: "NOVO" } }),
    prisma.lead.count(),
  ]);

  const CARDS = [
    {
      titulo: "Ambientes cadastrados",
      valor: totalAmbientes,
      href: "/admin/ambientes",
    },
    {
      titulo: "Projetos no Portfólio",
      valor: totalPortfolio,
      href: "/admin/portfolio",
    },
    {
      titulo: "Depoimentos",
      valor: totalDepoimentos,
      href: "/admin/depoimentos",
    },
    {
      titulo: "Leads novos",
      valor: totalLeadsNovos,
      href: "/admin/leads",
    },
    {
      titulo: "Leads no total",
      valor: totalLeads,
      href: "/admin/leads",
    },
  ];

  return (
    <div>
      <h1 className="font-titulo text-2xl text-preto-fosco mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <Link
            key={card.titulo}
            href={card.href}
            className="bg-white rounded-md border border-madeira/10 p-6 hover:border-dourado transition"
          >
            <p className="font-texto text-madeira text-sm uppercase tracking-wide">
              {card.titulo}
            </p>
            <p className="font-titulo text-3xl text-preto-fosco mt-2">
              {card.valor}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

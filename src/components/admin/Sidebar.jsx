"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITENS = [
  { nome: "Dashboard", href: "/admin/dashboard" },
  { nome: "Ambientes", href: "/admin/ambientes" },
  { nome: "Portfólio", href: "/admin/portfolio" },
  { nome: "Depoimentos", href: "/admin/depoimentos" },
  { nome: "Blog", href: "/admin/blog" },
  { nome: "Banners", href: "/admin/banners" },
  { nome: "FAQ", href: "/admin/faq" },
  { nome: "Leads", href: "/admin/leads" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-preto-fosco flex-shrink-0 hidden md:flex md:flex-col">
      <div className="h-16 flex items-center px-6 border-b border-dourado/10">
        <span className="font-titulo text-branco-gelo text-lg">AW Admin</span>
      </div>
      <nav className="flex-1 py-6 flex flex-col gap-1">
        {ITENS.map((item) => {
          const ativo =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-6 py-3 font-texto text-sm uppercase tracking-wide transition ${
                ativo
                  ? "bg-dourado/10 text-dourado border-r-2 border-dourado"
                  : "text-branco-gelo/70 hover:text-dourado hover:bg-dourado/5"
              }`}
            >
              {item.nome}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

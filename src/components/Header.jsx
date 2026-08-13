"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { nome: "Sobre", href: "/#sobre" },
  { nome: "Ambientes", href: "/#ambientes" },
  { nome: "Portfólio", href: "/#portfolio" },
  { nome: "Processo", href: "/processo" },
  { nome: "Depoimentos", href: "/#depoimentos" },
  { nome: "Blog", href: "/blog", página: true },
  { nome: "Contato", href: "/#contato" },
];

export default function Header() {
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  useEffect(() => {
    function aoRolar() {
      setRolado(window.scrollY > 40);
    }
    window.addEventListener("scroll", aoRolar);
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        rolado
          ? "bg-preto-fosco/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo/simbolo-aw.jpg"
            alt="AW Marcenaria e Móveis Planejados"
            width={44}
            height={31}
            className="rounded-sm"
            priority
          />
          <span className="font-titulo text-branco-gelo text-lg tracking-wide hidden sm:inline">
            AW Marcenaria
          </span>
        </Link>
        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) =>
            link.pagina ? (
              <Link
                key={link.href}
                href={link.href}
                className="font-texto text-sm uppercase tracking-widest text-branco-gelo/90 hover:text-dourado transition"
              >
                {link.nome}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="font-texto text-sm uppercase tracking-widest text-branco-gelo/90 hover:text-dourado transition"
              >
                {link.nome}
              </a>
            )
          )}
        </nav>
        {/* Botão menu mobile */}
        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          className="md:hidden text-branco-gelo"
          aria-label="Abrir menu"
          aria-expanded={menuAberto}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuAberto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Menu mobile */}
      {menuAberto && (
        <nav className="md:hidden bg-preto-fosco/98 backdrop-blur-sm border-t border-dourado/20">
          <div className="flex flex-col px-6 py-4 gap-4">
            {LINKS.map((link) =>
              link.pagina ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                  className="font-texto text-sm uppercase tracking-widest text-branco-gelo/90 hover:text-dourado transition"
                >
                  {link.nome}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                  className="font-texto text-sm uppercase tracking-widest text-branco-gelo/90 hover:text-dourado transition"
                >
                  {link.nome}
                </a>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

import Image from "next/image";

const LINKS = [
  { nome: "Sobre", href: "/#sobre" },
  { nome: "Ambientes", href: "/#ambientes" },
  { nome: "Portfólio", href: "/#portfolio" },
  { nome: "Processo", href: "/#processo" },
  { nome: "Depoimentos", href: "/#depoimentos" },
  { nome: "FAQ", href: "/#faq" },
  { nome: "Blog", href: "/blog" },
  { nome: "Contato", href: "/#contato" },
];

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-grafite border-t border-dourado/10">
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo e descricao */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo/simbolo-aw.jpg"
                alt="AW Marcenaria e Móveis Planejados"
                width={40}
                height={28}
                className="rounded-sm"
              />
              <span className="font-titulo text-branco-gelo text-base">
                AW Marcenaria
              </span>
            </div>
            <p className="font-texto text-bege/70 text-sm leading-relaxed">
              Marcenaria e móveis planejados de alto padrão. Design,
              qualidade e exclusividade em cada projeto.
            </p>
          </div>

          {/* Links de navegação */}
          <div>
            <h3 className="font-texto text-dourado text-sm uppercase tracking-widest mb-4">
              Navegação
            </h3>
            <nav className="flex flex-col gap-2">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-texto text-bege/70 text-sm hover:text-dourado transition"
                >
                  {link.nome}
                </a>
              ))}
            </nav>
          </div>

          {/* Contato rapido */}
          <div>
            <h3 className="font-texto text-dourado text-sm uppercase tracking-widest mb-4">
              Contato
            </h3>
            <p className="font-texto text-bege/70 text-sm leading-relaxed">
              Preencha o formulário ou chame no WhatsApp para solicitar seu
              projeto sob medida.
            </p>
          </div>
        </div>

        {/* Linha de creditos */}
        <div className="mt-12 pt-6 border-t border-dourado/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-texto text-bege/60 text-xs">
            &copy; {anoAtual} AW Marcenaria e Móveis Planejados. Todos os direitos
            reservados.
          </p>
          <p className="font-texto text-bege/60 text-xs">
            Desenvolvido por{" "}
            <a
              href="https://strsoftware.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-dourado transition"
            >
              STR Software
            </a>{" "}
            &copy; {anoAtual}
          </p>
        </div>
      </div>
    </footer>
  );
}

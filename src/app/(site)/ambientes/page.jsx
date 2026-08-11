import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ambientes | AW Marcenaria e Moveis Planejados",
  description:
    "Conheca os ambientes projetados pela AW Marcenaria: cozinhas, closets, dormitorios, salas, home office e muito mais, com acabamento premium e projeto personalizado.",
};

export default async function AmbientesPage() {
  const ambientes = await prisma.ambiente.findMany({
    orderBy: { criadoEm: "desc" },
  });

  return (
    <main className="bg-preto-fosco min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-texto text-dourado tracking-[0.3em] text-sm uppercase mb-4 text-center">
          Nossos Ambientes
        </p>
        <h1 className="font-titulo text-4xl md:text-5xl text-branco-gelo text-center mb-6">
          Cada espaco, um projeto exclusivo
        </h1>
        <p className="font-texto text-bege text-center max-w-2xl mx-auto mb-16">
          Da cozinha ao closet, cada ambiente e pensado sob medida - com
          consultoria de design, materiais premium e acabamento impecavel do
          inicio ao fim.
        </p>

        {ambientes.length === 0 ? (
          <p className="font-texto text-bege text-center">
            Nenhum ambiente cadastrado ainda.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ambientes.map((ambiente) => (
              <div
                key={ambiente.id}
                className="group relative overflow-hidden rounded-lg border border-dourado/10 bg-grafite"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={ambiente.imagemCapa}
                    alt={ambiente.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-preto-fosco/90 via-preto-fosco/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="font-titulo text-xl text-branco-gelo mb-2">
                    {ambiente.titulo}
                  </h2>
                  <p className="font-texto text-bege text-sm mb-4 line-clamp-3">
                    {ambiente.descricao}
                  </p>
                  <Link
                    href="/#portfolio"
                    className="inline-block font-texto text-dourado text-sm border-b border-dourado/40 hover:border-dourado transition"
                  >
                    Ver Projeto
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

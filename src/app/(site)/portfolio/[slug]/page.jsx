import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PortfolioDetalhePage({ params }) {
  const { slug } = await params;

  const projeto = await prisma.projetoPortfolio.findUnique({
    where: { slug },
  });

  if (!projeto || !projeto.publicado) {
    notFound();
  }

  return (
    <main className="bg-preto-fosco min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-texto text-dourado tracking-[0.3em] text-sm uppercase text-center mb-4">
          {projeto.categoria}
        </p>
        <h1 className="font-titulo text-4xl text-branco-gelo text-center mb-10">
          {projeto.titulo}
        </h1>

        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-10">
          <Image
            src={projeto.imagemCapa}
            alt={projeto.titulo}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
            className="object-cover"
            priority
          />
        </div>

        <p className="font-texto text-bege text-lg leading-relaxed text-center max-w-2xl mx-auto mb-12">
          {projeto.descricao}
        </p>

        {projeto.imagensGaleria && projeto.imagensGaleria.length > 0 && (
          <div className="mb-12">
            <h2 className="font-titulo text-2xl text-branco-gelo text-center mb-6">
              Galeria do Projeto
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {projeto.imagensGaleria.map((img, index) => (
                <div
                  key={index}
                  className="relative w-full h-64 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${projeto.titulo} - foto ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <a
            href="/#contato"
            className="inline-block rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-8 py-3 hover:bg-dourado-claro transition"
          >
            Quero um Projeto Assim
          </a>
        </div>
      </div>
    </main>
  );
}

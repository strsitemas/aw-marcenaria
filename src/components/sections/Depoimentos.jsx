import { prisma } from "@/lib/prisma";
import DepoimentosSwiper from "./DepoimentosSwiper";

export default async function Depoimentos() {
  const depoimentos = await prisma.depoimento.findMany({
    where: { publicado: true },
    orderBy: { criadoEm: "desc" },
  });

  if (depoimentos.length === 0) return null;

  return (
    <section
      id="depoimentos"
      className="bg-preto-fosco py-20 md:py-32"
      aria-labelledby="depoimentos-titulo"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        <div className="mb-14 text-center">
          <span className="font-texto text-dourado tracking-[0.3em] text-sm uppercase">
            Depoimentos
          </span>
          <h2
            id="depoimentos-titulo"
            className="font-titulo text-3xl md:text-4xl text-branco-gelo leading-tight mt-4"
          >
            Quem confiou, recomenda
          </h2>
        </div>

        <DepoimentosSwiper depoimentos={depoimentos} />
      </div>
    </section>
  );
}

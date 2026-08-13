import Image from "next/image";
import { getImageUrl, DEFAULT_BLUR } from "@/lib/images";

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="bg-branco-gelo py-20 md:py-32"
      aria-labelledby="sobre-titulo"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-8">
        {/* Imagem */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
          <Image
            src="/images/sobre/atelie.jpg"
            alt="Marceneiro da AW Marcenaria trabalhando em peca de movel planejado em madeira nobre"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR}
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-6">
          <span className="font-texto text-dourado-escuro tracking-[0.3em] text-sm uppercase">
            Sobre a AW
          </span>

          <h2
            id="sobre-titulo"
            className="font-titulo text-3xl md:text-4xl text-preto-fosco leading-tight"
          >
            Onde a precisão encontra a elegância, criando ambientes para gerações.
          </h2>

          <p className="font-texto text-madeira text-base md:text-lg leading-relaxed">
            Ha mais de uma década, a AW Marcenaria transforma projetos em móveis planejados de alto padrão, combinando madeiras nobres, acabamento impecável e um processo artesanal que valoriza cada detalhe, criando ambientes únicos e atemporais.
          </p>

          <p className="font-texto text-madeira/90 text-base md:text-lg leading-relaxed">
            Do primeiro esboço a instalação final, cada projeto e desenvolvido sob medida, unindo precisão, sofisticação e excelência artesanal. O resultado são ambientes funcionais, duráveis e com uma estética atemporal, criados para valorizar cada espaço e refletir a personalidade de seus clientes.
          </p>

          <a
            href="/#contato"
            className="mt-4 inline-block w-fit rounded-md border border-dourado/40 text-preto-fosco font-texto px-8 py-3 hover:border-dourado hover:bg-dourado/10 transition"
          >
            Fale com a gente
          </a>
        </div>
      </div>
    </section>
  );
}

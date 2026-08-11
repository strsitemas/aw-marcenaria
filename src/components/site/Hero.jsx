"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

function HeroConteudo({ titulo, subtitulo, linkBotao, textoBotao }) {
  return (
    <div className="relative z-10 text-center px-6 max-w-3xl swiper-no-swiping">
      <p className="font-texto text-dourado tracking-[0.3em] text-sm uppercase mb-4">
        Marcenaria e Moveis Planejados
      </p>
      <h1 className="font-titulo text-4xl md:text-6xl text-branco-gelo leading-tight mb-6">
        {titulo}
      </h1>
      {subtitulo && (
        <p className="font-texto text-bege text-lg mb-10 max-w-xl mx-auto">
          {subtitulo}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={linkBotao || "#contato"}
          className="rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-8 py-3 hover:bg-dourado-claro transition"
        >
          {textoBotao || "Solicite um Projeto"}
        </Link>
        <a
          href="#ambientes"
          className="rounded-md border border-dourado/40 text-branco-gelo font-texto px-8 py-3 hover:border-dourado transition"
        >
          Conheca nossos ambientes
        </a>
      </div>
    </div>
  );
}

export default function Hero({ banners = [] }) {
  // Fallback: nenhum banner ativo cadastrado ainda
  if (!banners || banners.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-preto-fosco overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-preto-fosco" />
        <HeroConteudo
          titulo={
            <>
              Ambientes que refletem
              <span className="block text-dourado">quem voce e</span>
            </>
          }
          subtitulo="Projetos exclusivos de marcenaria planejada: do conceito a instalacao, com acabamento impecavel e atendimento personalizado do inicio ao fim."
          linkBotao="#contato"
          textoBotao="Solicite um Projeto"
        />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-preto-fosco">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={banners.length > 1}
        noSwipingClass="swiper-no-swiping"
        className="h-screen w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.imagem})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-preto-fosco" />
              <HeroConteudo
                titulo={banner.titulo}
                subtitulo={banner.subtitulo}
                linkBotao={banner.linkBotao}
                textoBotao={banner.textoBotao}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

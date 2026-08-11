"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function renderEstrelas(nota) {
  return "★".repeat(nota) + "☆".repeat(5 - nota);
}

export default function DepoimentosSwiper({ depoimentos }) {
  if (!depoimentos || depoimentos.length === 0) {
    return null;
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="depoimentos-swiper"
      >
        {depoimentos.map((depoimento) => (
          <SwiperSlide key={depoimento.id}>
            <div className="text-center px-4 md:px-12 pb-14">
              <p className="font-titulo text-xl md:text-2xl text-branco-gelo leading-relaxed italic">
                "{depoimento.texto}"
              </p>
              <div className="mt-8">
                <p className="font-texto text-dourado uppercase tracking-widest text-sm">
                  {depoimento.nomeCliente}
                </p>
                <p className="font-texto text-bege text-sm mt-1" aria-label={`Nota ${depoimento.notaEstrelas} de 5`}>
                  {renderEstrelas(depoimento.notaEstrelas)}
                </p>
                {depoimento.videoUrl && (
                  <a
                    href={depoimento.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 font-texto text-xs text-dourado hover:underline"
                  >
                    Assistir depoimento em video
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Estilos do Swiper adaptados a paleta da marca */}
      <style jsx global>{`
        .depoimentos-swiper .swiper-pagination-bullet {
          background: #e8dfcf;
          opacity: 0.4;
        }
        .depoimentos-swiper .swiper-pagination-bullet-active {
          background: #c9a24b;
          opacity: 1;
        }
        .depoimentos-swiper .swiper-button-next,
        .depoimentos-swiper .swiper-button-prev {
          color: #c9a24b;
        }
      `}</style>
    </>
  );
}

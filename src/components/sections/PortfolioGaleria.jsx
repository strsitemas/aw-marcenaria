"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { imagemValida } from "@/lib/imagem";

export default function PortfolioGaleria({ projetos }) {
  const categorias = useMemo(() => {
    const unicas = Array.from(new Set(projetos.map((p) => p.categoria)));
    return ["Todos", ...unicas];
  }, [projetos]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const projetosFiltrados =
    categoriaAtiva === "Todos"
      ? projetos
      : projetos.filter((p) => p.categoria === categoriaAtiva);
  if (projetos.length === 0) {
    return (
      <p className="font-texto text-madeira text-center">
        Nenhum projeto publicado no momento.
      </p>
    );
  }
  return (
    <>
      {/* Filtro de categorias */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categorias.map((categoria) => {
          const ativo = categoria === categoriaAtiva;
          return (
            <button
              key={categoria}
              type="button"
              onClick={() => setCategoriaAtiva(categoria)}
              className={`font-texto text-sm uppercase tracking-widest px-5 py-2 rounded-md border transition ${
                ativo
                  ? "bg-dourado text-preto-fosco border-dourado"
                  : "border-madeira/30 text-madeira hover:border-dourado hover:text-dourado"
              }`}
            >
              {categoria}
            </button>
          );
        })}
      </div>
      {/* Grid de projetos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetosFiltrados.map((projeto) => (
          <Link
            key={projeto.id}
            href={`/portfolio/${projeto.slug}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-md block bg-preto-fosco"
          >
            {imagemValida(projeto.imagemCapa) ? (
              <Image
                src={projeto.imagemCapa}
                alt={projeto.titulo}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-texto text-xs text-branco-gelo/40 uppercase tracking-widest">
                  Imagem indisponível
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="font-texto text-dourado text-xs uppercase tracking-widest">
                {projeto.categoria}
              </span>
              <h3 className="font-titulo text-lg text-branco-gelo mt-1">
                {projeto.titulo}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

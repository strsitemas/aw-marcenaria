"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const portfolioSchema = z.object({
  titulo: z.string().min(2, "Informe o título"),
  slug: z
    .string()
    .min(2, "Informe o slug")
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minusculas, numeros e hifen"),
  descricao: z.string().min(5, "Informe a descrição"),
  categoria: z.string().min(2, "Informe a categoria"),
  imagemCapa: z.string().min(1, "Informe o caminho da imagem de capa"),
  imagensGaleriaTexto: z.string().optional(),
  destaque: z.boolean().default(false),
  publicado: z.boolean().default(true),
});

function gerarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function PortfolioForm({ projeto }) {
  const router = useRouter();
  const [erro, setErro] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues: projeto
      ? {
          ...projeto,
          imagensGaleriaTexto: (projeto.imagensGaleria || []).join("\n"),
        }
      : {
          titulo: "",
          slug: "",
          descricao: "",
          categoria: "",
          imagemCapa: "",
          imagensGaleriaTexto: "",
          destaque: false,
          publicado: true,
        },
  });

  async function onSubmit(dados) {
    setErro("");
    try {
      const imagensGaleria = (dados.imagensGaleriaTexto || "")
        .split("\n")
        .map((linha) => linha.trim())
        .filter(Boolean);

      const payload = {
        titulo: dados.titulo,
        slug: dados.slug,
        descricao: dados.descricao,
        categoria: dados.categoria,
        imagemCapa: dados.imagemCapa,
        imagensGaleria,
        destaque: dados.destaque,
        publicado: dados.publicado,
      };

      const url = projeto
        ? `/api/admin/portfolio/${projeto.id}`
        : "/api/admin/portfolio";
      const method = projeto ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resposta.ok) throw new Error("Falha ao salvar");

      router.push("/admin/portfolio");
      router.refresh();
    } catch (error) {
      setErro("Não foi possivel salvar. Tente novamente.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 max-w-xl"
    >
      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Titulo *
        </label>
        <input
          type="text"
          {...register("titulo")}
          onBlur={(e) => {
            if (!projeto) setValue("slug", gerarSlug(e.target.value));
          }}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.titulo && (
          <p className="text-sm text-red-700 mt-1">{errors.titulo.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Slug *
        </label>
        <input
          type="text"
          {...register("slug")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.slug && (
          <p className="text-sm text-red-700 mt-1">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Categoria *
        </label>
        <input
          type="text"
          placeholder="Cozinhas, Quartos, Salas, Escritórios..."
          {...register("categoria")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.categoria && (
          <p className="text-sm text-red-700 mt-1">
            {errors.categoria.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Descricao *
        </label>
        <textarea
          rows={4}
          {...register("descricao")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.descricao && (
          <p className="text-sm text-red-700 mt-1">
            {errors.descricao.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Caminho da imagem de capa *
        </label>
        <input
          type="text"
          placeholder="/images/portfolio/projeto-01.jpg"
          {...register("imagemCapa")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.imagemCapa && (
          <p className="text-sm text-red-700 mt-1">
            {errors.imagemCapa.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Galeria de imagens (uma por linha)
        </label>
        <textarea
          rows={4}
          placeholder={
            "/images/portfolio/projeto-01-galeria-1.jpg\n/images/portfolio/projeto-01-galeria-2.jpg"
          }
          {...register("imagensGaleriaTexto")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        <p className="text-xs text-madeira/70 mt-1">
          Copie as fotos para public/images/portfolio/ e liste um caminho
          por linha.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="destaque"
          {...register("destaque")}
          className="h-4 w-4"
        />
        <label
          htmlFor="destaque"
          className="font-texto text-sm text-preto-fosco"
        >
          Projeto em destaque
        </label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="publicado"
          {...register("publicado")}
          className="h-4 w-4"
        />
        <label
          htmlFor="publicado"
          className="font-texto text-sm text-preto-fosco"
        >
          Publicado (visivel no site)
        </label>
      </div>

      {erro && <p className="text-sm text-red-700">{erro}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-6 py-3 hover:bg-dourado-claro transition disabled:opacity-60"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/portfolio")}
          className="rounded-md border border-madeira/30 text-madeira font-texto px-6 py-3 hover:border-dourado transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

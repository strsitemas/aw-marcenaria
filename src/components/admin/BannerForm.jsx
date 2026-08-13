"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const bannerSchema = z.object({
  titulo: z.string().min(2, "Informe o título"),
  subtitulo: z.string().optional().or(z.literal("")),
  imagem: z.string().min(1, "Informe o caminho da imagem"),
  linkBotao: z.string().optional().or(z.literal("")),
  textoBotao: z.string().optional().or(z.literal("")),
  ordem: z.coerce.number().int().default(0),
  ativo: z.boolean().default(true),
});

export default function BannerForm({ banner }) {
  const router = useRouter();
  const [erro, setErro] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: banner || {
      titulo: "",
      subtitulo: "",
      imagem: "",
      linkBotao: "",
      textoBotao: "",
      ordem: 0,
      ativo: true,
    },
  });

  async function onSubmit(dados) {
    setErro("");
    try {
      const url = banner ? `/api/admin/banners/${banner.id}` : "/api/admin/banners";
      const method = banner ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Falha ao salvar");

      router.push("/admin/banners");
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
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.titulo && (
          <p className="text-sm text-red-700 mt-1">{errors.titulo.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Subtitulo (opcional)
        </label>
        <input
          type="text"
          {...register("subtitulo")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.subtitulo && (
          <p className="text-sm text-red-700 mt-1">{errors.subtitulo.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Caminho da imagem *
        </label>
        <input
          type="text"
          placeholder="/images/banners/banner-01.jpg"
          {...register("imagem")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        <p className="text-xs text-madeira/70 mt-1">
          Copie a foto para public/images/banners/ e informe o caminho aqui
          (upload direto ainda não esta disponivel).
        </p>
        {errors.imagem && (
          <p className="text-sm text-red-700 mt-1">{errors.imagem.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Link do botao (opcional)
        </label>
        <input
          type="text"
          placeholder="/#contato"
          {...register("linkBotao")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.linkBotao && (
          <p className="text-sm text-red-700 mt-1">{errors.linkBotao.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Texto do botao (opcional)
        </label>
        <input
          type="text"
          placeholder="Solicitar um Projeto"
          {...register("textoBotao")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.textoBotao && (
          <p className="text-sm text-red-700 mt-1">{errors.textoBotao.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Ordem de exibicao
        </label>
        <input
          type="number"
          {...register("ordem")}
          className="w-32 rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="ativo"
          {...register("ativo")}
          className="h-4 w-4"
        />
        <label htmlFor="ativo" className="font-texto text-sm text-preto-fosco">
          Ativo (visivel no site)
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
          onClick={() => router.push("/admin/banners")}
          className="rounded-md border border-madeira/30 text-madeira font-texto px-6 py-3 hover:border-dourado transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

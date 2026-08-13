"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const postSchema = z.object({
  titulo: z.string().min(3, "Informe o título"),
  slug: z
    .string()
    .min(3, "Informe o slug")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use apenas letras minusculas, numeros e hifen"),
  resumo: z.string().min(10, "Escreva um resumo (minimo 10 caracteres)"),
  conteudo: z.string().min(20, "Escreva o conteudo (minimo 20 caracteres)"),
  imagemCapa: z.string().min(1, "Informe o caminho da imagem de capa"),
  metaTitulo: z.string().optional().or(z.literal("")),
  metaDescricao: z.string().optional().or(z.literal("")),
  publicado: z.boolean().default(false),
});

function gerarSlug(texto) {
  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostBlogForm({ post }) {
  const router = useRouter();
  const [erro, setErro] = useState("");
  const slugEditadoManualmente = useRef(Boolean(post));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: post || {
      titulo: "",
      slug: "",
      resumo: "",
      conteudo: "",
      imagemCapa: "",
      metaTitulo: "",
      metaDescricao: "",
      publicado: false,
    },
  });

  const titulo = watch("titulo");

  useEffect(() => {
    if (!slugEditadoManualmente.current) {
      setValue("slug", gerarSlug(titulo || ""));
    }
  }, [titulo, setValue]);

  async function onSubmit(dados) {
    setErro("");
    try {
      const url = post ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
      const method = post ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => ({}));
        throw new Error(corpo.erro || "Falha ao salvar");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      setErro(error.message || "Não foi possivel salvar. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-2xl">
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
          Slug (URL) *
        </label>
        <input
          type="text"
          placeholder="cuidados-com-móveis-planejados"
          {...register("slug", {
            onChange: () => {
              slugEditadoManualmente.current = true;
            },
          })}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        <p className="text-xs text-madeira/70 mt-1">
          Gerado automaticamente a partir do titulo. Pode editar se quiser uma URL diferente.
        </p>
        {errors.slug && (
          <p className="text-sm text-red-700 mt-1">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Resumo *
        </label>
        <textarea
          rows={3}
          {...register("resumo")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        <p className="text-xs text-madeira/70 mt-1">
          Aparece na listagem do blog e como descricao padrão para buscadores se o Meta Descricao ficar em branco.
        </p>
        {errors.resumo && (
          <p className="text-sm text-red-700 mt-1">{errors.resumo.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Conteudo *
        </label>
        <textarea
          rows={14}
          {...register("conteudo")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.conteudo && (
          <p className="text-sm text-red-700 mt-1">{errors.conteudo.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Caminho da imagem de capa *
        </label>
        <input
          type="text"
          placeholder="/images/blog/post-01.jpg"
          {...register("imagemCapa")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        <p className="text-xs text-madeira/70 mt-1">
          Copie a foto para public/images/blog/ e informe o caminho aqui, sem o prefixo "public"
          (upload direto ainda não esta disponivel).
        </p>
        {errors.imagemCapa && (
          <p className="text-sm text-red-700 mt-1">{errors.imagemCapa.message}</p>
        )}
      </div>

      <fieldset className="border border-madeira/20 rounded-md p-4">
        <legend className="font-texto text-sm text-preto-fosco px-1">
          SEO (opcional)
        </legend>
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-texto text-sm text-preto-fosco block mb-1">
              Meta titulo
            </label>
            <input
              type="text"
              placeholder="Deixe em branco para usar o título do post"
              {...register("metaTitulo")}
              className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
            />
          </div>
          <div>
            <label className="font-texto text-sm text-preto-fosco block mb-1">
              Meta descricao
            </label>
            <textarea
              rows={2}
              placeholder="Deixe em branco para usar o resumo"
              {...register("metaDescricao")}
              className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
            />
          </div>
        </div>
      </fieldset>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="publicado"
          {...register("publicado")}
          className="h-4 w-4"
        />
        <label htmlFor="publicado" className="font-texto text-sm text-preto-fosco">
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
          onClick={() => router.push("/admin/blog")}
          className="rounded-md border border-madeira/30 text-madeira font-texto px-6 py-3 hover:border-dourado transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

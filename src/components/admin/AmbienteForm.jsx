"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ambienteSchema = z.object({
  titulo: z.string().min(2, "Informe o título"),
  slug: z
    .string()
    .min(2, "Informe o slug")
    .regex(/^[a-z0-9-]+$/, "Use apenas letras minusculas, numeros e hifen"),
  descricao: z.string().min(5, "Informe a descrição"),
  imagemCapa: z.string().min(1, "Informe o caminho da imagem"),
  ordem: z.coerce.number().int().default(0),
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

export default function AmbienteForm({ ambiente }) {
  const router = useRouter();
  const [erro, setErro] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ambienteSchema),
    defaultValues: ambiente || {
      titulo: "",
      slug: "",
      descricao: "",
      imagemCapa: "",
      ordem: 0,
      publicado: true,
    },
  });

  async function onSubmit(dados) {
    setErro("");
    try {
      const url = ambiente
        ? `/api/admin/ambientes/${ambiente.id}`
        : "/api/admin/ambientes";
      const method = ambiente ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Falha ao salvar");

      router.push("/admin/ambientes");
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
            if (!ambiente) setValue("slug", gerarSlug(e.target.value));
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
          placeholder="/images/ambientes/cozinha.jpg"
          {...register("imagemCapa")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        <p className="text-xs text-madeira/70 mt-1">
          Copie a foto para public/images/ambientes/ e informe o caminho
          aqui (upload direto ainda não esta disponivel).
        </p>
        {errors.imagemCapa && (
          <p className="text-sm text-red-700 mt-1">
            {errors.imagemCapa.message}
          </p>
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
          onClick={() => router.push("/admin/ambientes")}
          className="rounded-md border border-madeira/30 text-madeira font-texto px-6 py-3 hover:border-dourado transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

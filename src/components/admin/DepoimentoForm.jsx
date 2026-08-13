"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const depoimentoSchema = z.object({
  nomeCliente: z.string().min(2, "Informe o nome do cliente"),
  texto: z.string().min(5, "Informe o depoimento"),
  notaEstrelas: z.coerce.number().int().min(1, "Nota minima 1").max(5, "Nota máxima 5").default(5),
  videoUrl: z.string().optional().or(z.literal("")),
  publicado: z.boolean().default(true),
});

export default function DepoimentoForm({ depoimento }) {
  const router = useRouter();
  const [erro, setErro] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(depoimentoSchema),
    defaultValues: depoimento || {
      nomeCliente: "",
      texto: "",
      notaEstrelas: 5,
      videoUrl: "",
      publicado: true,
    },
  });

  async function onSubmit(dados) {
    setErro("");
    try {
      const url = depoimento
        ? `/api/admin/depoimentos/${depoimento.id}`
        : "/api/admin/depoimentos";
      const method = depoimento ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Falha ao salvar");

      router.push("/admin/depoimentos");
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
          Nome do Cliente *
        </label>
        <input
          type="text"
          {...register("nomeCliente")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.nomeCliente && (
          <p className="text-sm text-red-700 mt-1">{errors.nomeCliente.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Depoimento *
        </label>
        <textarea
          rows={4}
          {...register("texto")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.texto && (
          <p className="text-sm text-red-700 mt-1">{errors.texto.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Nota (1 a 5) *
        </label>
        <input
          type="number"
          min={1}
          max={5}
          {...register("notaEstrelas")}
          className="w-32 rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.notaEstrelas && (
          <p className="text-sm text-red-700 mt-1">
            {errors.notaEstrelas.message}
          </p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Link do video (opcional)
        </label>
        <input
          type="text"
          placeholder="https://youtube.com/..."
          {...register("videoUrl")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        <p className="text-xs text-madeira/70 mt-1">
          Deixe em branco se o depoimento for apenas em texto.
        </p>
        {errors.videoUrl && (
          <p className="text-sm text-red-700 mt-1">{errors.videoUrl.message}</p>
        )}
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
          onClick={() => router.push("/admin/depoimentos")}
          className="rounded-md border border-madeira/30 text-madeira font-texto px-6 py-3 hover:border-dourado transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

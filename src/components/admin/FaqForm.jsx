"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const faqSchema = z.object({
  pergunta: z.string().min(5, "Informe a pergunta"),
  resposta: z.string().min(5, "Informe a resposta"),
  ordem: z.coerce.number().int().default(0),
  publicado: z.boolean().default(true),
});

export default function FaqForm({ faq }) {
  const router = useRouter();
  const [erro, setErro] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: faq || {
      pergunta: "",
      resposta: "",
      ordem: 0,
      publicado: true,
    },
  });

  async function onSubmit(dados) {
    setErro("");
    try {
      const url = faq ? `/api/admin/faq/${faq.id}` : "/api/admin/faq";
      const method = faq ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Falha ao salvar");

      router.push("/admin/faq");
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
          Pergunta *
        </label>
        <input
          type="text"
          {...register("pergunta")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.pergunta && (
          <p className="text-sm text-red-700 mt-1">{errors.pergunta.message}</p>
        )}
      </div>

      <div>
        <label className="font-texto text-sm text-preto-fosco block mb-1">
          Resposta *
        </label>
        <textarea
          rows={5}
          {...register("resposta")}
          className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
        />
        {errors.resposta && (
          <p className="text-sm text-red-700 mt-1">
            {errors.resposta.message}
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
          onClick={() => router.push("/admin/faq")}
          className="rounded-md border border-madeira/30 text-madeira font-texto px-6 py-3 hover:border-dourado transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

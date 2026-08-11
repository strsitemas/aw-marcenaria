"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contatoSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo"),
  telefone: z.string().min(10, "Informe um telefone valido com DDD"),
  email: z.string().email("E-mail invalido").optional().or(z.literal("")),
  ambienteInteresse: z.string().optional(),
  mensagem: z.string().optional(),
});

const AMBIENTES_OPCOES = [
  "Cozinha",
  "Quarto",
  "Sala",
  "Home Office",
  "Banheiro",
  "Area Gourmet",
  "Outro",
];

export default function Contato() {
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contatoSchema),
  });

  async function onSubmit(dados) {
    setErroEnvio(false);
    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Falha ao enviar");

      setEnviado(true);
      reset();
    } catch (error) {
      setErroEnvio(true);
    }
  }

  const numeroWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <section
      id="contato"
      className="bg-branco-gelo py-20 md:py-32"
      aria-labelledby="contato-titulo"
    >
      <div className="mx-auto max-w-2xl px-6 md:px-8">
        <div className="mb-12 text-center">
          <span className="font-texto text-dourado tracking-[0.3em] text-sm uppercase">
            Contato
          </span>
          <h2
            id="contato-titulo"
            className="font-titulo text-3xl md:text-4xl text-preto-fosco leading-tight mt-4"
          >
            Vamos planejar o seu projeto
          </h2>
          <p className="font-texto text-madeira mt-4">
            Preencha o formulario abaixo e nossa equipe entra em contato para
            entender seu projeto e agendar uma visita.
          </p>
        </div>

        {enviado ? (
          <div className="text-center bg-dourado/10 border border-dourado/40 rounded-md p-8">
            <p className="font-titulo text-xl text-preto-fosco">
              Recebemos sua mensagem!
            </p>
            <p className="font-texto text-madeira mt-2">
              Em breve nossa equipe entra em contato pelo telefone informado.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="font-texto text-sm text-preto-fosco block mb-1">
                Nome completo *
              </label>
              <input
                type="text"
                {...register("nome")}
                className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
              />
              {errors.nome && (
                <p className="text-sm text-red-700 mt-1">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-texto text-sm text-preto-fosco block mb-1">
                Telefone / WhatsApp *
              </label>
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                {...register("telefone")}
                className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
              />
              {errors.telefone && (
                <p className="text-sm text-red-700 mt-1">
                  {errors.telefone.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-texto text-sm text-preto-fosco block mb-1">
                E-mail
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
              />
              {errors.email && (
                <p className="text-sm text-red-700 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-texto text-sm text-preto-fosco block mb-1">
                Ambiente de interesse
              </label>
              <select
                {...register("ambienteInteresse")}
                className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
              >
                <option value="">Selecione (opcional)</option>
                {AMBIENTES_OPCOES.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-texto text-sm text-preto-fosco block mb-1">
                Mensagem
              </label>
              <textarea
                rows={4}
                {...register("mensagem")}
                className="w-full rounded-md border border-madeira/30 bg-white px-4 py-3 font-texto text-preto-fosco focus:outline-none focus:border-dourado"
              />
            </div>

            {erroEnvio && (
              <p className="text-sm text-red-700">
                Nao foi possivel enviar agora. Tente novamente ou chame no
                WhatsApp abaixo.
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-8 py-3 hover:bg-dourado-claro transition disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        )}

        {numeroWhatsapp && (
          <div className="text-center mt-8">
            <a
              href={`https://wa.me/${numeroWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-texto text-dourado underline underline-offset-4 hover:text-dourado-claro transition"
            >
              Prefere falar direto? Chama no WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

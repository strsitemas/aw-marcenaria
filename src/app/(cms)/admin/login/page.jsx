"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const resultado = await signIn("credentials", {
      email,
      senha,
      redirect: false,
    });

    setCarregando(false);

    if (resultado?.error) {
      setErro("E-mail ou senha invalidos.");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-preto-fosco px-4">
      <div className="w-full max-w-sm bg-grafite border border-dourado/30 rounded-lg p-8">
        <h1 className="font-titulo text-2xl text-dourado text-center mb-1">
          AW Marcenaria
        </h1>
        <p className="font-texto text-bege text-sm text-center mb-6">
          Painel administrativo
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-texto text-sm text-bege mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md bg-preto-fosco border border-dourado/30 px-3 py-2 text-branco-gelo font-texto focus:outline-none focus:border-dourado"
            />
          </div>
          <div>
            <label className="block font-texto text-sm text-bege mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full rounded-md bg-preto-fosco border border-dourado/30 px-3 py-2 text-branco-gelo font-texto focus:outline-none focus:border-dourado"
            />
          </div>

          {erro && (
            <p className="text-red-400 text-sm font-texto">{erro}</p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-md bg-dourado text-preto-fosco font-texto font-semibold py-2 hover:bg-dourado-claro transition disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="flex items-center gap-2 my-5">
          <div className="h-px flex-1 bg-dourado/20" />
          <span className="text-bege text-xs font-texto">ou</span>
          <div className="h-px flex-1 bg-dourado/20" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/admin/dashboard" })}
          className="w-full rounded-md border border-dourado/30 text-bege font-texto py-2 hover:border-dourado transition"
        >
          Entrar com Google
        </button>
      </div>
    </div>
  );
}
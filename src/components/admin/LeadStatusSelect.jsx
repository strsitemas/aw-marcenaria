"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OPCOES = [
  { valor: "NOVO", rotulo: "Novo" },
  { valor: "EM_CONTATO", rotulo: "Em contato" },
  { valor: "ORCAMENTO_ENVIADO", rotulo: "Orçamento enviado" },
  { valor: "FECHADO", rotulo: "Fechado (arquivar)" },
  { valor: "PERDIDO", rotulo: "Perdido (arquivar)" },
];

export default function LeadStatusSelect({ leadId, statusAtual }) {
  const router = useRouter();
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(false);

  async function aoMudar(e) {
    const novoStatus = e.target.value;
    setSalvando(true);
    setErro(false);
    try {
      const resposta = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
      });
      if (!resposta.ok) throw new Error("Falha ao atualizar");
      router.refresh();
    } catch (error) {
      setErro(true);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        defaultValue={statusAtual}
        onChange={aoMudar}
        disabled={salvando}
        className="bg-preto-fosco border border-dourado/30 text-branco-gelo text-xs rounded px-2 py-1 font-texto focus:outline-none focus:border-dourado disabled:opacity-60"
      >
        {OPCOES.map((opcao) => (
          <option key={opcao.valor} value={opcao.valor}>
            {opcao.rotulo}
          </option>
        ))}
      </select>
      {salvando && (
        <span className="text-xs text-madeira">Salvando...</span>
      )}
      {erro && (
        <span className="text-xs text-red-500">Erro ao salvar</span>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  endpoint,
  confirmText = "Tem certeza que deseja excluir?",
}) {
  const router = useRouter();
  const [excluindo, setExcluindo] = useState(false);

  async function excluir() {
    if (!confirm(confirmText)) return;
    setExcluindo(true);
    try {
      const resposta = await fetch(endpoint, { method: "DELETE" });
      if (!resposta.ok) throw new Error("Falha ao excluir");
      router.refresh();
    } catch (error) {
      alert("Nao foi possivel excluir. Tente novamente.");
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <button
      type="button"
      onClick={excluir}
      disabled={excluindo}
      className="font-texto text-sm text-red-700 hover:underline disabled:opacity-60"
    >
      {excluindo ? "Excluindo..." : "Excluir"}
    </button>
  );
}

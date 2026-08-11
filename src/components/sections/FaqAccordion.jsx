"use client";
import { useState } from "react";

export default function FaqAccordion({ itens }) {
  const [abertoId, setAbertoId] = useState(itens[0]?.id ?? null);

  return (
    <div className="flex flex-col divide-y divide-madeira/10">
      {itens.map((item) => {
        const aberto = abertoId === item.id;
        return (
          <div key={item.id} className="py-5">
            <button
              type="button"
              onClick={() => setAbertoId(aberto ? null : item.id)}
              className="w-full flex items-center justify-between text-left gap-4"
              aria-expanded={aberto}
            >
              <span className="font-titulo text-lg text-preto-fosco">
                {item.pergunta}
              </span>
              <span
                className={`font-texto text-dourado text-xl transition-transform duration-300 flex-shrink-0 ${
                  aberto ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {aberto && (
              <p className="font-texto text-madeira text-sm leading-relaxed mt-3 pr-8">
                {item.resposta}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

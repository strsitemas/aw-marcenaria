import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const leadSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo"),
  telefone: z.string().min(10, "Informe um telefone valido com DDD"),
  email: z.string().email("E-mail invalido").optional().or(z.literal("")),
  ambienteInteresse: z.string().optional(),
  mensagem: z.string().optional(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const dados = leadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        nome: dados.nome,
        telefone: dados.telefone,
        email: dados.email || undefined,
        ambienteInteresse: dados.ambienteInteresse || undefined,
        mensagem: dados.mensagem || undefined,
        origem: "site",
      },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { ok: false, erro: "Dados invalidos", detalhes: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao salvar lead:", error);
    return NextResponse.json(
      { ok: false, erro: "Erro interno ao salvar contato" },
      { status: 500 }
    );
  }
}

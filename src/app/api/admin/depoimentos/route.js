import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const depoimentoSchema = z.object({
  nomeCliente: z.string().min(2),
  texto: z.string().min(5),
  notaEstrelas: z.coerce.number().int().min(1).max(5).default(5),
  videoUrl: z.string().optional().or(z.literal("")),
  publicado: z.boolean().default(true),
});

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dados = depoimentoSchema.parse(body);

    const depoimento = await prisma.depoimento.create({ data: dados });
    return NextResponse.json(depoimento, { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { erro: "Dados invalidos", detalhes: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao criar depoimento:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

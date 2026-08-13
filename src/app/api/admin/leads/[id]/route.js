import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const leadUpdateSchema = z.object({
  status: z.enum([
    "NOVO",
    "EM_CONTATO",
    "ORCAMENTO_ENVIADO",
    "FECHADO",
    "PERDIDO",
  ]),
});

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dados = leadUpdateSchema.parse(body);

    const lead = await prisma.lead.update({
      where: { id: params.id },
      data: { status: dados.status },
    });
    return NextResponse.json(lead);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { erro: "Dados invalidos", detalhes: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao atualizar lead:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

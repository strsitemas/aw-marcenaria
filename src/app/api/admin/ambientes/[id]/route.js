import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ambienteSchema = z.object({
  titulo: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  descricao: z.string().min(5),
  imagemCapa: z.string().min(1),
  ordem: z.coerce.number().int().default(0),
  publicado: z.boolean().default(true),
});

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dados = ambienteSchema.parse(body);

    const ambiente = await prisma.ambiente.update({
      where: { id: params.id },
      data: dados,
    });
    return NextResponse.json(ambiente);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { erro: "Dados invalidos", detalhes: error.errors },
        { status: 400 }
      );
    }
    if (error.code === "P2002") {
      return NextResponse.json(
        { erro: "Já existe um ambiente com esse slug" },
        { status: 409 }
      );
    }
    console.error("Erro ao atualizar ambiente:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  try {
    await prisma.ambiente.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao excluir ambiente:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

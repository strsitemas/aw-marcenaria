import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bannerSchema = z.object({
  titulo: z.string().min(2),
  subtitulo: z.string().optional().or(z.literal("")),
  imagem: z.string().min(1),
  linkBotao: z.string().optional().or(z.literal("")),
  textoBotao: z.string().optional().or(z.literal("")),
  ordem: z.coerce.number().int().default(0),
  ativo: z.boolean().default(true),
});

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erro: "Nao autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dados = bannerSchema.parse(body);

    const banner = await prisma.banner.update({
      where: { id: params.id },
      data: dados,
    });
    return NextResponse.json(banner);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { erro: "Dados invalidos", detalhes: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao atualizar banner:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erro: "Nao autorizado" }, { status: 401 });
  }

  try {
    await prisma.banner.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao excluir banner:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

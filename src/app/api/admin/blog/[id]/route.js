import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const postSchema = z.object({
  titulo: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  resumo: z.string().min(10),
  conteudo: z.string().min(20),
  imagemCapa: z.string().min(1),
  metaTitulo: z.string().optional().or(z.literal("")),
  metaDescricao: z.string().optional().or(z.literal("")),
  publicado: z.boolean().default(false),
});

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erro: "Nao autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const dados = postSchema.parse(body);

    const existente = await prisma.postBlog.findUnique({ where: { id } });
    if (!existente) {
      return NextResponse.json({ erro: "Post nao encontrado" }, { status: 404 });
    }

    const publicadoEm = dados.publicado
      ? existente.publicadoEm || new Date()
      : null;

    const post = await prisma.postBlog.update({
      where: { id },
      data: { ...dados, publicadoEm },
    });
    return NextResponse.json(post);
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { erro: "Dados invalidos", detalhes: error.errors },
        { status: 400 }
      );
    }
    if (error.code === "P2002") {
      return NextResponse.json(
        { erro: "Ja existe um post com esse slug" },
        { status: 409 }
      );
    }
    console.error("Erro ao atualizar post:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erro: "Nao autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.postBlog.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao excluir post:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

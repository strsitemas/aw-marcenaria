import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const faqSchema = z.object({
  pergunta: z.string().min(5),
  resposta: z.string().min(5),
  ordem: z.coerce.number().int().default(0),
  publicado: z.boolean().default(true),
});

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ erro: "Nao autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dados = faqSchema.parse(body);

    const faq = await prisma.faqItem.create({ data: dados });
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { erro: "Dados invalidos", detalhes: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao criar pergunta:", error);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}

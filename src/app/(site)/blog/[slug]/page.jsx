import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await prisma.postBlog.findUnique({ where: { slug } });

  if (!post || !post.publicado) {
    return { title: "Post nao encontrado" };
  }

  const titulo = post.metaTitulo || post.titulo;
  const descricao = post.metaDescricao || post.resumo;

  return {
    title: `${titulo} | AW Marcenaria`,
    description: descricao,
    openGraph: {
      title: titulo,
      description: descricao,
      images: post.imagemCapa ? [post.imagemCapa] : [],
      type: "article",
    },
  };
}

export default async function PostBlogPage({ params }) {
  const { slug } = await params;
  const post = await prisma.postBlog.findUnique({ where: { slug } });

  if (!post || !post.publicado) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titulo,
    description: post.resumo,
    image: post.imagemCapa,
    datePublished: post.publicadoEm,
    dateModified: post.atualizadoEm,
    author: {
      "@type": "Organization",
      name: "AW Marcenaria e Moveis Planejados",
    },
  };

  const paragrafos = post.conteudo.split(/\n{2,}/).filter(Boolean);

  return (
    <main className="bg-preto-fosco min-h-screen pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="font-texto text-sm text-dourado hover:underline mb-8 inline-block"
        >
          &larr; Voltar para o Blog
        </Link>

        <p className="font-texto text-dourado tracking-[0.3em] text-sm uppercase mb-4">
          {post.publicadoEm
            ? new Date(post.publicadoEm).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : ""}
        </p>
        <h1 className="font-titulo text-3xl md:text-5xl text-branco-gelo leading-tight mb-8">
          {post.titulo}
        </h1>

        <div className="relative aspect-[16/9] rounded-md overflow-hidden mb-10 bg-black/40">
          <Image
            src={post.imagemCapa}
            alt={post.titulo}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-5">
          {paragrafos.map((paragrafo, indice) => (
            <p
              key={indice}
              className="font-texto text-bege text-lg leading-relaxed whitespace-pre-line"
            >
              {paragrafo}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-dourado/10 text-center">
          <p className="font-texto text-bege mb-4">
            Gostou? Vamos criar um ambiente assim para voce.
          </p>
          <Link
            href="/#contato"
            className="inline-block rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-8 py-3 hover:bg-dourado-claro transition"
          >
            Solicite um Projeto
          </Link>
        </div>
      </article>
    </main>
  );
}

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog | AW Marcenaria e Móveis Planejados",
  description:
    "Artigos sobre marcenaria planejada, design de interiores, materiais e tendências.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.postBlog.findMany({
    where: { publicado: true },
    orderBy: { publicadoEm: "desc" },
  });

  return (
    <main className="bg-preto-fosco min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-texto text-dourado tracking-[0.3em] text-sm uppercase mb-4 text-center">
          Blog
        </p>
        <h1 className="font-titulo text-4xl md:text-5xl text-branco-gelo text-center mb-16">
          Ideias, materiais e tendências
        </h1>

        {posts.length === 0 ? (
          <p className="font-texto text-bege text-center">
            Em breve, novos artigos por aqui.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block rounded-md overflow-hidden border border-dourado/10 hover:border-dourado/40 transition"
              >
                <div className="relative aspect-[4/3] bg-black/40">
                  <Image
                    src={post.imagemCapa}
                    alt={post.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="font-texto text-xs text-dourado uppercase tracking-widest mb-2">
                    {post.publicadoEm
                      ? new Date(post.publicadoEm).toLocaleDateString(
                          "pt-BR",
                          { day: "2-digit", month: "long", year: "numeric" }
                        )
                      : ""}
                  </p>
                  <h2 className="font-titulo text-xl text-branco-gelo mb-2 group-hover:text-dourado transition">
                    {post.titulo}
                  </h2>
                  <p className="font-texto text-sm text-bege/80 line-clamp-3">
                    {post.resumo}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

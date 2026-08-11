import { prisma } from "@/lib/prisma";
import PostBlogForm from "@/components/admin/PostBlogForm";
import { notFound } from "next/navigation";

export default async function EditarPostPage({ params }) {
  const { id } = await params;
  const post = await prisma.postBlog.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div>
      <h1 className="font-titulo text-2xl text-preto-fosco mb-6">
        Editar Post
      </h1>
      <PostBlogForm post={post} />
    </div>
  );
}

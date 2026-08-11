import PostBlogForm from "@/components/admin/PostBlogForm";

export default function NovoPostPage() {
  return (
    <div>
      <h1 className="font-titulo text-2xl text-preto-fosco mb-6">
        Novo Post
      </h1>
      <PostBlogForm />
    </div>
  );
}

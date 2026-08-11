import { prisma } from "@/lib/prisma";
import BannerForm from "@/components/admin/BannerForm";
import { notFound } from "next/navigation";

export default async function EditarBannerPage({ params }) {
  const banner = await prisma.banner.findUnique({
    where: { id: params.id },
  });

  if (!banner) notFound();

  return (
    <div>
      <h1 className="font-titulo text-2xl text-preto-fosco mb-6">
        Editar Banner
      </h1>
      <BannerForm banner={banner} />
    </div>
  );
}

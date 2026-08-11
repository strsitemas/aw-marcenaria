import { prisma } from "@/lib/prisma";
import Hero from "@/components/site/Hero";
import Sobre from "@/components/sections/Sobre";
import Ambientes from "@/components/sections/Ambientes";
import Portfolio from "@/components/sections/Portfolio";
import Processo from "@/components/sections/Processo";
import Depoimentos from "@/components/sections/Depoimentos";
import Faq from "@/components/sections/Faq";
import Contato from "@/components/sections/Contato";

export default async function HomePage() {
  const banners = await prisma.banner.findMany({
    where: { ativo: true },
    orderBy: { ordem: "asc" },
  });

  return (
    <main>
      <Hero banners={banners} />
      <Sobre />
      <Ambientes />
      <Portfolio />
      <Processo />
      <Depoimentos />
      <Faq />
      <Contato />
    </main>
  );
}

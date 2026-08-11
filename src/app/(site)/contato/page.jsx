import Contato from "@/components/sections/Contato";

export const metadata = {
  title: "Contato | AW Marcenaria e Moveis Planejados",
  description:
    "Fale com a AW Marcenaria e solicite um projeto sob medida para o seu ambiente.",
};

export default function ContatoPage() {
  return (
    <div className="pt-20">
      <Contato />
    </div>
  );
}

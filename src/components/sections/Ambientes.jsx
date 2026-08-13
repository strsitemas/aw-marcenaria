import Image from "next/image";

const AMBIENTES = [
  {
    nome: "Cozinhas Planejadas",
    imagem: "/images/ambientes/cozinha.jpg",
    alt: "Cozinha planejada em madeira escura com iluminacao embutida",
  },
  {
    nome: "Quartos e Closets",
    imagem: "/images/ambientes/quarto.jpg",
    alt: "Quarto planejado com closet integrado em marcenaria de alto padrão",
  },
  {
    nome: "Salas de Estar",
    imagem: "/images/ambientes/sala.jpg",
    alt: "Sala de estar com painel de madeira planejado e estante integrada",
  },
  {
    nome: "Home Office",
    imagem: "/images/ambientes/escritorio.jpg",
    alt: "Home office planejado com bancada e estante em madeira nobre",
  },
  {
    nome: "Banheiros",
    imagem: "/images/ambientes/banheiro.jpg",
    alt: "Banheiro com marcenaria planejada e acabamento premium",
  },
  {
    nome: "Área Gourmet",
    imagem: "/images/ambientes/gourmet.jpg",
    alt: "Área gourmet planejada com bancada e armarios em madeira",
  },
];

export default function Ambientes() {
  return (
    <section
      id="ambientes"
      className="bg-preto-fosco py-20 md:py-32"
      aria-labelledby="ambientes-titulo"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-14 text-center">
          <span className="font-texto text-dourado tracking-[0.3em] text-sm uppercase">
            Nossos Projetos
          </span>
          <h2
            id="ambientes-titulo"
            className="font-titulo text-3xl md:text-4xl text-branco-gelo leading-tight mt-4"
          >
            Ambientes planejados para cada momento
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMBIENTES.map((ambiente) => (
            <a
              key={ambiente.nome}
              href="#portfolio"
              className="group relative block aspect-[4/5] overflow-hidden rounded-md"
            >
              <Image
                src={ambiente.imagem}
                alt={ambiente.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-titulo text-xl text-branco-gelo">
                  {ambiente.nome}
                </h3>
                <span className="font-texto text-dourado text-sm uppercase tracking-widest mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver projetos →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

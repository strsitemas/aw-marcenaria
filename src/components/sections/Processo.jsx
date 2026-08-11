const PASSOS = [
  {
    numero: "01",
    titulo: "Consultoria",
    descricao:
      "Entendemos seu estilo, necessidades e espaco em uma conversa inicial sem compromisso.",
  },
  {
    numero: "02",
    titulo: "Projeto",
    descricao:
      "Nossa equipe de design desenvolve o projeto personalizado para o seu ambiente.",
  },
  {
    numero: "03",
    titulo: "Aprovacao",
    descricao:
      "Voce revisa cada detalhe, ajusta o quanto quiser, e aprova a versao final.",
  },
  {
    numero: "04",
    titulo: "Producao",
    descricao:
      "Fabricamos com materiais premium e ferragens de primeira linha em nossa marcenaria.",
  },
  {
    numero: "05",
    titulo: "Instalacao",
    descricao:
      "Equipe especializada realiza a instalacao com precisao e cuidado no seu espaco.",
  },
  {
    numero: "06",
    titulo: "Entrega",
    descricao:
      "Voce recebe o ambiente pronto, com garantia e suporte pos-venda.",
  },
];

export default function Processo() {
  return (
    <section
      id="processo"
      className="bg-grafite py-20 md:py-32"
      aria-labelledby="processo-titulo"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-14 text-center">
          <span className="font-texto text-dourado tracking-[0.3em] text-sm uppercase">
            Como funciona
          </span>
          <h2
            id="processo-titulo"
            className="font-titulo text-3xl md:text-4xl text-branco-gelo leading-tight mt-4"
          >
            Do primeiro contato a entrega
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {PASSOS.map((passo) => (
            <div key={passo.numero} className="flex flex-col gap-3">
              <span className="font-titulo text-4xl text-dourado/60">
                {passo.numero}
              </span>
              <h3 className="font-titulo text-xl text-branco-gelo">
                {passo.titulo}
              </h3>
              <p className="font-texto text-bege/70 text-sm leading-relaxed">
                {passo.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

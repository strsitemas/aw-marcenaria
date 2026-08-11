import DepoimentoForm from "@/components/admin/DepoimentoForm";

export default function NovoDepoimentoPage() {
  return (
    <div>
      <h1 className="font-titulo text-2xl text-preto-fosco mb-6">
        Novo Depoimento
      </h1>
      <DepoimentoForm />
    </div>
  );
}

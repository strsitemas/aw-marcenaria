$raiz = "C:\Users\cotaw\Desktop\aw-marcenaria"

$content = @'
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AmbienteDetalhePage({ params }) {
  const { slug } = await params;

  const ambiente = await prisma.ambiente.findUnique({
    where: { slug },
  });

  if (!ambiente || !ambiente.publicado) {
    notFound();
  }

  return (
    <main className="bg-preto-fosco min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-texto text-dourado tracking-[0.3em] text-sm uppercase text-center mb-4">
          Ambiente
        </p>
        <h1 className="font-titulo text-4xl text-branco-gelo text-center mb-10">
          {ambiente.titulo}
        </h1>

        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-10">
          <Image
            src={ambiente.imagemCapa}
            alt={ambiente.titulo}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <p className="font-texto text-bege text-lg leading-relaxed text-center max-w-2xl mx-auto mb-12">
          {ambiente.descricao}
        </p>

        <div className="text-center">
          <a
            href="/#contato"
            className="inline-block rounded-md bg-dourado text-preto-fosco font-texto font-semibold px-8 py-3 hover:bg-dourado-claro transition"
          >
            Solicitar Projeto para este Ambiente
          </a>
        </div>
      </div>
    </main>
  );
}
'@

$pasta = "$raiz\src\app\(site)\ambientes\[slug]"
New-Item -ItemType Directory -Path $pasta -Force | Out-Null

$caminho = "$pasta\page.jsx"
$utf8SemBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($caminho, $content, $utf8SemBom)

if (Test-Path -LiteralPath $caminho) {
    $tamanho = (Get-Item -LiteralPath $caminho).Length
    $linhas = (Get-Content -LiteralPath $caminho).Count
    $bytes = [System.IO.File]::ReadAllBytes($caminho)
    $temBom = ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)
    Write-Host "OK - ambientes/[slug]/page.jsx criado em $caminho"
    Write-Host "Tamanho: $tamanho bytes | Linhas: $linhas"
    if ($temBom) { Write-Host "ATENCAO - arquivo contem BOM!" } else { Write-Host "Encoding: UTF-8 sem BOM confirmado." }

    $contemTagA = Select-String -Path $caminho -Pattern "<a" -SimpleMatch -Quiet
    if ($contemTagA) {
        Write-Host "Confirmado: tags <a> presentes no arquivo."
    } else {
        Write-Host "ATENCAO - tags <a> nao encontradas, arquivo pode estar corrompido!"
    }
} else {
    Write-Host "ERRO - arquivo nao foi criado"
}

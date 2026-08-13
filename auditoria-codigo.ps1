# AUDITORIA de acentuacao nos arquivos de codigo (src/).
# Este script NAO altera nada -- so gera um relatorio (auditoria-acentos.csv)
# pra sabermos o tamanho real do problema antes de corrigir.
#
# IMPORTANTE: este arquivo e 100% ASCII de proposito (sem nenhum caractere
# especial literal no codigo) -- usamos codigos Unicode ([char]0xXXXX) em vez
# de colar os caracteres direto, pra nao correr risco de mojibake ao salvar
# ou rodar no Windows, independente de BOM.

$raiz = "C:\Users\cotaw\Desktop\aw-marcenaria"

# Dicionario de palavras a checar (sem acento -> pode indicar falta de acentuacao)
$palavras = @(
    "nao","voce","sao","esta","ate","tambem","apos","instalacao","impecavel","inicio",
    "conheca","moveis","espaco","unico","portfolio","orcamento","sofisticacao","elegancia",
    "contemporanea","metalico","funcao","solucao","descricao","botao","resolucao","aprovacao",
    "producao","tendencias","formulario","dinamica","evolucao","escalavel","maxima","organicas",
    "regiao","amigaveis","padroes","praticas","integracao","reutilizavel","migracao","documentacao",
    "modulos","rodape","codigo","usuario","proximo","pagina","titulo","dormitorios","paineis",
    "escritorios","garantia","atendimento","projeto","ambiente","closet","cozinha",
    "banheiro","lavanderia","showroom","exclusivo","premium","luxo","interior",
    "moderno","minimalista","artesanal","padrao","qualidade","conforto","elegante","sofisticado",
    "consultoria","acabamento","ferragens","materiais","clientes","catalogo","categoria",
    "publicado","publicacao","informacao","comunicacao","confirmacao","validacao","atualizacao"
)

# Monta o padrao de mojibake usando codigos Unicode (evita caractere especial literal no arquivo)
$Atilde = [char]0x00C3   # U+00C3
$acirc  = [char]0x00E2   # U+00E2
$euro   = [char]0x20AC   # U+20AC
$trade  = [char]0x2122   # U+2122
$oe     = [char]0x0153   # U+0153
$Acirc  = [char]0x00C2   # U+00C2
$deg    = [char]0x00B0   # U+00B0
$ordf   = [char]0x00AA   # U+00AA
$copy   = [char]0x00A9   # U+00A9
$reg    = [char]0x00AE   # U+00AE

$padraoMojibake = "$Atilde[\x80-\xBF]|$acirc$euro[$trade$oe\x9d\x93\x94]|$Acirc[$deg$ordf$copy$reg]"

if (-not (Test-Path -LiteralPath "$raiz\src")) {
    Write-Host "ERRO - pasta src nao encontrada em $raiz. Confira o caminho."
    exit
}

$arquivos = Get-ChildItem -Path "$raiz\src" -Recurse -Include "*.jsx","*.js" |
    Where-Object { $_.FullName -notmatch "\\node_modules\\" }

$relatorio = @()

foreach ($arquivo in $arquivos) {
    $linhas = Get-Content -LiteralPath $arquivo.FullName -Encoding UTF8
    for ($i = 0; $i -lt $linhas.Count; $i++) {
        $linha = $linhas[$i]

        # 1. Mojibake real (texto UTF-8 lido/gravado como Latin-1 / Windows-1252)
        if ($linha -match $padraoMojibake) {
            $relatorio += [PSCustomObject]@{
                Arquivo = $arquivo.FullName.Replace($raiz, "")
                Linha   = $i + 1
                Tipo    = "MOJIBAKE"
                Trecho  = $linha.Trim()
            }
        }

        # 2. Palavras conhecidas sem acento
        foreach ($palavra in $palavras) {
            if ($linha -match "\b$palavra\b") {
                $relatorio += [PSCustomObject]@{
                    Arquivo = $arquivo.FullName.Replace($raiz, "")
                    Linha   = $i + 1
                    Tipo    = "SEM_ACENTO ($palavra)"
                    Trecho  = $linha.Trim()
                }
            }
        }
    }
}

$relatorio | Export-Csv -Path "$raiz\auditoria-acentos.csv" -NoTypeInformation -Encoding UTF8

Write-Host ""
Write-Host "Auditoria de codigo concluida."
Write-Host "Arquivos verificados: $($arquivos.Count)"
Write-Host "Ocorrencias encontradas: $($relatorio.Count)"
Write-Host "Relatorio salvo em: $raiz\auditoria-acentos.csv"

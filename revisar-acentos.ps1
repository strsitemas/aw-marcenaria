param(
    [switch]$Aplicar
)

# Corrige acentuacao faltante nos arquivos de codigo (src/).
# Por padrao roda em modo PREVIA (nao grava nada, so mostra o que faria).
# Rode com -Aplicar para gravar de verdade.
#
# Este arquivo e 100% ASCII de proposito. As palavras acentuadas de destino
# sao montadas em tempo de execucao via codigo Unicode (funcao U), nunca
# escritas literalmente no arquivo -- assim o .ps1 fica imune a corrupcao
# de encoding ao ser baixado/copiado no Windows, com ou sem BOM.

function U {
    param([int[]]$Codigos)
    -join ($Codigos | ForEach-Object { [char]$_ })
}

function Capitaliza($s) {
    if ($s.Length -eq 0) { return $s }
    return $s.Substring(0,1).ToUpper() + $s.Substring(1)
}

$raiz = "C:\Users\cotaw\Desktop\aw-marcenaria"

# Pares seguros (nao colidem com campos do Prisma / nomes de componente)
$basePares = @(
    @{de="nao";           para=(U 0x006E,0x00E3,0x006F)}
    @{de="voce";           para=(U 0x0076,0x006F,0x0063,0x00EA)}
    @{de="tambem";         para=(U 0x0074,0x0061,0x006D,0x0062,0x00E9,0x006D)}
    @{de="apos";           para=(U 0x0061,0x0070,0x00F3,0x0073)}
    @{de="instalacao";     para=(U 0x0069,0x006E,0x0073,0x0074,0x0061,0x006C,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="impecavel";      para=(U 0x0069,0x006D,0x0070,0x0065,0x0063,0x00E1,0x0076,0x0065,0x006C)}
    @{de="inicio";         para=(U 0x0069,0x006E,0x00ED,0x0063,0x0069,0x006F)}
    @{de="conheca";        para=(U 0x0063,0x006F,0x006E,0x0068,0x0065,0x00E7,0x0061)}
    @{de="moveis";         para=(U 0x006D,0x00F3,0x0076,0x0065,0x0069,0x0073)}
    @{de="espaco";         para=(U 0x0065,0x0073,0x0070,0x0061,0x00E7,0x006F)}
    @{de="unico";          para=(U 0x00FA,0x006E,0x0069,0x0063,0x006F)}
    @{de="orcamento";      para=(U 0x006F,0x0072,0x00E7,0x0061,0x006D,0x0065,0x006E,0x0074,0x006F)}
    @{de="sofisticacao";   para=(U 0x0073,0x006F,0x0066,0x0069,0x0073,0x0074,0x0069,0x0063,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="elegancia";      para=(U 0x0065,0x006C,0x0065,0x0067,0x00E2,0x006E,0x0063,0x0069,0x0061)}
    @{de="contemporanea";  para=(U 0x0063,0x006F,0x006E,0x0074,0x0065,0x006D,0x0070,0x006F,0x0072,0x00E2,0x006E,0x0065,0x0061)}
    @{de="metalico";       para=(U 0x006D,0x0065,0x0074,0x00E1,0x006C,0x0069,0x0063,0x006F)}
    @{de="funcao";         para=(U 0x0066,0x0075,0x006E,0x00E7,0x00E3,0x006F)}
    @{de="solucao";        para=(U 0x0073,0x006F,0x006C,0x0075,0x00E7,0x00E3,0x006F)}
    @{de="resolucao";      para=(U 0x0072,0x0065,0x0073,0x006F,0x006C,0x0075,0x00E7,0x00E3,0x006F)}
    @{de="aprovacao";      para=(U 0x0061,0x0070,0x0072,0x006F,0x0076,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="producao";       para=(U 0x0070,0x0072,0x006F,0x0064,0x0075,0x00E7,0x00E3,0x006F)}
    @{de="tendencias";     para=(U 0x0074,0x0065,0x006E,0x0064,0x00EA,0x006E,0x0063,0x0069,0x0061,0x0073)}
    @{de="formulario";     para=(U 0x0066,0x006F,0x0072,0x006D,0x0075,0x006C,0x00E1,0x0072,0x0069,0x006F)}
    @{de="dinamica";       para=(U 0x0064,0x0069,0x006E,0x00E2,0x006D,0x0069,0x0063,0x0061)}
    @{de="evolucao";       para=(U 0x0065,0x0076,0x006F,0x006C,0x0075,0x00E7,0x00E3,0x006F)}
    @{de="escalavel";      para=(U 0x0065,0x0073,0x0063,0x0061,0x006C,0x00E1,0x0076,0x0065,0x006C)}
    @{de="maxima";         para=(U 0x006D,0x00E1,0x0078,0x0069,0x006D,0x0061)}
    @{de="organicas";      para=(U 0x006F,0x0072,0x0067,0x00E2,0x006E,0x0069,0x0063,0x0061,0x0073)}
    @{de="regiao";         para=(U 0x0072,0x0065,0x0067,0x0069,0x00E3,0x006F)}
    @{de="amigaveis";      para=(U 0x0061,0x006D,0x0069,0x0067,0x00E1,0x0076,0x0065,0x0069,0x0073)}
    @{de="padroes";        para=(U 0x0070,0x0061,0x0064,0x0072,0x00F5,0x0065,0x0073)}
    @{de="praticas";       para=(U 0x0070,0x0072,0x00E1,0x0074,0x0069,0x0063,0x0061,0x0073)}
    @{de="integracao";     para=(U 0x0069,0x006E,0x0074,0x0065,0x0067,0x0072,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="reutilizavel";   para=(U 0x0072,0x0065,0x0075,0x0074,0x0069,0x006C,0x0069,0x007A,0x00E1,0x0076,0x0065,0x006C)}
    @{de="migracao";       para=(U 0x006D,0x0069,0x0067,0x0072,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="documentacao";   para=(U 0x0064,0x006F,0x0063,0x0075,0x006D,0x0065,0x006E,0x0074,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="modulos";        para=(U 0x006D,0x00F3,0x0064,0x0075,0x006C,0x006F,0x0073)}
    @{de="rodape";         para=(U 0x0072,0x006F,0x0064,0x0061,0x0070,0x00E9)}
    @{de="codigo";         para=(U 0x0063,0x00F3,0x0064,0x0069,0x0067,0x006F)}
    @{de="proximo";        para=(U 0x0070,0x0072,0x00F3,0x0078,0x0069,0x006D,0x006F)}
    @{de="pagina";         para=(U 0x0070,0x00E1,0x0067,0x0069,0x006E,0x0061)}
    @{de="dormitorios";    para=(U 0x0064,0x006F,0x0072,0x006D,0x0069,0x0074,0x00F3,0x0072,0x0069,0x006F,0x0073)}
    @{de="paineis";        para=(U 0x0070,0x0061,0x0069,0x006E,0x00E9,0x0069,0x0073)}
    @{de="escritorios";    para=(U 0x0065,0x0073,0x0063,0x0072,0x0069,0x0074,0x00F3,0x0072,0x0069,0x006F,0x0073)}
    @{de="catalogo";       para=(U 0x0063,0x0061,0x0074,0x00E1,0x006C,0x006F,0x0067,0x006F)}
    @{de="publicacao";     para=(U 0x0070,0x0075,0x0062,0x006C,0x0069,0x0063,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="informacao";     para=(U 0x0069,0x006E,0x0066,0x006F,0x0072,0x006D,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="comunicacao";    para=(U 0x0063,0x006F,0x006D,0x0075,0x006E,0x0069,0x0063,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="confirmacao";    para=(U 0x0063,0x006F,0x006E,0x0066,0x0069,0x0072,0x006D,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="validacao";      para=(U 0x0076,0x0061,0x006C,0x0069,0x0064,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="atualizacao";    para=(U 0x0061,0x0074,0x0075,0x0061,0x006C,0x0069,0x007A,0x0061,0x00E7,0x00E3,0x006F)}
    @{de="padrao";         para=(U 0x0070,0x0061,0x0064,0x0072,0x00E3,0x006F)}
    @{de="botao";          para=(U 0x0062,0x006F,0x0074,0x00E3,0x006F)}
    @{de="sao";            para=(U 0x0073,0x00E3,0x006F)}
)

# Gera tambem a versao com primeira letra maiuscula de cada par
$pares = @()
foreach ($p in $basePares) {
    $pares += @{de=$p.de; para=$p.para}
    $pares += @{de=(Capitaliza $p.de); para=(Capitaliza $p.para)}
}

# Palavras de alto risco: aparecem no dicionario mas SAO nomes de campo/model/componente.
# Nunca sao trocadas automaticamente -- so listadas pra revisao manual.
$altoRisco = @("titulo","descricao","usuario","portfolio","esta")

if (-not (Test-Path -LiteralPath "$raiz\src")) {
    Write-Host "ERRO - pasta src nao encontrada em $raiz."
    exit
}

$arquivos = Get-ChildItem -Path "$raiz\src" -Recurse -Include "*.jsx","*.js" |
    Where-Object { $_.FullName -notmatch "\\node_modules\\" }

$mudancas = @()
$revisarManual = @()

foreach ($arquivo in $arquivos) {
    $linhas = Get-Content -LiteralPath $arquivo.FullName -Encoding UTF8
    $linhasNovas = New-Object System.Collections.Generic.List[string]
    $arquivoMudou = $false

    for ($i = 0; $i -lt $linhas.Count; $i++) {
        $linha = $linhas[$i]
        $linhaOriginal = $linha

        foreach ($par in $pares) {
            # So troca se NAO vier depois de "." e NAO vier antes de : = , } ( (protege identificador/prop)
            $padrao = "(?<![.\w])" + [regex]::Escape($par.de) + "\b(?!\s*[:=,\(\}])"
            if ([regex]::IsMatch($linha, $padrao)) {
                $linha = [regex]::Replace($linha, $padrao, $par.para)
            }
        }

        if ($linha -ne $linhaOriginal) {
            $arquivoMudou = $true
            $mudancas += [PSCustomObject]@{
                Arquivo = $arquivo.FullName.Replace($raiz, "")
                Linha   = $i + 1
                Antes   = $linhaOriginal.Trim()
                Depois  = $linha.Trim()
            }
        }

        # Verifica palavras de alto risco so pra reportar (nunca troca)
        foreach ($palavra in $altoRisco) {
            if ($linhaOriginal -match "\b$palavra\b") {
                $revisarManual += [PSCustomObject]@{
                    Arquivo = $arquivo.FullName.Replace($raiz, "")
                    Linha   = $i + 1
                    Palavra = $palavra
                    Trecho  = $linhaOriginal.Trim()
                }
            }
        }

        $linhasNovas.Add($linha)
    }

    if ($arquivoMudou -and $Aplicar) {
        $utf8SemBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllLines($arquivo.FullName, $linhasNovas, $utf8SemBom)
    }
}

$mudancas | Export-Csv -Path "$raiz\preview-correcoes.csv" -NoTypeInformation -Encoding UTF8
$revisarManual | Export-Csv -Path "$raiz\revisar-manual.csv" -NoTypeInformation -Encoding UTF8

Write-Host ""
if ($Aplicar) {
    Write-Host "MODO APLICAR - alteracoes gravadas nos arquivos."
} else {
    Write-Host "MODO PREVIA - nada foi gravado. Rode com -Aplicar para aplicar de verdade."
}
Write-Host "Correcoes automaticas (propostas ou aplicadas): $($mudancas.Count)"
Write-Host "Detalhe salvo em: $raiz\preview-correcoes.csv"
Write-Host ""
Write-Host "Ocorrencias de ALTO RISCO (nao tocadas, precisam revisao manual): $($revisarManual.Count)"
Write-Host "Detalhe salvo em: $raiz\revisar-manual.csv"

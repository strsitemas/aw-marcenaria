# Triagem dos casos de alto risco (titulo, descricao, usuario, portfolio, esta, ha).
# NAO corrige nada -- so classifica cada ocorrencia em:
#   PROVAVEL_SEGURO -> a palavra esta dentro de aspas ou entre tags JSX (>texto<),
#                       ou seja, e texto exibido na tela, nao identificador de codigo.
#   RISCO_REAL       -> a palavra aparece "solta" no codigo (fora de aspas/tags),
#                       provavel acesso a propriedade, prop, ou nome de variavel.
#
# Gera triagem-alto-risco.csv pra voce revisar antes de decidir o que fazer com cada grupo.
# Arquivo 100% ASCII.

$raiz = "C:\Users\cotaw\Desktop\aw-marcenaria"
$altoRisco = @("titulo","descricao","usuario","portfolio","esta","ha")

if (-not (Test-Path -LiteralPath "$raiz\src")) {
    Write-Host "ERRO - pasta src nao encontrada em $raiz."
    exit
}

$arquivos = Get-ChildItem -Path "$raiz\src" -Recurse -Include "*.jsx","*.js" |
    Where-Object { $_.FullName -notmatch "\\node_modules\\" }

$resultado = @()
$opcoesIgnoreCase = [System.Text.RegularExpressions.RegexOptions]::IgnoreCase

foreach ($arquivo in $arquivos) {
    $linhas = Get-Content -LiteralPath $arquivo.FullName -Encoding UTF8
    for ($i = 0; $i -lt $linhas.Count; $i++) {
        $linha = $linhas[$i]

        # Zonas consideradas "texto exibido": dentro de aspas ou entre > e <
        $zonas = @()
        foreach ($m in [regex]::Matches($linha, '"[^"]*"')) { $zonas += ,@($m.Index, $m.Index + $m.Length) }
        foreach ($m in [regex]::Matches($linha, "'[^']*'")) { $zonas += ,@($m.Index, $m.Index + $m.Length) }
        foreach ($m in [regex]::Matches($linha, '`[^`]*`')) { $zonas += ,@($m.Index, $m.Index + $m.Length) }
        foreach ($m in [regex]::Matches($linha, '>[^<>]*<')) { $zonas += ,@($m.Index, $m.Index + $m.Length) }

        foreach ($palavra in $altoRisco) {
            $padrao = "\b$palavra\b"
            foreach ($m in [regex]::Matches($linha, $padrao, $opcoesIgnoreCase)) {
                $pos = $m.Index
                $seguro = $false
                foreach ($zona in $zonas) {
                    if ($pos -ge $zona[0] -and $pos -lt $zona[1]) { $seguro = $true; break }
                }

                $classificacao = "RISCO_REAL"
                if ($seguro) { $classificacao = "PROVAVEL_SEGURO" }

                $resultado += [PSCustomObject]@{
                    Arquivo    = $arquivo.FullName.Replace($raiz, "")
                    Linha      = $i + 1
                    Palavra    = $palavra
                    Classifica = $classificacao
                    Trecho     = $linha.Trim()
                }
            }
        }
    }
}

$resultado | Export-Csv -Path "$raiz\triagem-alto-risco.csv" -NoTypeInformation -Encoding UTF8

$seguros = ($resultado | Where-Object { $_.Classifica -eq "PROVAVEL_SEGURO" }).Count
$riscos  = ($resultado | Where-Object { $_.Classifica -eq "RISCO_REAL" }).Count

Write-Host ""
Write-Host "Triagem concluida."
Write-Host "Provavel seguro (texto exibido na tela): $seguros"
Write-Host "Risco real (identificador de codigo): $riscos"
Write-Host "Detalhe salvo em: $raiz\triagem-alto-risco.csv"

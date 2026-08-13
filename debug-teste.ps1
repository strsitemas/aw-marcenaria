$linha = '<h1 className="font-titulo text-2xl text-preto-fosco mb-6">'

Write-Host "Linha: $linha"
Write-Host ("Tamanho da linha: " + $linha.Length)
Write-Host ""

$zonas = @()
foreach ($m in [regex]::Matches($linha, '"[^"]*"')) {
    Write-Host ("Zona aspas -> Index=" + $m.Index + " Length=" + $m.Length + " Valor=[" + $m.Value + "]")
    $zonas += ,@($m.Index, $m.Index + $m.Length)
}
foreach ($m in [regex]::Matches($linha, '>[^<>]*<')) {
    Write-Host ("Zona tag -> Index=" + $m.Index + " Length=" + $m.Length + " Valor=[" + $m.Value + "]")
    $zonas += ,@($m.Index, $m.Index + $m.Length)
}

Write-Host ""
Write-Host ("Total de zonas encontradas: " + $zonas.Count)
foreach ($z in $zonas) {
    Write-Host ("  zona -> tipo=" + $z.GetType().Name + " count=" + $z.Count + " [" + $z[0] + ", " + $z[1] + ")")
}

Write-Host ""
$opcoes = [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
foreach ($m in [regex]::Matches($linha, "\btitulo\b", $opcoes)) {
    Write-Host ("Match palavra -> Index=" + $m.Index + " Valor=[" + $m.Value + "]")
    $pos = $m.Index
    $seguro = $false
    foreach ($zona in $zonas) {
        Write-Host ("    comparando pos=" + $pos + " com zona [" + $zona[0] + "," + $zona[1] + ")")
        if ($pos -ge $zona[0] -and $pos -lt $zona[1]) { $seguro = $true; break }
    }
    Write-Host ("  RESULTADO seguro = " + $seguro)
}

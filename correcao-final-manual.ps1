# Correcao final -- 13 trocas exatas, conferidas uma a uma a partir da triagem.
# Cada troca so acontece se o texto EXATO for encontrado no arquivo (senao avisa e pula).
# Nada de \b generico aqui -- string completa, sem risco de pegar outra coisa.
# Arquivo 100% ASCII -- acentos via codigo Unicode.

function U {
    param([int[]]$Codigos)
    -join ($Codigos | ForEach-Object { [char]$_ })
}

$raiz = "C:\Users\cotaw\Desktop\aw-marcenaria"

$titulo    = U 0x0074,0x00ED,0x0074,0x0075,0x006C,0x006F          # titulo
$descricao = U 0x0064,0x0065,0x0073,0x0063,0x0072,0x0069,0x00E7,0x00E3,0x006F  # descricao
$Portfolio = U 0x0050,0x006F,0x0072,0x0074,0x0066,0x00F3,0x006C,0x0069,0x006F  # Portfolio
$oAcento   = U 0x00F3                                              # o com acento

$trocas = @(
    @{arq="src\components\admin\AmbienteForm.jsx";  de='"Informe o titulo"';   para="`"Informe o $titulo`""}
    @{arq="src\components\admin\AmbienteForm.jsx";  de='"Informe a descricao"'; para="`"Informe a $descricao`""}
    @{arq="src\components\admin\BannerForm.jsx";    de='"Informe o titulo"';   para="`"Informe o $titulo`""}
    @{arq="src\components\admin\PortfolioForm.jsx"; de='"Informe o titulo"';   para="`"Informe o $titulo`""}
    @{arq="src\components\admin\PortfolioForm.jsx"; de='"Informe a descricao"'; para="`"Informe a $descricao`""}
    @{arq="src\components\admin\PostBlogForm.jsx";  de='"Informe o titulo"';   para="`"Informe o $titulo`""}
    @{arq="src\components\admin\PostBlogForm.jsx";  de="Deixe em branco para usar o titulo do post"; para="Deixe em branco para usar o $titulo do post"}
    @{arq="src\app\(cms)\admin\(dashboard)\dashboard\page.jsx"; de="Projetos no Portfolio"; para="Projetos no $Portfolio"}
    @{arq="src\app\(cms)\admin\(dashboard)\portfolio\page.jsx"; de=">Portfolio</h1>"; para=">$Portfolio</h1>"}
    @{arq="src\app\(site)\portfolio\page.jsx"; de=("Portfolio | AW Marcenaria e M" + $oAcento + "veis Planejados"); para=($Portfolio + " | AW Marcenaria e M" + $oAcento + "veis Planejados")}
    @{arq="src\components\Footer.jsx";  de='nome: "Portfolio"'; para="nome: `"$Portfolio`""}
    @{arq="src\components\Header.jsx";  de='nome: "Portfolio"'; para="nome: `"$Portfolio`""}
    @{arq="src\components\admin\Sidebar.jsx"; de='nome: "Portfolio"'; para="nome: `"$Portfolio`""}
)

$utf8SemBom = New-Object System.Text.UTF8Encoding($false)
$aplicadas = 0
$naoEncontradas = 0

foreach ($t in $trocas) {
    $caminho = Join-Path $raiz $t.arq
    if (-not (Test-Path -LiteralPath $caminho)) {
        Write-Host ("ARQUIVO NAO ENCONTRADO: " + $t.arq)
        continue
    }
    $conteudo = [System.IO.File]::ReadAllText($caminho)
    if ($conteudo.Contains($t.de)) {
        $novo = $conteudo.Replace($t.de, $t.para)
        [System.IO.File]::WriteAllText($caminho, $novo, $utf8SemBom)
        Write-Host ("OK  -> " + $t.arq + " :: [" + $t.de + "] -> [" + $t.para + "]")
        $aplicadas++
    } else {
        Write-Host ("NAO ACHOU -> " + $t.arq + " :: procurando [" + $t.de + "]")
        $naoEncontradas++
    }
}

Write-Host ""
Write-Host ("Trocas aplicadas: " + $aplicadas)
Write-Host ("Nao encontradas (nada foi tocado nesses casos): " + $naoEncontradas)

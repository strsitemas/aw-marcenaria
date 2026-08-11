/**
 * Valida se um caminho de imagem pode ser usado com seguranca pelo next/image.
 * Aceita apenas caminhos que comecam com "/" (arquivos em public/) ou URLs
 * absolutas (http/https). Qualquer outra coisa (caminho local do Windows tipo
 * "C:\...", string vazia, caminho sem barra inicial) e considerada invalida.
 */
export function imagemValida(caminho) {
  return (
    typeof caminho === "string" &&
    caminho.length > 0 &&
    (caminho.startsWith("/") || caminho.startsWith("http"))
  );
}

/**
 * Helper central de imagens.
 *
 * Hoje: monta URL do Cloudinary com otimização automática (f_auto, q_auto).
 * Depois do deploy: quando migrar para Vercel Blob, troca só a implementação
 * desta função — nenhum componente que já usa getImageUrl() precisa mudar,
 * porque next/image continua fazendo o resize/blur independente da origem.
 *
 * @param {string} publicId - ex: "aw-marcenaria/sobre/ambiente-01"
 * @param {object} [opts]
 * @param {number} [opts.width] - largura alvo para a transformação (opcional)
 */
export function getImageUrl(publicId, opts = {}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { width } = opts;

  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(
    ","
  )}/${publicId}`;
}

// Blur placeholder genérico (bege claro, tom da paleta) para usar enquanto
// a imagem real não tem um blurDataURL gerado a partir dela.
export const DEFAULT_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNFOERGQ0YiLz48L3N2Zz4=";

import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-titulo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-texto",
  display: "swap",
});

export const metadata = {
  title: "AW Marcenaria e Móveis Planejados",
  description: "Marcenaria e móveis planejados de alto padrão",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

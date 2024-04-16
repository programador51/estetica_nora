import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/app/globalLaptop.scss";
import "@/app/variables.scss";
import Navigation from "@/app/molecule/navigation";
import Footer from "@/app/molecule/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Estética Nora",
  description:
    "Descubre tu estilo en nuestra estética unisex! Ofrecemos servicios de peluquería, barbería, manicura, y mucho más para hombres y mujeres. Encuentra la combinación perfecta entre elegancia y modernidad. ¡Reserva ahora y déjanos realzar tu belleza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

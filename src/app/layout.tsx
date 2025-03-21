import "@fontsource-variable/roboto";
import "./index.css";
import Providers from "@/components/Providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UNEG - Sistema de Apoyo a los Servicios Estudiantiles",
  description: "Sistema de Apoyo a los Servicios Estudiantiles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

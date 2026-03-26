import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Безкоштовний ефір про стосунки | Хочеш від чоловіка більше?",
  description:
    "Безкоштовний онлайн ефір для жінок про стосунки, комунікацію та емоційну близькість. Дізнайся, як побудувати стосунки, про які мрієш.",
  keywords: [
    "стосунки",
    "ефір",
    "психологія",
    "жіночий ефір",
    "комунікація",
    "кохання",
  ],
  openGraph: {
    title: "Хочеш від чоловіка більше? — Безкоштовний ефір",
    description:
      "Безкоштовний онлайн ефір для жінок про стосунки, комунікацію та емоційну близькість.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body>
        <SmoothScrollProvider>
          <PageLoader />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skill Bridge",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={ubuntu.className}>
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}

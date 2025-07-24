import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Markdown to PDF Converter - Free Online MD to PDF Tool",
    template: "%s | Markdown to PDF Converter",
  },
  description:
    "Convert Markdown files to beautiful PDFs instantly. Free online Markdown to PDF converter with live preview, file upload support, and professional formatting. Transform MD, README files to PDF documents.",
  keywords: [
    "markdown to pdf",
    "md to pdf converter",
    "markdown pdf generator",
    "online pdf converter",
    "free markdown converter",
    "readme to pdf",
    "markdown document converter",
    "md file converter",
    "pdf generator online",
    "markdown parser pdf",
  ],
  authors: [{ name: "Markdown to PDF Converter" }],
  creator: "Markdown to PDF Converter",
  publisher: "Markdown to PDF Converter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://markdown-to-pdf-converter.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Markdown to PDF Converter - Free Online MD to PDF Tool",
    description:
      "Convert Markdown files to beautiful PDFs instantly. Free online converter with live preview and professional formatting.",
    url: "https://markdown-to-pdf-converter.com",
    siteName: "Markdown to PDF Converter",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Markdown to PDF Converter - Transform your markdown documents",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to PDF Converter - Free Online Tool",
    description:
      "Convert Markdown files to beautiful PDFs instantly with live preview and professional formatting.",
    images: ["/logo.png"],
    creator: "@markdowntopdf",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

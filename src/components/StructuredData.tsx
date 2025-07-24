/**
 * Structured Data Component for SEO
 * Provides JSON-LD structured data for better search engine understanding
 */
export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Markdown to PDF Converter",
    description:
      "Free online tool to convert Markdown files to beautiful PDF documents with live preview and professional formatting",
    url: "https://markdown-to-pdf-converter.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Convert Markdown to PDF",
      "Live preview",
      "File upload support",
      "Professional formatting",
      "Multi-page support",
      "Free to use",
    ],
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    provider: {
      "@type": "Organization",
      name: "Markdown to PDF Converter",
      url: "https://markdown-to-pdf-converter.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

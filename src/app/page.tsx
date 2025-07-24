"use client";

// React imports for component state and DOM references
import { useState, useRef } from "react";
import Image from "next/image";

// Custom component imports
import FileUpload from "@/components/FileUpload";
import MarkdownEditor from "@/components/MarkdownEditor";
import MarkdownPreview from "@/components/MarkdownPreview";

// PDF generation utilities
import { advancedGeneratePDF } from "@/utils/simplePdf";

/**
 * Default markdown content that demonstrates the application's capabilities
 * This serves as both documentation and a working example for users
 */
const defaultMarkdown = `# 🚀 Welcome to Markdown to PDF Converter

Transform your markdown documents into beautiful, professional PDFs with our modern converter.

## ✨ Features

- **🔥 Live Preview** - See your markdown rendered in real-time
- **📁 File Upload** - Drag & drop or browse for .md files  
- **📄 High-Quality PDF** - Professional PDF generation with perfect formatting
- **🎨 Modern Design** - Clean, responsive, and aesthetic interface
- **⚡ Fast Processing** - Efficient conversion with progress tracking

## 🎯 How to Use

1. **Upload** a markdown file or type/paste content in the editor
2. **Preview** your content with our live preview
3. **Download** your beautifully formatted PDF

### 💻 Code Example

\`\`\`javascript
// Sample JavaScript code
const generateAwesomePDF = () => {
  console.log("Creating amazing PDFs! 🎉");
  return "success";
};

generateAwesomePDF();
\`\`\`

### 📝 Sample Lists

#### To-Do List
- [x] Build amazing PDF converter
- [x] Add modern design
- [ ] Add more awesome features
- [ ] Share with the world

#### Shopping List
1. **Fruits** 🍎
   - Apples
   - Bananas
   - Oranges
2. **Vegetables** 🥕
   - Carrots
   - Broccoli
   - Spinach

### 💬 Blockquote Example

> "The best way to predict the future is to create it." 
> 
> — *Peter Drucker*

### 📊 Table Example

| Feature | Status | Priority |
|---------|--------|----------|
| PDF Generation | ✅ Complete | High |
| Live Preview | ✅ Complete | High |
| File Upload | ✅ Complete | Medium |
| Modern UI | ✅ Complete | High |

---

**🎨 Try editing this content** to see the live preview update instantly!

*Built with ❤️ using Next.js, React, and modern web technologies.*`;

/**
 * Main Home component that serves as the application's primary interface
 * Handles markdown editing, preview, and PDF generation functionality
 */
export default function Home() {
  // State management for the application
  const [markdownContent, setMarkdownContent] = useState(defaultMarkdown); // Current markdown content
  const [fileName, setFileName] = useState(""); // Name of uploaded file (if any)
  const [isGenerating, setIsGenerating] = useState(false); // PDF generation status
  const [progressMessage, setProgressMessage] = useState(""); // Current operation progress message

  // Reference to the preview div element for PDF generation
  const previewRef = useRef<HTMLDivElement>(null);

  /**
   * Handles file upload functionality
   * Validates file type, reads content, and updates application state
   * @param event - File input change event
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Validate file type - accept only markdown files
    if (file && (file.type === "text/markdown" || file.name.endsWith(".md"))) {
      setFileName(file.name);

      // Use FileReader API to read file content as text
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdownContent(content);
      };
      reader.readAsText(file);
    } else {
      // Show error for invalid file types
      alert("Please select a valid Markdown file (.md)");
    }
  };

  /**
   * Main PDF generation handler using the advanced multi-page generator
   * Handles validation, error handling, and user feedback during the process
   */
  const handleGeneratePDF = async () => {
    // Prevent multiple simultaneous generations or if preview is not ready
    if (!previewRef.current || isGenerating) return;

    try {
      setIsGenerating(true);
      setProgressMessage("Initializing...");

      // Validate that there's actual content to convert
      if (!previewRef.current.textContent?.trim()) {
        throw new Error(
          "No content to convert. Please add some markdown content first."
        );
      }

      // Generate PDF filename based on uploaded file or use default
      const pdfFileName = fileName
        ? fileName.replace(".md", ".pdf")
        : "markdown-document.pdf";

      // Debug logging for troubleshooting
      console.log("Starting PDF generation for element:", previewRef.current);
      console.log(
        "Element has content:",
        !!previewRef.current.textContent?.trim()
      );
      console.log("Element dimensions:", {
        offsetWidth: previewRef.current.offsetWidth,
        offsetHeight: previewRef.current.offsetHeight,
        scrollWidth: previewRef.current.scrollWidth,
        scrollHeight: previewRef.current.scrollHeight,
      });

      // Use the advanced PDF generator that handles multi-page content
      await advancedGeneratePDF(
        previewRef.current,
        pdfFileName,
        setProgressMessage
      );

      // Show success message temporarily
      setProgressMessage("PDF downloaded successfully!");
      setTimeout(() => setProgressMessage(""), 2000);
    } catch (error) {
      console.error("PDF generation failed:", error);

      // Create user-friendly error message
      let errorMessage = "Failed to generate PDF. ";
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += "Please try again.";
      }

      alert(errorMessage);
      setProgressMessage("");
    } finally {
      // Always reset generating state
      setIsGenerating(false);
    }
  };

  // Main component render
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto p-6">
        {/* Ultra Modern Header with Floating Elements */}
        <header className="relative text-center mb-16 overflow-hidden">
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
          >
            Skip to main content
          </a>

          {/* Animated Background Orbs */}
          <div
            className="absolute inset-0 -z-10 overflow-visible"
            aria-hidden="true"
          >
            <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute top-32 right-16 w-24 h-24 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1000ms" }}
            ></div>
            <div
              className="absolute top-64 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-teal-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "500ms" }}
            ></div>
          </div>

          {/* Floating Icon with 3D Effect */}
          <div className="relative mb-6 mt-4">
            <div className="group inline-flex items-center justify-center">
              {/* 3D Shadow Layers */}
              <div className="absolute w-24 h-24 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl blur-md transform translate-x-2 translate-y-2"></div>
              <div className="absolute w-22 h-22 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-3xl blur-sm transform translate-x-1 translate-y-1"></div>

              {/* Main Icon Container */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-blue-500/25">
                {/* Inner Glow */}
                <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>

                {/* Rotating Border Animation - Behind logo */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 blur-sm animate-spin-slow -z-10"></div>

                {/* PNG Logo */}
                <Image
                  src="/logo.png"
                  alt="Markdown to PDF Converter"
                  width={48}
                  height={48}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110 z-10 drop-shadow-lg"
                  priority
                />
              </div>

              {/* Floating Particles */}
              <div className="absolute -top-4 -right-4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300 shadow-lg"></div>
              <div className="absolute -bottom-2 -left-3 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-700 shadow-lg"></div>
              <div className="absolute top-2 -right-6 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-1000 shadow-lg"></div>
              <div className="absolute -top-2 left-2 w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce delay-500 shadow-lg"></div>
            </div>
          </div>

          {/* Animated Title with Typewriter Effect */}
          <div className="relative mb-6">
            <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-2">
              <span className="inline-block bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent animate-gradient-x">
                Markdown
              </span>
              <span className="inline-block mx-4 text-slate-400 animate-pulse">
                →
              </span>
              <span className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                PDF
              </span>
            </h1>

            {/* Underline Animation */}
            <div className="relative mx-auto w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-shimmer"></div>
            </div>
          </div>

          {/* Floating Description */}
          <div className="relative">
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Transform your
              <span className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                {" "}
                markdown documents{" "}
              </span>
              into stunning,
              <span className="font-semibold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                {" "}
                professional PDFs{" "}
              </span>
              with our lightning-fast converter
            </p>

            {/* Floating Feature Tags */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="px-4 py-2 bg-white/60 backdrop-blur-sm text-slate-700 rounded-full text-sm font-medium shadow-lg border border-white/20 hover:scale-105 transition-transform">
                ⚡ Lightning Fast
              </span>
              <span className="px-4 py-2 bg-white/60 backdrop-blur-sm text-slate-700 rounded-full text-sm font-medium shadow-lg border border-white/20 hover:scale-105 transition-transform delay-100">
                🎨 Beautiful Output
              </span>
              <span className="px-4 py-2 bg-white/60 backdrop-blur-sm text-slate-700 rounded-full text-sm font-medium shadow-lg border border-white/20 hover:scale-105 transition-transform delay-200">
                📱 Responsive
              </span>
            </div>
          </div>
        </header>

        {/* Main Application Content */}
        <section id="main-content" className="mb-10">
          <h2 className="sr-only">Markdown to PDF Converter Tool</h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
              <FileUpload onFileUpload={handleFileUpload} fileName={fileName} />

              {/* Modern PDF Generation Button */}
              <button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className={`group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isGenerating
                    ? "bg-slate-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isGenerating ? (
                    <>
                      {/* Enhanced Loading Animation */}
                      <div className="relative">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                      <span>{progressMessage || "Generating PDF..."}</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 transition-transform group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Download PDF</span>
                    </>
                  )}
                </div>
                {/* Button Shine Effect */}
                {!isGenerating && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                )}
              </button>
            </div>

            {/* Progress Indicator */}
            {progressMessage && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  {progressMessage}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Editor and Preview Section */}
        <section
          className="grid grid-cols-1 xl:grid-cols-2 gap-8"
          aria-labelledby="editor-preview-heading"
        >
          <h2 id="editor-preview-heading" className="sr-only">
            Markdown Editor and Preview
          </h2>
          {/* Left side: Enhanced Markdown Editor */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Markdown Editor
              </h2>
            </div>
            <MarkdownEditor
              value={markdownContent}
              onChange={setMarkdownContent}
            />
          </div>

          {/* Right side: Enhanced Live Preview */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Live Preview
              </h2>
            </div>
            <MarkdownPreview ref={previewRef} content={markdownContent} />
          </div>
        </section>

        {/* Modern Footer with Gradient */}
        <footer className="mt-16 text-center" role="contentinfo">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl text-white">
            {/* GitHub Section */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-xl font-semibold">Open Source</span>
                </div>
              </div>

              <p className="text-slate-300 mb-4 max-w-2xl mx-auto">
                This project is open source and available on GitHub. Feel free
                to contribute, report issues, or fork the repository!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* GitHub Repository Button */}
                <a
                  href="https://github.com/yourusername/MdToPdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>View on GitHub</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>

                {/* Star Button */}
                <a
                  href="https://github.com/bamof25th/MdToPdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>Star on GitHub</span>
                </a>

                {/* Profile Link */}
                <a
                  href="https://github.com/bamof25th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  <span>@bamof25th</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="border-t border-slate-600 pt-6">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Next.js 15</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">React Markdown</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">jsPDF</span>
                  </div>
                </div>
              </div>
              <p className="text-lg font-medium text-slate-200 mb-2">
                Built with modern web technologies
              </p>
              <p className="text-sm text-slate-400">
                High-quality PDF generation with beautiful formatting .
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

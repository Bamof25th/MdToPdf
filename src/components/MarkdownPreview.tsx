import React, { forwardRef } from "react";
import ReactMarkdown from "react-markdown";

/**
 * Props interface for the MarkdownPreview component
 */
interface MarkdownPreviewProps {
  /** Markdown content to render */
  content: string;
}

/**
 * MarkdownPreview Component
 *
 * Renders markdown content with custom styling that closely matches
 * how it will appear in the generated PDF. This component uses forwardRef
 * to allow parent components to access the DOM element for PDF generation.
 *
 * Features:
 * - Custom styled components for all markdown elements
 * - PDF-optimized styling with inline styles (not CSS classes)
 * - Scrollable preview area with fixed height
 * - Print-friendly colors and fonts
 *
 * @param content - Markdown string to render
 * @param ref - React ref for accessing the DOM element (used for PDF capture)
 */
const MarkdownPreview = forwardRef<HTMLDivElement, MarkdownPreviewProps>(
  ({ content }, ref) => {
    return (
      <div className="h-full flex flex-col">
        {/* Scrollable container for the preview */}
        <div className="flex-1 min-h-[600px] overflow-auto bg-transparent">
          {/* 
            This div is the target for PDF generation (ref attached here)
            All styles are inline to ensure they're captured by html2canvas
          */}
          <div
            ref={ref}
            className="p-6 bg-white"
            style={{
              color: "#334155", // Modern slate text color
              lineHeight: "1.75", // Readable line spacing
              fontFamily: "system-ui, -apple-system, sans-serif", // Modern system font
              fontSize: "16px", // Base font size
              minHeight: "500px", // Minimum height for content
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* ReactMarkdown with custom component renderers */}
            <ReactMarkdown
              components={{
                // Custom H1 styling - large, bold, with bottom border
                h1: ({ children }) => (
                  <h1
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "16px",
                      borderBottom: "2px solid #e5e7eb",
                      paddingBottom: "8px",
                    }}
                  >
                    {children}
                  </h1>
                ),
                // Custom H2 styling - medium large, semi-bold
                h2: ({ children }) => (
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "12px",
                      marginTop: "24px",
                    }}
                  >
                    {children}
                  </h2>
                ),
                // Custom H3 styling - smaller heading
                h3: ({ children }) => (
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "8px",
                      marginTop: "16px",
                    }}
                  >
                    {children}
                  </h3>
                ),
                // Custom paragraph styling with proper spacing
                p: ({ children }) => (
                  <p
                    style={{
                      color: "#374151",
                      marginBottom: "16px",
                      lineHeight: "1.75",
                    }}
                  >
                    {children}
                  </p>
                ),
                // Unordered list styling with proper indentation
                ul: ({ children }) => (
                  <ul
                    style={{
                      listStyleType: "disc",
                      paddingLeft: "24px",
                      marginBottom: "16px",
                      color: "#374151",
                    }}
                  >
                    {children}
                  </ul>
                ),
                // Ordered list styling
                ol: ({ children }) => (
                  <ol
                    style={{
                      listStyleType: "decimal",
                      paddingLeft: "24px",
                      marginBottom: "16px",
                      color: "#374151",
                    }}
                  >
                    {children}
                  </ol>
                ),
                // List item styling
                li: ({ children }) => (
                  <li
                    style={{
                      marginBottom: "4px",
                      color: "#374151",
                    }}
                  >
                    {children}
                  </li>
                ),
                // Inline code styling with background highlight
                code: ({ children }) => (
                  <code
                    style={{
                      backgroundColor: "#f3f4f6",
                      color: "#dc2626",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "Consolas, Monaco, monospace",
                    }}
                  >
                    {children}
                  </code>
                ),
                // Code block styling with dark theme
                pre: ({ children }) => (
                  <pre
                    style={{
                      backgroundColor: "#111827",
                      color: "#f9fafb",
                      padding: "16px",
                      borderRadius: "8px",
                      overflowX: "auto",
                      marginBottom: "16px",
                      fontFamily: "Consolas, Monaco, monospace",
                    }}
                  >
                    {children}
                  </pre>
                ),
                // Blockquote styling with left border
                blockquote: ({ children }) => (
                  <blockquote
                    style={{
                      borderLeft: "4px solid #3b82f6",
                      paddingLeft: "16px",
                      fontStyle: "italic",
                      color: "#4b5563",
                      marginBottom: "16px",
                      backgroundColor: "#f8fafc",
                      padding: "12px 16px",
                      borderRadius: "4px",
                    }}
                  >
                    {children}
                  </blockquote>
                ),
                // Bold text styling
                strong: ({ children }) => (
                  <strong
                    style={{
                      fontWeight: "bold",
                      color: "#111827",
                    }}
                  >
                    {children}
                  </strong>
                ),
                // Italic text styling
                em: ({ children }) => (
                  <em
                    style={{
                      fontStyle: "italic",
                      color: "#374151",
                    }}
                  >
                    {children}
                  </em>
                ),
                // Table styling with borders
                table: ({ children }) => (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginBottom: "16px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    {children}
                  </table>
                ),
                // Table header styling
                th: ({ children }) => (
                  <th
                    style={{
                      border: "1px solid #e5e7eb",
                      padding: "8px 12px",
                      backgroundColor: "#f9fafb",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {children}
                  </th>
                ),
                // Table cell styling
                td: ({ children }) => (
                  <td
                    style={{
                      border: "1px solid #e5e7eb",
                      padding: "8px 12px",
                    }}
                  >
                    {children}
                  </td>
                ),
              }}
            >
              {/* Render the actual markdown content */}
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
);

// Set display name for React DevTools
MarkdownPreview.displayName = "MarkdownPreview";

export default MarkdownPreview;

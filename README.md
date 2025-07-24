# Markdown to PDF Converter

A modern, responsive web application that converts Markdown content to high-quality PDF documents. Built with Next.js, React, and TypeScript, featuring real-time preview and advanced PDF generation capabilities.

## 🚀 Features

- **Real-time Preview**: See your markdown rendered instantly as you type
- **File Upload Support**: Upload `.md` files directly or paste content
- **Multi-page PDF Generation**: Handles long content with proper page breaks
- **High-quality Output**: Uses html2canvas and jsPDF for professional results
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS styling
- **Error Handling**: Comprehensive error messages and debugging tools
- **Progress Tracking**: Visual feedback during PDF generation
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI** - Clean, intuitive interface built with Tailwind CSS
- **⚡ Fast Performance** - Optimized with Next.js 15 and React 19

## 🛠️ Technologies Used

- **Frontend Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4.x
- **Markdown Processing**: React Markdown
- **PDF Generation**: jsPDF + html2canvas
- **Package Manager**: pnpm
- **Development**: ESLint for code quality

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/
│   ├── FileUpload.tsx       # File upload component
│   ├── MarkdownEditor.tsx   # Markdown editor component
│   └── MarkdownPreview.tsx  # Preview component with styling
└── utils/
    └── pdfGenerator.ts      # PDF generation utility
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd MdToPdf
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Start the development server**:

   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Usage

1. **Upload a file** - Click "📁 Upload Markdown File" to select a `.md` file
2. **Or type directly** - Use the editor to write markdown content
3. **Live preview** - See real-time formatting in the preview pane
4. **Generate PDF** - Click "📄 Download PDF" to create your PDF

### Supported Markdown Features

- Headers (H1-H6)
- **Bold** and _italic_ text
- `Inline code` and code blocks
- Lists (ordered and unordered)
- > Blockquotes
- Tables
- Links and more

### Example Markdown

````markdown
# My Document

## Introduction

This is a **sample** document with `code` examples.

### Features

- Live preview
- PDF generation
- File upload

> This is a quote example

```javascript
function hello() {
  console.log("Hello, World!");
}
```
````

````

## 🔧 Development Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Package management
pnpm add <package>     # Add dependency
pnpm remove <package>  # Remove dependency
````

## 🏗️ Architecture

### Component Structure

- **FileUpload**: Handles file selection and validation
- **MarkdownEditor**: Text editor with markdown syntax
- **MarkdownPreview**: Renders markdown with custom styling
- **pdfGenerator**: Utility for converting HTML to PDF

### Key Features

- **Modular Design**: Separated components for better maintainability
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance**: Optimized rendering and PDF generation
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🎨 Styling

The app uses Tailwind CSS with:

- Custom color scheme optimized for readability
- Responsive grid layout
- Smooth animations and transitions
- Consistent spacing and typography
- Dark/light theme support for code blocks

## 📄 PDF Generation

The PDF generation process:

1. **Content Capture**: Uses html2canvas to capture the preview area
2. **Image Processing**: Converts the rendered content to high-quality PNG
3. **PDF Creation**: Uses jsPDF to create A4 pages with proper margins
4. **Multi-page Support**: Automatically handles content that spans multiple pages
5. **Download**: Saves the PDF with the original filename or default name

### PDF Features

- A4 page size with 15mm margins
- High-resolution output (2x scale)
- Proper page breaks
- Maintains formatting and styling
- Progress feedback during generation

## 🔄 Recent Improvements

- ✅ Restructured app with modular components
- ✅ Fixed OKLCH color function compatibility issues
- ✅ Improved PDF generation with better error handling
- ✅ Added progress feedback during PDF creation
- ✅ Enhanced styling with explicit CSS for PDF compatibility
- ✅ Better file validation and user feedback
- ✅ Responsive design improvements

## 🐛 Troubleshooting

### Common Issues

1. **Blank PDFs**:

   - Ensure content is visible in preview
   - Check browser console for errors
   - Try refreshing the page

2. **Style Issues in PDF**:

   - The app uses inline styles for PDF compatibility
   - Avoid complex CSS that html2canvas can't render

3. **Large Files**:
   - Very large markdown files may take longer to process
   - Consider breaking large documents into sections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown processor
- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation
- [html2canvas](https://github.com/niklasvh/html2canvas) - HTML to canvas
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

import React from "react";

/**
 * Props interface for the MarkdownEditor component
 */
interface MarkdownEditorProps {
  /** Current markdown content value */
  value: string;
  /** Callback function when content changes */
  onChange: (value: string) => void;
}

/**
 * MarkdownEditor Component
 *
 * Provides a text area for editing markdown content with:
 * - Monospace font for better code readability
 * - Auto-sizing to match preview height
 * - Clean, minimal styling
 * - Real-time content updates
 *
 * @param value - Current markdown text content
 * @param onChange - Function called when text content changes
 */
export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Main text area for markdown input */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)} // Update parent state on change
        className="flex-1 w-full min-h-[600px] p-6 font-mono text-sm text-slate-800 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none leading-relaxed placeholder:text-slate-400"
        placeholder="Start typing your markdown here... 

# Example Heading
Your content goes here...

- List items
- Code blocks
- And more!"
        spellCheck={false} // Disable spell check for better code editing experience
      />
    </div>
  );
}

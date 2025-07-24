import React from "react";

/**
 * Props interface for the FileUpload component
 */
interface FileUploadProps {
  /** Callback function triggered when a file is selected */
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Name of the currently loaded file (if any) */
  fileName: string;
}

/**
 * FileUpload Component
 *
 * Provides a styled file input for uploading markdown files.
 * Features:
 * - Accepts only .md and .markdown files
 * - Shows visual feedback when a file is loaded
 * - Styled as a button with hover effects
 * - Hidden actual file input for better UX
 *
 * @param onFileUpload - Function to handle file selection
 * @param fileName - Currently loaded file name for display
 */
export default function FileUpload({
  onFileUpload,
  fileName,
}: FileUploadProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Modern File Upload Button */}
      <label className="group relative bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span>Upload Markdown</span>
        </div>
        {/* Hidden file input - styled through the label */}
        <input
          type="file"
          accept=".md,.markdown" // Only accept markdown files
          onChange={onFileUpload}
          className="hidden" // Hide default file input styling
        />
        {/* Button Shine Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </label>

      {/* Modern File loaded indicator */}
      {fileName && (
        <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200 shadow-sm">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="font-medium">Loaded:</span>
          <span className="text-emerald-600">{fileName}</span>
        </div>
      )}
    </div>
  );
}

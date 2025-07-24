import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { debugElement } from "./debugPdf";

/**
 * PDF Generation Utilities
 *
 * This module provides the main PDF generation functionality using html2canvas
 * and jsPDF libraries. It includes advanced element preparation and error handling.
 */

/**
 * Options interface for PDF generation functions
 */
export interface PdfGenerationOptions {
  /** DOM element to capture and convert to PDF */
  element: HTMLElement;
  /** Optional filename for the generated PDF (defaults to "markdown-document.pdf") */
  fileName?: string;
  /** Optional callback function to report progress updates */
  onProgress?: (message: string) => void;
}

/**
 * Helper function to ensure element is ready for capture
 *
 * This function performs several preparation steps:
 * - Scrolls element to top
 * - Waits for rendering to complete
 * - Waits for fonts to load
 * - Waits for images to load
 * - Adds buffer time for final rendering
 *
 * @param element - DOM element to prepare for capture
 */
async function prepareElementForCapture(element: HTMLElement): Promise<void> {
  // Scroll to top to ensure we capture from the beginning
  element.scrollTop = 0;

  // Wait for any pending renders to complete
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));

  // Wait for fonts to load (prevents missing text in PDF)
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  // Wait for images to load (prevents missing images in PDF)
  const images = element.querySelectorAll("img");
  if (images.length > 0) {
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails to load
        });
      })
    );
  }

  // Additional wait for final rendering
  await new Promise((resolve) => setTimeout(resolve, 500));
}

/**
 * Main PDF generation function with advanced features
 *
 * This function provides comprehensive PDF generation with:
 * - Element preparation and validation
 * - High-quality html2canvas capture
 * - Multi-page support
 * - Error handling and recovery
 * - Progress reporting
 *
 * @param options - PDF generation options
 */
export async function generatePDF({
  element,
  fileName = "markdown-document.pdf",
  onProgress,
}: PdfGenerationOptions): Promise<void> {
  try {
    onProgress?.("Preparing content for PDF...");

    // Step 1: Prepare element for capture
    await prepareElementForCapture(element);

    // Step 2: Debug and validate the element
    const debugInfo = debugElement(element);
    console.log("Debug info:", debugInfo);

    if (!debugInfo.hasContent) {
      throw new Error("The element appears to have no content to capture.");
    }

    if (!debugInfo.isVisible) {
      throw new Error("The element is not visible and cannot be captured.");
    }

    // Step 3: Get element dimensions - use scrollHeight for full content
    const scrollWidth = Math.max(element.scrollWidth, element.offsetWidth, 800);
    const scrollHeight = Math.max(
      element.scrollHeight,
      element.offsetHeight,
      600
    );

    console.log("Element dimensions:", {
      scrollWidth,
      scrollHeight,
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
    });

    onProgress?.("Capturing content...");

    // Step 4: Create canvas with optimized settings for better content capture
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality (2x resolution)
      useCORS: true, // Enable cross-origin resource sharing
      allowTaint: false, // Prevent tainted canvas
      backgroundColor: "#ffffff", // White background
      logging: true, // Enable logging for debugging
      removeContainer: false, // Keep container for better layout
      foreignObjectRendering: true, // Better for complex layouts
      width: scrollWidth,
      height: scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: scrollWidth,
      windowHeight: scrollHeight,
      imageTimeout: 15000, // Wait up to 15 seconds for images
      onclone: (clonedDoc) => {
        // Callback to modify the cloned document before capture
        // This ensures all content is visible and properly styled

        const clonedElement = clonedDoc.body.querySelector("*") as HTMLElement;
        if (clonedElement) {
          // Force visibility and remove any transforms that might hide content
          clonedElement.style.transform = "none";
          clonedElement.style.overflow = "visible";
        }

        // Apply styles to ensure all text and content is visible
        const allElements = clonedDoc.querySelectorAll("*");
        allElements.forEach((el: Element) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            htmlEl.style.overflow = "visible";
            htmlEl.style.clipPath = "none";
            htmlEl.style.clip = "none";
          }
        });
      },
    });

    console.log("Canvas dimensions:", canvas.width, canvas.height);

    // Step 5: Validate canvas was created successfully
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error(
        "Failed to capture content - canvas is empty. The element might not be visible or rendered properly."
      );
    }

    // Step 6: Generate image data with high quality
    const imgData = canvas.toDataURL("image/jpeg", 0.95); // JPEG with 95% quality for good balance

    // Validate image data was generated successfully
    if (imgData === "data:," || imgData.length < 100) {
      throw new Error(
        "Failed to generate image from content. The content might be empty or not properly rendered."
      );
    }

    console.log("Image data length:", imgData.length);

    onProgress?.("Creating PDF...");

    // Step 7: Create PDF with proper page handling
    const pdf = new jsPDF("p", "mm", "a4"); // Portrait orientation, millimeters, A4 size
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate dimensions with margins
    const margin = 15; // 15mm margins
    const availableWidth = pdfWidth - margin * 2;
    const availableHeight = pdfHeight - margin * 2;

    // Scale image to fit page width while maintaining aspect ratio
    const imgWidth = availableWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yPosition = margin;
    let heightLeft = imgHeight;
    let pageNumber = 1;

    // Add first page with the image
    pdf.addImage(imgData, "JPEG", margin, yPosition, imgWidth, imgHeight);
    heightLeft -= availableHeight;

    // Add additional pages if content is too long for one page
    while (heightLeft > 0) {
      pageNumber++;
      onProgress?.(`Creating page ${pageNumber}...`);

      pdf.addPage();
      yPosition = -(imgHeight - heightLeft) + margin; // Negative position to show next part
      pdf.addImage(imgData, "JPEG", margin, yPosition, imgWidth, imgHeight);
      heightLeft -= availableHeight;
    }

    onProgress?.("Saving PDF...");

    // Step 8: Save the PDF with error handling and fallback
    try {
      pdf.save(fileName);
      console.log("PDF saved successfully:", fileName);
    } catch (saveError) {
      console.error("Error saving PDF:", saveError);
      // Fallback: Try alternative save method using blob and download link
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    onProgress?.("PDF generated successfully!");
  } catch (error) {
    console.error("PDF generation error:", error);

    // Provide more specific error messages based on error type
    if (error instanceof Error) {
      if (error.message.includes("canvas")) {
        throw new Error(
          `Canvas generation failed: ${error.message}. Try refreshing the page and ensure the content is fully loaded.`
        );
      } else if (error.message.includes("image")) {
        throw new Error(
          `Image processing failed: ${error.message}. Check if there are any problematic images in the content.`
        );
      } else {
        throw error; // Re-throw the original error
      }
    } else {
      throw new Error(
        "An unexpected error occurred during PDF generation. Please try again."
      );
    }
  }
}

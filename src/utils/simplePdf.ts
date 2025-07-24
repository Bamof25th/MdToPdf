import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/**
 * Simple PDF Generation Utilities
 *
 * This module provides various PDF generation functions with different approaches:
 * - testPdfGeneration: Basic library functionality test
 * - simpleGeneratePDF: Single-page PDF generation
 * - advancedGeneratePDF: Multi-page PDF generation with proper page breaks
 *
 * All functions use html2canvas to capture DOM elements and jsPDF to create PDFs.
 */

/**
 * Test function to verify that html2canvas and jsPDF libraries are working correctly
 *
 * This function creates a minimal test element, captures it with html2canvas,
 * and generates a simple PDF to ensure all dependencies are functional.
 *
 * @returns Promise<boolean> - True if all tests pass, false otherwise
 */
export async function testPdfGeneration(): Promise<boolean> {
  try {
    console.log("Testing jsPDF...");
    const pdf = new jsPDF();
    pdf.text("Test PDF", 10, 10);
    console.log("jsPDF working ✓");

    console.log("Testing html2canvas...");
    // Create a simple test element positioned off-screen
    const testDiv = document.createElement("div");
    testDiv.innerHTML = "Test Content";
    testDiv.style.position = "absolute";
    testDiv.style.left = "-9999px"; // Hide off-screen
    testDiv.style.width = "100px";
    testDiv.style.height = "50px";
    testDiv.style.backgroundColor = "white";
    testDiv.style.color = "black";
    document.body.appendChild(testDiv);

    // Capture the test element
    const canvas = await html2canvas(testDiv, {
      width: 100,
      height: 50,
      backgroundColor: "#ffffff",
    });

    // Clean up test element
    document.body.removeChild(testDiv);

    // Validate canvas was created successfully
    if (canvas.width > 0 && canvas.height > 0) {
      console.log("html2canvas working ✓");

      // Test adding image to PDF
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 20, 50, 25);

      console.log("PDF with image created ✓");
      return true;
    } else {
      console.error("html2canvas produced empty canvas");
      return false;
    }
  } catch (error) {
    console.error("Basic PDF test failed:", error);
    return false;
  }
}

/**
 * Advanced multi-page PDF generation with proper page breaks
 *
 * This function handles content that spans multiple pages by:
 * 1. Temporarily expanding the element to show all content
 * 2. Capturing the full content with html2canvas
 * 3. Splitting the captured image across multiple PDF pages
 * 4. Restoring original element styles
 *
 * @param element - DOM element containing the content to convert
 * @param fileName - Name for the generated PDF file
 * @param onProgress - Optional callback for progress updates
 */
export async function advancedGeneratePDF(
  element: HTMLElement,
  fileName: string,
  onProgress?: (message: string) => void
): Promise<void> {
  console.log("Starting advanced PDF generation...");
  onProgress?.("Preparing content...");

  // Validate inputs
  if (!element) {
    throw new Error("No element provided");
  }

  if (!element.textContent?.trim()) {
    throw new Error("Element has no content");
  }

  try {
    // Step 1: Temporarily expand element to show all content
    // This ensures we capture the full content, not just what's visible in the scrollable container
    const parent = element.parentElement!;
    const originalStyles = {
      overflow: element.style.overflow,
      height: element.style.height,
      maxHeight: element.style.maxHeight,
      parentOverflow: parent.style.overflow,
      parentHeight: parent.style.height,
    };

    // Remove scroll restrictions to show full content
    element.style.overflow = "visible";
    element.style.height = "auto";
    element.style.maxHeight = "none";
    parent.style.overflow = "visible";
    parent.style.height = "auto";

    // Wait for layout reflow to complete
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => setTimeout(resolve, 200));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => setTimeout(resolve, 200));

    onProgress?.("Capturing content...");

    // Step 2: Capture the full content with html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution for better quality
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false, // Disable logging for cleaner output
      removeContainer: false,
      height: element.scrollHeight, // Capture full height
      width: element.scrollWidth, // Capture full width
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Step 3: Restore original styles immediately after capture
    element.style.overflow = originalStyles.overflow;
    element.style.height = originalStyles.height;
    element.style.maxHeight = originalStyles.maxHeight;
    parent.style.overflow = originalStyles.parentOverflow;
    parent.style.height = originalStyles.parentHeight;

    // Validate that we successfully captured content
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Failed to capture content - canvas is empty");
    }

    onProgress?.("Creating PDF...");

    // Step 4: Create PDF with proper settings
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true, // Enable compression for smaller file size
    });

    // Get PDF page dimensions and calculate content area
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10; // 10mm margin on all sides
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = pageHeight - margin * 2;

    // Calculate image dimensions to fit page width while maintaining aspect ratio
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Debug logging
    console.log("Canvas:", canvas.width, "x", canvas.height);
    console.log("PDF page:", pageWidth, "x", pageHeight);
    console.log("Content area:", contentWidth, "x", contentHeight);
    console.log("Image will be:", imgWidth, "x", imgHeight);

    if (imgHeight <= contentHeight) {
      // Step 5a: Single page - content fits on one page
      const imgData = canvas.toDataURL("image/jpeg", 0.85);
      pdf.addImage(imgData, "JPEG", margin, margin, imgWidth, imgHeight);
      onProgress?.("PDF created successfully!");
    } else {
      // Step 5b: Multi-page - split content across multiple pages
      const totalPages = Math.ceil(imgHeight / contentHeight);
      console.log(`Content requires ${totalPages} pages`);

      for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        onProgress?.(`Creating page ${pageNum + 1} of ${totalPages}...`);

        // Add new page (except for the first one)
        if (pageNum > 0) {
          pdf.addPage();
        }

        // Calculate which part of the canvas to use for this page
        const yStart = (pageNum * contentHeight * canvas.height) / imgHeight;
        const yEnd = Math.min(
          yStart + (contentHeight * canvas.height) / imgHeight,
          canvas.height
        );
        const sliceHeight = yEnd - yStart;

        // Create a temporary canvas for this page slice
        const pageCanvas = document.createElement("canvas");
        const ctx = pageCanvas.getContext("2d")!;

        // Set canvas dimensions
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;

        // Fill with white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        // Draw the appropriate slice of the original canvas
        ctx.drawImage(
          canvas,
          0, // Source X
          yStart, // Source Y
          canvas.width, // Source width
          sliceHeight, // Source height
          0, // Destination X
          0, // Destination Y
          pageCanvas.width, // Destination width
          pageCanvas.height // Destination height
        );

        // Convert page slice to image and add to PDF
        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.85);
        const pageImgHeight = (sliceHeight * imgWidth) / canvas.width;

        pdf.addImage(
          pageImgData,
          "JPEG",
          margin,
          margin,
          imgWidth,
          pageImgHeight
        );
      }
      onProgress?.(`PDF created with ${totalPages} pages!`);
    }

    // Step 6: Save the PDF file
    pdf.save(fileName);
    console.log("PDF saved successfully:", fileName);
  } catch (error) {
    console.error("Advanced PDF generation failed:", error);
    throw error;
  }
}

/**
 * Simple PDF generation for basic use cases
 *
 * This function provides a straightforward approach to PDF generation:
 * - Captures element as-is without modifying styles
 * - Creates a single-page PDF (content may be cut off if too long)
 * - Minimal configuration for quick testing
 *
 * @param element - DOM element to capture
 * @param fileName - Name for the generated PDF file
 */
export async function simpleGeneratePDF(
  element: HTMLElement,
  fileName: string
): Promise<void> {
  console.log("Starting simple PDF generation...");

  // Basic validation
  if (!element) {
    throw new Error("No element provided");
  }

  if (!element.textContent?.trim()) {
    throw new Error("Element has no content");
  }

  console.log("Element validation passed");
  console.log("Element dimensions:", {
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
  });

  try {
    // Ensure element is fully visible and not clipped
    const originalOverflow = element.style.overflow;
    const originalHeight = element.style.height;
    const originalMaxHeight = element.style.maxHeight;

    // Temporarily make element show all content
    element.style.overflow = "visible";
    element.style.height = "auto";
    element.style.maxHeight = "none";

    // Wait for reflow
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Capture element with settings optimized for full content
    const canvas = await html2canvas(element, {
      scale: 1.5, // Good balance of quality and performance
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: true,
      height: element.scrollHeight, // Use full scroll height
      width: element.scrollWidth, // Use full scroll width
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Restore original styles
    element.style.overflow = originalOverflow;
    element.style.height = originalHeight;
    element.style.maxHeight = originalMaxHeight;

    console.log("Canvas created:", canvas.width, canvas.height);

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Canvas is empty");
    }

    // Create PDF with proper multi-page handling
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = pageHeight - margin * 2;

    // Calculate how the image should fit
    const imgAspectRatio = canvas.width / canvas.height;

    // Fit image to page width
    const imgWidth = contentWidth;
    const imgHeight = imgWidth / imgAspectRatio;

    console.log("PDF dimensions:", {
      pageWidth,
      pageHeight,
      contentWidth,
      contentHeight,
    });
    console.log("Image dimensions for PDF:", { imgWidth, imgHeight });

    const imgData = canvas.toDataURL("image/jpeg", 0.8);

    // If image height is less than page height, single page
    if (imgHeight <= contentHeight) {
      pdf.addImage(imgData, "JPEG", margin, margin, imgWidth, imgHeight);
    } else {
      // Multi-page: split the image
      const totalPages = Math.ceil(imgHeight / contentHeight);
      console.log("Will create", totalPages, "pages");

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        // Calculate the portion of the image for this page
        const sourceY = (page * contentHeight * canvas.height) / imgHeight;
        const sourceHeight = Math.min(
          (contentHeight * canvas.height) / imgHeight,
          canvas.height - sourceY
        );

        // Create a temporary canvas for this page portion
        const pageCanvas = document.createElement("canvas");
        const pageCtx = pageCanvas.getContext("2d")!;

        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;

        // Fill with white background
        pageCtx.fillStyle = "#ffffff";
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        // Draw the portion of the original canvas onto the page canvas
        pageCtx.drawImage(
          canvas,
          0, // Source X
          sourceY, // Source Y
          canvas.width, // Source width
          sourceHeight, // Source height
          0, // Destination X
          0, // Destination Y
          pageCanvas.width, // Destination width
          pageCanvas.height // Destination height
        );

        // Convert page canvas to image data
        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.8);
        const actualPageHeight = Math.min(
          contentHeight,
          (sourceHeight * imgWidth) / canvas.width
        );

        // Add the page image to the PDF
        pdf.addImage(
          pageImgData,
          "JPEG",
          margin,
          margin,
          imgWidth,
          actualPageHeight
        );

        console.log(`Added page ${page + 1}/${totalPages}`);
      }
    }

    // Save the PDF file
    pdf.save(fileName);
    console.log("PDF saved successfully");
  } catch (error) {
    console.error("Simple PDF generation failed:", error);
    throw error;
  }
}

/**
 * PDF Generation Debug Utilities
 *
 * This module provides debugging tools for troubleshooting PDF generation issues.
 * It helps identify common problems with DOM elements before attempting PDF conversion.
 */

/**
 * Comprehensive element debugging function
 *
 * This function analyzes a DOM element and reports various properties that
 * can affect PDF generation success. It checks:
 * - Element visibility and positioning
 * - Content presence and length
 * - Dimensions and layout properties
 * - Viewport positioning
 *
 * @param element - DOM element to debug
 * @returns Object containing debug information and status flags
 */
export function debugElement(element: HTMLElement) {
  console.log("=== Element Debug Info ===");
  console.log("Element:", element);
  console.log("Tag name:", element.tagName);
  console.log("Classes:", element.className);
  console.log("Computed style:", window.getComputedStyle(element));
  console.log("Dimensions:", {
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
    clientWidth: element.clientWidth,
    clientHeight: element.clientHeight,
  });
  console.log("Text content length:", element.textContent?.length || 0);
  console.log("Inner HTML length:", element.innerHTML?.length || 0);
  console.log("Has children:", element.children.length);
  console.log(
    "Is visible (offsetParent check):",
    element.offsetParent !== null
  );
  console.log("Position rectangle:", element.getBoundingClientRect());

  // Check if element is in viewport (helps identify positioning issues)
  const rect = element.getBoundingClientRect();
  const isInViewport =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth;
  console.log("Is in viewport:", isInViewport);

  // Return structured debug information
  return {
    element, // Reference to the element
    isVisible: element.offsetParent !== null, // Basic visibility check
    hasContent: (element.textContent?.length || 0) > 0, // Content presence check
    isInViewport, // Viewport positioning check
    dimensions: {
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
    },
  };
}

# Multi-Page Test Document

This is a test document designed to span multiple pages when converted to PDF.

## Section 1: Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## Section 2: Features

### Code Blocks

```javascript
function generatePDF() {
  console.log("Generating PDF...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("PDF generated successfully!");
      resolve("success");
    }, 1000);
  });
}

async function main() {
  try {
    const result = await generatePDF();
    console.log("Result:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
```

### Lists

#### Unordered Lists

- First item with some description that makes it longer
- Second item that also has additional information
- Third item with even more detailed explanation
  - Nested item one
  - Nested item two with longer text
  - Nested item three
- Fourth item back at the main level

#### Ordered Lists

1. First numbered item with detailed explanation
2. Second numbered item with more information
3. Third numbered item that continues the pattern
   1. Sub-item one
   2. Sub-item two
   3. Sub-item three
4. Fourth main item

## Section 3: Tables

| Feature            | Description                        | Status     |
| ------------------ | ---------------------------------- | ---------- |
| PDF Generation     | Convert markdown to PDF            | ✅ Working |
| Multi-page Support | Handle content across pages        | 🔄 Testing |
| Code Highlighting  | Syntax highlighting in code blocks | ✅ Working |
| Image Support      | Include images in PDF              | ⏳ Planned |
| Custom Styling     | Customizable PDF appearance        | ✅ Working |

## Section 4: Blockquotes

> This is a blockquote that demonstrates how quoted text appears in the PDF output. It should maintain proper formatting and spacing when converted to PDF format.

> **Important Note:** This is a blockquote with bold text to test formatting preservation.

## Section 5: More Content

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

### Subsection 5.1

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

### Subsection 5.2

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

## Section 6: Final Content

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

### Final Subsection

This is the final section of our multi-page test document. It should demonstrate that our PDF generation correctly handles content that spans multiple pages without creating blank pages.

**The End**

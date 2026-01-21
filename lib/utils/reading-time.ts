/**
 * Calculate reading time from Portable Text content
 * Average reading speed: 200 words per minute
 */

export function calculateReadingTime(portableText: any[]): number {
  if (!portableText || portableText.length === 0) {
    return 1;
  }

  let wordCount = 0;

  portableText.forEach((block) => {
    if (block._type === "block" && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          // Split by whitespace and count words
          wordCount += child.text.trim().split(/\s+/).filter(Boolean).length;
        }
      });
    }
  });

  // Average reading speed: 200 words per minute
  const readingTime = Math.ceil(wordCount / 200);
  
  // Minimum 1 minute
  return Math.max(1, readingTime);
}

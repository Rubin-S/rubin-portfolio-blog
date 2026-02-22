export function extractHeadings(html: string) {
  const regex = /<h([2-4])[^>]*>(.*?)<\/h\1>/g;
  const headings: { level: number; text: string; id: string }[] = [];

  let match;
  while ((match = regex.exec(html))) {
    const level = Number(match[1]);
    const text = match[2].replace(/<[^>]+>/g, ""); // strip tags
    const id = text.toLowerCase().replace(/\s+/g, "-");
    headings.push({ level, text, id });
  }

  return headings;
}

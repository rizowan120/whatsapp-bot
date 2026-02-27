export function formatForWhatsApp(text) {
  return text
    .replace(/```(\w+)/g, "```")
    .replace(/^#{1,6}\s/gm, "")
    .trim();
}

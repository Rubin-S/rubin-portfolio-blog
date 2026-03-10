export function toEditorContent(value: unknown) {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: value }],
        },
      ],
    };
  }

  return value as Record<string, unknown>;
}

export function formatTimestamp(timestamp?: string | null) {
  if (!timestamp) {
    return null;
  }

  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function parseTags(input: string) {
  return input
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

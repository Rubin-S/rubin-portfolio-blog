import type { PostContent as PostContentValue } from "@/types/firestore";
import { renderContent } from "@/lib/posts/render";

interface PostContentProps {
  content?: PostContentValue;
}

export default function PostContent({ content }: PostContentProps) {
  let html = "";

  if (typeof content === "string") {
    html = content;
  } else if (content) {
    try {
      html = renderContent(content).html;
    } catch (error) {
      console.error("Failed to render post content", error);
      html = "<p>Error rendering content.</p>";
    }
  }

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

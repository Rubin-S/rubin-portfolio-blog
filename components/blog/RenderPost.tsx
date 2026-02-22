import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";

export default function RenderPost({ post }: { post: any }) {
  let html = "";

  if (typeof post.content === "string") {
    html = post.content;
  } else if (post.content) {
    try {
      html = generateHTML(post.content, [
        StarterKit,
        ImageExtension,
        CodeBlockLowlight.configure({ lowlight }),
      ]);
    } catch (e) {
      console.error("Failed to render post content", e);
      html = "<p>Error rendering content.</p>";
    }
  }

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}

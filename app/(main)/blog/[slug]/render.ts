// app/blog/[slug]/render.ts
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { lowlight } from "lowlight";

// convert TipTap JSON → HTML
export function renderContent(json: any) {
  if (!json) return {
  html: "",
  footnotes: []
};

  const html = generateHTML(json, [
    StarterKit,
    Image,
    CodeBlockLowlight.configure({ lowlight }),
  ]);

  // Extract footnotes styled like: [^1]: footnote text
  const footnotes = [...html.matchAll(/\[\^(\d+)\]:\s(.+)/g)].map((m) => ({
    num: m[1],
    text: m[2],
  }));

  return {
    html,
    footnotes,
  };
}

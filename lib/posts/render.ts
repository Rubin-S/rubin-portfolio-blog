import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { lowlight } from "lowlight";
import type { RenderResult } from "@/types/content";

type RenderableContent = Parameters<typeof generateHTML>[0];

export function renderContent(json: unknown): RenderResult {
  if (!json) {
    return {
      html: "",
      footnotes: [],
    };
  }

  const html = generateHTML(json as RenderableContent, [
    StarterKit,
    Image,
    CodeBlockLowlight.configure({ lowlight }),
  ]);

  const footnotes = [...html.matchAll(/\[\^(\d+)\]:\s(.+)/g)].map((match) => ({
    num: match[1],
    text: match[2],
  }));

  return {
    html,
    footnotes,
  };
}

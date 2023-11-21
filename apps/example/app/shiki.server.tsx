import { json } from "@remix-run/node";
import { Lang } from "shiki";
import "shiki/languages/tsx.tmLanguage.json";
import "shiki/themes/css-variables.json";
import shiki from "shiki";
export * from "shiki";

export interface Block {
  code: string;
  lang: Lang;
}

export const shikiize = async (blocksToRender: Record<string, Block>) => {
  const highlighter = await shiki.getHighlighter({
    theme: "css-variables",
  });

  const blocks = Object.entries(blocksToRender).map(([key, block]) => [
    key,
    highlighter.codeToHtml(block.code.trim(), { lang: block.lang }),
  ]);

  return json({
    blocks: Object.fromEntries(blocks) as Record<string, string>,
  });
};

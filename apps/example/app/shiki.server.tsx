import { json } from "@remix-run/node";
import * as prettier from "prettier";
import { Lang } from "shiki";
import "shiki/languages/tsx.tmLanguage.json";
import "shiki/languages/shellscript.tmLanguage.json";
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
    langs: ["shellscript", "tsx"],
  });

  const blocks = await Promise.all(
    Object.entries(blocksToRender).map(async ([key, block]) => {
      let code = block.code.trim();

      try {
        code = await prettier.format(block.code.trim(), {
          parser: "typescript",
        });
      } catch {}

      return [
        key,
        highlighter.codeToHtml(code, {
          lang: block.lang,
        }),
      ];
    }),
  );

  return json({
    blocks: Object.fromEntries(blocks) as Record<string, string>,
  });
};

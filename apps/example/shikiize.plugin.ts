import * as prettier from "prettier";
import shiki from "shiki";
import { type PluginOption } from "vite";
import { EOL } from "os";

const fileRegex = /\.(shiki)$/;

export const codeToHTML = async (input: string) => {
  const highlighter = await shiki.getHighlighter({
    theme: "css-variables",
    langs: ["shellscript", "tsx"],
  });

  let [lang, code] = input.split(EOL + EOL + EOL);
  try {
    code = await prettier.format(code.trim(), {
      parser: "typescript",
    });
    const highlighted = highlighter.codeToHtml(code, {
      lang,
    });
    return `export default \`${highlighted}\`;`;
  } catch (e) {
    console.error("Shikiize error: ", e);
  }

  return "export default ''";
};

export default function shikiize() {
  return {
    name: "transform-file",
    enforce: "pre",
    async transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: await codeToHTML(src),
          map: null,
        };
      }
    },
  } as PluginOption;
}

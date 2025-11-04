import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

export function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <DynamicCodeBlock
      lang={lang}
      code={code}
      options={{
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        components: {
          // override components (e.g. `pre` and `code`)
        },
        // other Shiki options
      }}
    />
  );
}

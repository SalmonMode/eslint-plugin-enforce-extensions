import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";
import type {
  RuleContext,
  RuleFixer,
} from "@typescript-eslint/utils/ts-eslint";
import { assertIsObject } from "primitive-predicates";

const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/microsoft/TypeScript/issues/16577`
);

type Options = [
  {
    extraPrefixes?: string[];
  }
];

// Type: RuleModule<"uppercase", ...>
export const rule = createRule<Options, "enforce-extensions/extension">({
  create(
    context: Readonly<RuleContext<"enforce-extensions/extension", Options>>
  ) {
    const options = context.options;
    const importLocationPrefixes = ["./"];
    for (const option of options) {
      if (option.extraPrefixes) {
        for (const prefix of option.extraPrefixes) {
          importLocationPrefixes.push(prefix);
        }
      }
    }

    function handler<
      T extends
        | TSESTree.ImportDeclaration
        | TSESTree.ExportNamedDeclaration
        | TSESTree.ExportAllDeclaration
    >(node: T): void {
      const source = node.source;
      assertIsObject(source);
      const value = source.value.replace(/\?.*$/, "");
      if (
        !value ||
        !importLocationPrefixes.some((prefix) => value.startsWith(prefix)) ||
        value.endsWith(".js")
      )
        return;
      context.report({
        messageId: "enforce-extensions/extension",
        node,
        data: {
          file: source.value,
        },
        fix: (fixer: RuleFixer) => {
          const quoteCharacter: string = source.raw[source.raw.length - 1];
          return fixer.replaceText(
            source,
            `${quoteCharacter}${source.value}.js${quoteCharacter}`
          );
        },
      });
    }
    return {
      ExportAllDeclaration: handler<TSESTree.ExportAllDeclaration>,
      ExportNamedDeclaration: handler<TSESTree.ExportNamedDeclaration>,
      ImportDeclaration: handler<TSESTree.ImportDeclaration>,
    };
  },
  name: "enforce-extensions",
  meta: {
    fixable: "code",
    docs: {
      description: "File location imports and exports must end with .js.",
    },
    messages: {
      "enforce-extensions/extension":
        "Import from '{{ file }}' is missing a file extension. File location imports and exports must end with .js",
    },
    type: "problem",
    schema: [
      {
        type: "object",
        properties: {
          extraPrefixes: { type: "array" },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{}],
});

import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils";
import type {
  RuleContext,
  RuleFixer,
} from "@typescript-eslint/utils/ts-eslint";
import { isNull } from "primitive-predicates";

const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/microsoft/TypeScript/issues/16577`
);

export type Options = [
  {
    prefixes?: string[];
  }
];

// Type: RuleModule<"uppercase", ...>
export const rule = createRule<Options, "enforce-no-missing-extensions">({
  create(
    context: Readonly<RuleContext<"enforce-no-missing-extensions", Options>>
  ) {
    const options = context.options;
    const importLocationPrefixes: string[] = [];
    for (const option of options) {
      if (option.prefixes) {
        for (const prefix of option.prefixes) {
          importLocationPrefixes.push(prefix);
        }
      }
    }
    if (importLocationPrefixes.length === 0) {
      // set default prefix
      importLocationPrefixes.push("./");
    }

    function handler<
      T extends
        | TSESTree.ImportDeclaration
        | TSESTree.ExportNamedDeclaration
        | TSESTree.ExportAllDeclaration
    >(node: T): void {
      const source = node.source;
      if (isNull(source)) {
        return;
      }
      const value = source.value.replace(/\?.*$/, "");
      if (
        !value ||
        !importLocationPrefixes.some((prefix) => value.startsWith(prefix)) ||
        value.endsWith(".js")
      )
        return;
      context.report({
        messageId: "enforce-no-missing-extensions",
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
  name: "extensions",
  meta: {
    fixable: "code",
    docs: {
      description: "File location imports and exports must end with .js.",
    },
    messages: {
      "enforce-no-missing-extensions":
        "Import from '{{ file }}' is missing a file extension. File location imports and exports must end with .js",
    },
    type: "problem",
    schema: [
      {
        type: "object",
        properties: {
          prefixes: { type: "array" },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ prefixes: ["./"] }],
});

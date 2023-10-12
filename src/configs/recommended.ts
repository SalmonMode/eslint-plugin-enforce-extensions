import type { TSESLint } from "@typescript-eslint/utils";
import type { Options } from "../extension";

export const recommended = {
  rules: {
    "extensions": ["error", {prefixes: ["./"]}]
  },
} satisfies TSESLint.Linter.Config & {rules: Record<string, [TSESLint.Linter.RuleLevel, Options[0]]>};

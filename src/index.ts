import type { TSESLint } from "@typescript-eslint/utils";
import { rule } from "./extension";

export const rules = {
  extensions: rule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;

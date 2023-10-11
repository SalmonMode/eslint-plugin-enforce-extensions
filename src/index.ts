import type { TSESLint } from "@typescript-eslint/utils";
import { rule } from "./extension.js";

export const rules = {
  "enforce-extensions": rule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;

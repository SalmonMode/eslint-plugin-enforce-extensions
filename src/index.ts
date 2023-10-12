import type { TSESLint } from "@typescript-eslint/utils";
import { rule } from "./extension";
import { recommended } from "./configs/recommended";
import type { ExtensionsConfig } from "./configs/types";

export const rules = {
  "extensions": rule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;

export const configs = {
  recommended,
} satisfies Record<string, ExtensionsConfig>;

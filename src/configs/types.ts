import type { TSESLint } from "@typescript-eslint/utils";
import type { Options } from "../extension";

export type ExtensionsConfig = TSESLint.Linter.Config & {
  rules: Record<string, [TSESLint.Linter.RuleLevel, Options[0]]>;
};

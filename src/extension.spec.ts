import { RuleTester } from "@typescript-eslint/rule-tester";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import * as mocha from "mocha";
import { recommended } from "./configs/recommended";
import { rule } from "./extension";

RuleTester.afterAll = mocha.after;
RuleTester.it = mocha.it;
RuleTester.itOnly = mocha.it.only;
RuleTester.describe = mocha.describe;

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("extensions", rule, {
  valid: [
    {
      filename: "file.ts",
      code: "import { stuff } from './file.js';",
      name: "relative import, default options",
    },
    {
      filename: "file.ts",
      code: "import { stuff } from './file.js';",
      options: [recommended.rules.extensions[1]],
      name: "relative import, recommended options",
    },
    {
      filename: "file.ts",
      code: "import { stuff } from '/opt/file.js';",
      options: [
        {
          prefixes: ["/opt/"],
        },
      ],
      name: "absolute import, absolute prefix option",
    },
    {
      filename: "file.ts",
      code: "import { stuff } from '/opt/file';",
      name: "absolute import, default options",
    },
    {
      filename: "file.ts",
      code: "export const someVariable = `\nhello\n`;",
      name: "null source, default options",
    },
  ],
  invalid: [
    {
      code: "import { stuff } from './react';",
      errors: [
        {
          type: AST_NODE_TYPES.ImportDeclaration,
          messageId: "enforce-no-missing-extensions",
          data: {
            file: "./react",
          },
        },
      ],
      options: [recommended.rules.extensions[1]],
      output: "import { stuff } from './react.js';",
      filename: "file.ts",
      name: "standard relative import, recommended options",
    },
    {
      code: "import { stuff } from './react';",
      errors: [
        {
          type: AST_NODE_TYPES.ImportDeclaration,
          messageId: "enforce-no-missing-extensions",
          data: {
            file: "./react",
          },
        },
      ],
      output: "import { stuff } from './react.js';",
      filename: "file.ts",
      name: "standard relative import, defafult options",
    },
    {
      code: "import { stuff } from '../react';",
      errors: [
        {
          type: AST_NODE_TYPES.ImportDeclaration,
          messageId: "enforce-no-missing-extensions",
          data: {
            file: "../react",
          },
        },
      ],
      output: "import { stuff } from '../react.js';",
      filename: "file.ts",
      name: "relative import up a directory, defafult options",
    },
    {
      code: "import { stuff } from '/opt/react';",
      errors: [
        {
          type: AST_NODE_TYPES.ImportDeclaration,
          messageId: "enforce-no-missing-extensions",
          data: {
            file: "/opt/react",
          },
        },
      ],
      output: "import { stuff } from '/opt/react.js';",
      filename: "file.ts",
      options: [
        {
          prefixes: ["/opt/"],
        },
      ],
      name: "standard absolute import, absolute options",
    },
    {
      code: `import { stuff } from "/opt/react";`,
      errors: [
        {
          type: AST_NODE_TYPES.ImportDeclaration,
          messageId: "enforce-no-missing-extensions",
          data: {
            file: "/opt/react",
          },
        },
      ],
      output: `import { stuff } from "/opt/react.js";`,
      filename: "file.ts",
      options: [
        {
          prefixes: ["/opt/"],
        },
      ],
      name: "standard absolute import with double quotes, absolute prefix option",
    },
  ],
});

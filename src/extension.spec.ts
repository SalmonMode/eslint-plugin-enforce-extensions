import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule } from "./extension";
import * as mocha from 'mocha';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';

RuleTester.afterAll = mocha.after;
RuleTester.it = mocha.it;
RuleTester.itOnly = mocha.it.only;
RuleTester.describe = mocha.describe;

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('enforce-extensions', rule, {
  valid: [
    {
      filename: "file.ts",
      code: "import { stuff } from './file.js';",
      name: "relative import"
    },
    {
      filename: "file.ts",
      code: "import { stuff } from '/opt/file.js';",
      options: [
        {
          extraPrefixes: ["/opt/"],
        },
      ],
      name: "absolute import"
    },
    {
      filename: "file.ts",
      code: "import { stuff } from '/opt/file';",
      name: "absolute import without option to catch it"
    },
  ],
  invalid: [
    {
      code: "import { stuff } from './react';",
      errors: [
        {
          type: AST_NODE_TYPES.ImportDeclaration,
          messageId: "enforce-extensions/extension",
          data: {
            file: './react',
          },
        }
      ],
      output: "import { stuff } from './react.js';",
      filename: "file.ts",
      name: "standard relative import"
    },
    {
      code: "import { stuff } from '/opt/react';",
      errors: [
        {
          type: AST_NODE_TYPES.ImportDeclaration,
          messageId: "enforce-extensions/extension",
          data: {
            file: '/opt/react',
          },
        }
      ],
      output: "import { stuff } from '/opt/react.js';",
      filename: "file.ts",
      options: [
        {
          extraPrefixes: ["/opt/"],
        },
      ],
      name: "standard absolute import"
    },
    {
      code: `import { stuff } from "/opt/react";`,
      errors: [
        {
          type: AST_NODE_TYPES.ImportDeclaration,
          messageId: "enforce-extensions/extension",
          data: {
            file: '/opt/react',
          },
        }
      ],
      output: `import { stuff } from "/opt/react.js";`,
      filename: "file.ts",
      options: [
        {
          extraPrefixes: ["/opt/"],
        },
      ],
      name: "standard absolute import with double quotes"
    },
  ],

});

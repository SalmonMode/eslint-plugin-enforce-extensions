# eslint-plugin-enforce-extensions

[![codecov](https://codecov.io/gh/SalmonMode/primitive-predicates/branch/main/graph/badge.svg?token=E28MMT0TC6)](https://codecov.io/gh/SalmonMode/eslint-plugin-enforce-extensions)
[![Build](https://github.com/SalmonMode/eslint-plugin-enforce-extensions/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/SalmonMode/eslint-plugin-enforce-extensions/actions/workflows/npm-publish.yml)
[![Package status](https://img.shields.io/npm/v/eslint-plugin-enforce-extensions.svg)](https://www.npmjs.com/package/eslint-plugin-enforce-extensions)
[![License](https://img.shields.io/npm/l/eslint-plugin-enforce-extensions.svg)](https://opensource.org/licenses/MIT)

A simple eslint plugin that enforces imports and exports for file locations have a '.js' file extension.

TypeScript [doesn't transform extensions](https://github.com/microsoft/TypeScript/issues/16577) and [doesn't enforce file extensions](https://github.com/microsoft/TypeScript/issues/42813). This can be a problem when the `type` specified in the `package.json` is `module`, as the compiler will not complain about the lack of an extension, because an error will get thrown during runtime saying that it can't find that module.

This plugin can not only identify those problematic imports, but also automatically fix them if configured to do so.

Other plugins exist for this, but it seemed that they only accounted for relative imports stating with `./`. This is a problem if you have special import scenarios, for example, importing from a lambda layer in an AWS Lambda function, where the import is an absolute file location starting with `/opt/`.

This pluginallows you to specify exactly what import prefixes to look out for.

1. Install
```shell
npm install --save-dev eslint-plugin-enforce-extensions
```

1. Edit `.eslintrc`
```json
{
    "extends": [
        "plugin:enforce-extensions/recommended"
    ],
    "plugins": [
        "enforce-extensions"
    ],
    "rules": {
        "enforce-extensions/extensions": ["error", {"prefixes": ["/opt/"]}
    }
}
```

1. Code
```js
// source.js

import Target from './target';
import Target from '/opt/other';
```

4. Lint

```shell
eslint .
```
```
source.js
  1:1  error  Location-based imports and exports must end with .js  enforce-extensions/enforce-extensions
```

5. Fix

```shell
eslint --fix .
```
```js
// source.js

import Target from './target.js';
import Target from '/opt/other.js';
```

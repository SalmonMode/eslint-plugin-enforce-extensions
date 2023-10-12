# eslint-plugin-enforce-extensions

[![codecov](https://codecov.io/gh/SalmonMode/primitive-predicates/branch/main/graph/badge.svg?token=E28MMT0TC6)](https://codecov.io/gh/SalmonMode/eslint-plugin-enforce-extensions)
[![Build](https://github.com/SalmonMode/eslint-plugin-enforce-extensions/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/SalmonMode/eslint-plugin-enforce-extensions/actions/workflows/npm-publish.yml)
[![Package status](https://img.shields.io/npm/v/eslint-plugin-enforce-extensions.svg)](https://www.npmjs.com/package/eslint-plugin-enforce-extensions)
[![License](https://img.shields.io/npm/l/eslint-plugin-enforce-extensions.svg)](https://opensource.org/licenses/MIT)

Enforce imports and exports for file locations have a file extension

TypeScript [doesn't transform extensions](https://github.com/microsoft/TypeScript/issues/16577) and [doesn't enforce file extensions](https://github.com/microsoft/TypeScript/issues/42813).

This is a simple eslint plugin that ensures that imports _and_ exports for file locations have `.js` extensions.

Credit for [the original implementation](https://github.com/solana-labs/wallet-adapter/pull/547) goes to [johnrees](https://github.com/johnrees). ❤️

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
    ]
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

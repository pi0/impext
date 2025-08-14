# impext

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/impext?color=yellow)](https://npmjs.com/package/impext)
[![npm downloads](https://img.shields.io/npm/dm/impext?color=yellow)](https://npm.chart.dev/impext)

<!-- /automd -->

Node.js ESM loader to enable implicit import paths (without extension or `/index`, `.js` => `.ts`, etc).

See [src](./index.ts) for implementation details and [fixture](./test/fixture/index.mts) for examples.

Usage:

```sh
node --imoort impext ...
```

# impext

Node.js ESM loader to enable implicit import paths (without extension or `/index`, `.js` => `.ts`, etc).

See [src](./src/index.ts) for implementation details and [fixture](./test/fixture/index.mts) for examples.

**Install:**

```sh
npx nypm i impext
```

**Usage:**

```sh
node --import impext/register
```

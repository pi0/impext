import { existsSync } from "node:fs";
import { isBuiltin } from "node:module";
import { extname } from "node:path";

const TS_EXT_RE = /\.(d|m)?ts(x)?$/;
const JS_EXT_RE = /\.(d|m)?js(x)?$/;
const KNOWN_EXTENSIONS = [
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".mts",
  ".cts",
  ".tsx",
  ".mtsx",
  ".ctsx",
];

type ResolveContext = {
  conditions: string[];
  parentURL: string | undefined;
  importAttributes: any;
};

// https://nodejs.org/api/module.html#resolvespecifier-context-nextresolve
export async function resolve(
  specifier: string,
  context: ResolveContext | undefined,
  nextResolve: (
    specifier: string,
    context: ResolveContext | undefined,
  ) => Promise<any>,
) {
  if (isBuiltin(specifier)) {
    return nextResolve(specifier, context);
  }

  const ext = extname(specifier);

  // .ts imports => Bypass
  if (TS_EXT_RE.test(ext)) {
    return nextResolve(specifier, context);
  }

  // .js imports => Validate or fallback to TS
  if (JS_EXT_RE.test(ext)) {
    const resolved = new URL(specifier, context?.parentURL);
    if (existsSync(resolved)) {
      return { url: resolved, shortCircuit: true };
    }
    const rewritten = new URL(
      specifier.replace(JS_EXT_RE, (m) => m.replace("js", "ts")),
      context?.parentURL,
    );
    if (existsSync(rewritten)) {
      return { url: rewritten.href, shortCircuit: true };
    }
  }

  // no extension => Try possible scenarios
  if (!ext) {
    for (const suffix of ["", "/index"]) {
      for (const ext of KNOWN_EXTENSIONS) {
        const candidate = new URL(
          `${specifier}${suffix}${ext}`,
          context?.parentURL,
        );
        if (existsSync(candidate)) {
          return { url: candidate.href, shortCircuit: true };
        }
      }
    }
  }

  return nextResolve(specifier, context);
  // return {
  //   url: resolvedPath,
  //   shortCircuit: true,
  // };
}

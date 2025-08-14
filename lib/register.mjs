// https://nodejs.org/api/module.html#moduleregisterspecifier-parenturl-options
import { register } from "node:module";

register("../dist/index.mjs", import.meta.url, {});

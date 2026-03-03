import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {"@typescript-eslint/no-explicit-any": "warn",  // Change from error to warn
    "react/no-unescaped-entities": "warn",         // Change from error to warn
    "react-hooks/purity": "warn",                  // Change from error to warn
    "@typescript-eslint/no-unused-vars": "warn"  ,
  "react/no-children-prop": [
    "warn", 
    {
      "allowFunctions": true 
    }
  ]
}

  },
]);

export default eslintConfig;

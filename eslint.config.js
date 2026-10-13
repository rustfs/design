import next from "eslint-config-next"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  globalIgnores(["node_modules/**", ".next/**", "out/**", "next-env.d.ts", "components/ui/**", "skills/**"]),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
])

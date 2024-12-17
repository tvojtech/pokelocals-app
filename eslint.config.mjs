import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "prettier/prettier": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-duplicate-imports": "error",
      "react/jsx-key": "error",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      semi: "error",
      "prefer-const": "error",
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default eslintConfig;

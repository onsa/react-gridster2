import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      stylistic.configs.recommended
    ],
    rules: {
      "@stylistic/array-bracket-newline": ["error", "consistent"],
      "@stylistic/array-bracket-spacing": ["error", "always"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/arrow-spacing": "error",
      "@stylistic/block-spacing": "error",
      "@stylistic/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/comma-spacing": "error",
      "@stylistic/comma-style": "error",
      "@stylistic/computed-property-spacing": ["error", "never"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/eol-last": "error",
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/function-call-spacing": "error",
      "@stylistic/function-paren-newline": ["error", "consistent"],
      "@stylistic/generator-star-spacing": "error",
      "@stylistic/implicit-arrow-linebreak": "error",
      "@stylistic/indent": ["error", 2],
      "@stylistic/indent-binary-ops": ["error", 2],
      "@stylistic/jsx-curly-spacing": ["error", { "when": "always" }],
      "@stylistic/key-spacing": "error",
      "@stylistic/keyword-spacing": "error",
      "@stylistic/max-len": [
        "error",
        {
          "code": 210,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true,
          "ignoreRegExpLiterals": true
        }
      ],
      "@stylistic/member-delimiter-style": ["error", { multiline: { delimiter: "semi", requireLast: true } }],
      "@stylistic/new-parens": "error",
      "@stylistic/no-confusing-arrow": "error",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/no-mixed-operators": "error",
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/nonblock-statement-body-position": "error",
      "@stylistic/object-curly-newline": "error",
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/object-property-newline": ["error", { "allowAllPropertiesOnSameLine": true }],
      "@stylistic/one-var-declaration-per-line": ["error", "always"],
      "@stylistic/operator-linebreak": ["error", "after"],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/rest-spread-spacing": "error",
      "@stylistic/semi": ["error", "always"],
      "@stylistic/semi-spacing": "error",
      "@stylistic/semi-style": "error",
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": [
        "error",
        {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always"
        }
      ],
      "@stylistic/space-in-parens": "error",
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": "error",
      "@stylistic/spaced-comment": "error",
      "@stylistic/switch-colon-spacing": "error",
      "@stylistic/template-curly-spacing": ["error", "always"],
      "@stylistic/template-tag-spacing": ["error", "always"],
      "@stylistic/type-annotation-spacing": "error",
      "@stylistic/type-generic-spacing": "error",
      "@stylistic/type-named-tuple-spacing": "error",
      "@stylistic/wrap-iife": ["error", "inside"],
      "@stylistic/yield-star-spacing": "error",
      "@typescript-eslint/array-type": ["error", { "default": "generic" }],
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          "accessibility": "explicit",
          "overrides": {
            "accessors": "explicit",
            "constructors": "explicit",
            "parameterProperties": "explicit"
          }
        }
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          "allowTypedFunctionExpressions": false
        }
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          "default": {
            "memberTypes": [
              "public-static-field",
              "protected-static-field",
              "private-static-field",
              "public-static-method",
              "protected-static-method",
              "private-static-method",
              "public-instance-field",
              "protected-instance-field",
              "private-instance-field",
              "constructor",
              "public-instance-method",
              "protected-instance-method",
              "private-instance-method"
            ]
          }
        }
      ],
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_"
        }
      ],
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/unified-signatures": "error",
      "import/no-unresolved": "off",
      "brace-style": [
        "error",
        "1tbs",
        {
          "allowSingleLine": true
        }
      ],
      "curly": "error",
      "eol-last": "error",
      "eqeqeq": [
        "error",
        "smart"
      ],
      "guard-for-in": "error",
      "id-blacklist": "off",
      "id-match": "error",
      "max-len": ["error", 210],
      "no-bitwise": "off",
      "no-caller": "error",
      "no-console": "error",
      "no-debugger": "error",
      "no-eval": "error",
      "no-extra-boolean-cast": "off",
      "no-fallthrough": "error",
      "no-irregular-whitespace": [
        "error",
        {
          "skipStrings": true,
          "skipRegExps": true
        }
      ],
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-new-wrappers": "error",
      "no-redeclare": "error",
      "no-restricted-imports": "error",
      "no-shadow": "off",
      "no-throw-literal": "error",
      "no-trailing-spaces": "error",
      "no-underscore-dangle": "off",
      "no-unused-labels": "error",
      "no-var": "error",
      "no-whitespace-before-property": "error",
      "prefer-const": "error",
      "radix": "error",
      "spaced-comment": [
        "error",
        "always",
        {
          "markers": [
            "/"
          ]
        }
      ],
      "space-in-parens": ["error", "never"],
      "space-unary-ops": [
        "error",
        {
          "words": false,
          "nonwords": false
        }
      ]
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  }
])

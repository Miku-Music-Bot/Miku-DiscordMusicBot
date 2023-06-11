module.exports = {
    env: { es2021: true, node: true },
    extends: ["./node_modules/gts", "plugin:@typescript-eslint/recommended"],
    ignorePatterns: ["build/**/*", "**/*.js"],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: { "ecmaVersion": "latest", "sourceType": "module", "project": "./tsconfig.json" },
    plugins: ["@typescript-eslint"],
    rules: {
        "prettier/prettier": ["warn", {
            extends: ["plugin:prettier/recommended"],
            endOfLine: "auto",
            tabWidth: 2,
            useTabs: false,
            singleQuote: true,
            printWidth: 125
        }
        ],
        "node/no-unpublished-import": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/naming-convention": [ "error",
            { selector: "accessor",                 format: ["snake_case"],         leadingUnderscore: "forbid",  trailingUnderscore: "forbid",  modifiers: ["public"] },
            { selector: "accessor",                 format: ["snake_case"],         leadingUnderscore: "forbid",  trailingUnderscore: "require", modifiers: ["protected"] },
            { selector: "accessor",                 format: ["snake_case"],         leadingUnderscore: "require", trailingUnderscore: "forbid",  modifiers: ["private"] },

            { selector: "class",                    format: ["StrictPascalCase"],   leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },

            { selector: "classMethod",              format: ["strictCamelCase"],    leadingUnderscore: "forbid",  trailingUnderscore: "forbid",  modifiers: ["public"] },
            { selector: "classMethod",              format: ["strictCamelCase"],    leadingUnderscore: "forbid",  trailingUnderscore: "require", modifiers: ["protected"] },
            { selector: "classMethod",              format: ["strictCamelCase"],    leadingUnderscore: "require", trailingUnderscore: "forbid",  modifiers: ["private"] },

            { selector: "classProperty",            format: ["snake_case"],         leadingUnderscore: "forbid",  trailingUnderscore: "forbid",  modifiers: ["public"] },
            { selector: "classProperty",            format: ["snake_case"],         leadingUnderscore: "forbid",  trailingUnderscore: "require", modifiers: ["protected"] },
            { selector: "classProperty",            format: ["snake_case"],         leadingUnderscore: "require", trailingUnderscore: "forbid",  modifiers: ["private"] },

            { selector: "enum",                     format: ["UPPER_CASE"],         leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },

            { selector: "enumMember",               format: ["StrictPascalCase"],   leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },

            { selector: "function",                 format: ["strictCamelCase"],    leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },
            
            { selector: "interface",                format: ["StrictPascalCase"],   leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },
            
            { selector: "objectLiteralMethod",      format: ["strictCamelCase"],    leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },

            { selector: "objectLiteralProperty",    format: ["snake_case"],         leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },

            { selector: "parameter",                format: ["strictCamelCase"],    leadingUnderscore: "forbid",  trailingUnderscore: "forbid", types: ["function"]  },
            { selector: "parameter",                format: ["snake_case"],         leadingUnderscore: "forbid",  trailingUnderscore: "forbid", types: ["array", "boolean", "number", "string"]  },
            
            { selector: "parameterProperty",        format: ["strictCamelCase"],    leadingUnderscore: "forbid",  trailingUnderscore: "forbid", types: ["function"]  },
            { selector: "parameterProperty",        format: ["snake_case"],         leadingUnderscore: "forbid",  trailingUnderscore: "forbid", types: ["array", "boolean", "number", "string"]  },
            
            { selector: "typeAlias",                format: null,                   leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },

            { selector: "typeMethod",               format: null,                   leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },

            { selector: "typeParameter",            format: null,                   leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },

            { selector: "typeProperty",             format: null,                   leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },

            { selector: "variable",                 format: ["UPPER_CASE", "StrictPascalCase"], leadingUnderscore: "forbid",  trailingUnderscore: "forbid", modifiers: ["global", "const"] },
            { selector: "variable",                 format: ["snake_case"],         leadingUnderscore: "forbid",  trailingUnderscore: "forbid" },
        ]
    }
}
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: ["react", "prettier"],
    rules: {
        "import/prefer-default-export": 0,
        "react/jsx-props-no-spreading": 0,
        "react/forbid-prop-types": 0,
        "react/require-default-props": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "no-plusplus": 0,
        "no-param-reassign": [
            "error",
            {
                props: true,
                ignorePropertyModificationsFor: ["state"],
            },
        ],
        "prettier/prettier": "error",
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx"],
                paths: ["."],
            },
        },
        react: {
            version: "detect",
        },
    },
};

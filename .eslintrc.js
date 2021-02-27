module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: ['react', 'prettier'],
    rules: {
        'import/prefer-default-export': 0,
        'react/jsx-props-no-spreading': 0,
        'react/forbid-prop-types': 0,
        'react/require-default-props': 0,
        'react/prop-types': 0,
        'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
        'no-plusplus': 0,
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['state'],
            },
        ],
        'prettier/prettier': 'error',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['.'],
            },
        },
        react: {
            version: 'detect',
        },
    },
};

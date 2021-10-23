module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'google',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react'],
    rules: {
        'indent': ['error', 4],
        'object-curly-spacing': ['error', 'always'],
        'max-len': ['error', { 'code': 100, 'ignoreStrings': true }],
        'quote-props': 0,
        'valid-jsdoc': 0,
        'require-jsdoc': 0,
        'import/prefer-default-export': 0,
        'react/jsx-props-no-spreading': 0,
        'react/forbid-prop-types': 0,
        'react/require-default-props': 0,
        'react/prop-types': 0,
        'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
        'no-plusplus': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['state'],
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['.'],
            },
        },
        'react': {
            version: 'detect',
        },
    },
};

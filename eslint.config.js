import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import json from '@eslint/json';

import customRules from './eslint.rules.js';

// prettier-ignore
const ignores = [
    '**/node_modules/**',
    '.git/',
    'dist/**',
    '**/dist/**',
    'build/**',
    '.parcel-cache/**',
    '.wrangler/**',
    '**/package-lock.json',
];

export default [
    { ignores },

    // Environments
    {
        files: ['**/*.js'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        files: ['server/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },

    // JavaScript
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { stylistic },
        rules: { ...js.configs.recommended.rules, ...customRules },
    },

    // TypeScript
    {
        files: ['**/*.ts'],
        languageOptions: { parser: tsParser },
        plugins: { stylistic },
        rules: {
            ...js.configs.recommended.rules,
            ...customRules,
            'stylistic/member-delimiter-style': [
                'error',
                {
                    multiline: { delimiter: 'semi', requireLast: true },
                    singleline: { delimiter: 'semi', requireLast: false },
                    multilineDetection: 'brackets',
                },
            ],
            'stylistic/type-annotation-spacing': [
                'error',
                {
                    before: false,
                    after: true,
                    overrides: { arrow: { before: true, after: true } },
                },
            ],
        },
    },

    // Svelte
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: { ts: tsParser, default: tsParser },
                extraFileExtensions: ['.svelte'],
                svelteFeatures: { runes: true },
            },
        },
        plugins: { svelte, stylistic },
        rules: {
            ...js.configs.recommended.rules,
            ...customRules,
            ...svelte.configs.recommended.rules,
        },
    },

    // JSON
    {
        files: ['**/*.json'],
        language: 'json/json',
        ...json.configs.recommended,
    },
    {
        files: ['**/*.jsonc'],
        language: 'json/jsonc',
        ...json.configs.recommended,
    },
];

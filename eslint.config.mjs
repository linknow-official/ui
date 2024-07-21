import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import node from 'eslint-plugin-node'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [ {
	ignores: [
		'**/.vscode',
		'**/.expo',
		'**/node_modules',
		'**/build',
		'**/.babel.config.js',
		'**/.metro.config.js'
	]
}, ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'), {
	plugins: {
		'@typescript-eslint': typescriptEslint,
		node
	},

	languageOptions: {
		globals: {
			...globals.node
		},

		parser: tsParser,
		ecmaVersion: 12,
		sourceType: 'module'
	},

	rules: {
		indent: [ 'error', 'tab' ],
		'linebreak-style': [ 'error', 'unix' ],
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'never' ],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'prefer-const': 'off',

		'keyword-spacing': [ 'error', {
			before: false,
			after: true,

			overrides: {
				import: {
					before: true,
					after: true
				},

				export: {
					after: true
				},

				from: {
					before: true,
					after: true
				},

				const: {
					before: true,
					after: true
				},

				return: {
					before: true,
					after: true
				},

				throw: {
					before: true,
					after: true
				},

				as: {
					before: true,
					after: true
				},

				let: {
					before: true,
					after: true
				},

				new: {
					before: true,
					after: true
				},

				await: {
					before: true,
					after: true
				}
			}
		} ],

		'object-curly-spacing': [ 'error', 'always', {
			objectsInObjects: true
		} ],

		'space-before-function-paren': [ 'error', {
			anonymous: 'never',
			named: 'always',
			asyncArrow: 'always'
		} ],

		'space-before-blocks': [ 'error', {
			functions: 'always',
			keywords: 'never',
			classes: 'never'
		} ],

		'comma-spacing': [ 'error', {
			before: false,
			after: true
		} ],

		'comma-dangle': [ 'error', 'never' ],

		'key-spacing': [ 'error', {
			beforeColon: false,
			afterColon: true
		} ],

		'brace-style': [ 'error' ],
		'padded-blocks': [ 'error', 'never' ],
		'space-in-parens': [ 'error', 'never' ],

		'space-infix-ops': [ 'error', {
			int32Hint: false
		} ],

		'no-multi-spaces': 'error',
		'arrow-spacing': 'error',
		'func-call-spacing': [ 'error', 'never' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'eol-last': [ 'error', 'always' ],

		'spaced-comment': [ 'error', 'always', {
			block: {
				balanced: true
			}
		} ]
	}
} ]

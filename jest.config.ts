import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',

	testEnvironment: 'node',

	roots: ['<rootDir>/src'],

	testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],

	transform: {
		'^.+\\.ts$': 'ts-jest'
	},

	clearMocks: true,

	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8'
}

export default config

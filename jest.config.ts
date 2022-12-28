export default {
    roots: ["<rootDir>/src"],
    collectCoverage: true,
    preset: "@shelf/jest-mongodb",
    coverageDirectory: "coverage",
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    testEnvironment: "node",
    transform: {
        ".+\\.ts$": "ts-jest",
    },
    coverageProvider: "v8",
}

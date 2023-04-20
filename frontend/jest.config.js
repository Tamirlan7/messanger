const path = require('path')

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleDirectories: [
        "src",
        "node_modules"
    ],
    moduleNameMapper: {
        "^@/.(css|less)$": `${path.resolve(__dirname, '__mocks__/fileMock.js')}`,
        "^@/(.*)$": `${path.resolve(__dirname, 'src')}/$1`,
        "^@slices/(.*)$": `${path.resolve(__dirname, 'src/slices')}/$1`,
        "^@hooks/(.*)$": `${path.resolve(__dirname, 'src/hooks')}/$1`,
        "^[@./a-zA-Z0-9$_-]+\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$": `${path.resolve(__dirname, '__mocks__/fileMock.js')}`,
    },
}
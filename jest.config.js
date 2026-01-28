module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "<rootDir>/node_modules/@testing-library/jest-native/extend-expect",
  ],
};

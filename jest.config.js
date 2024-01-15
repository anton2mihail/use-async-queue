const config = {
  watchPathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};

export default config;

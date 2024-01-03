module.exports = {
  // ... (autres configurations)
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  }
};

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "tailwindcss-react-native/babel",
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
  };
};

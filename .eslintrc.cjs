module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      files: ["**/*.cjs"],
      env: {
        node: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    // React scope no longer necessary with new JSX transform
    "react/react-in-jsx-scope": "off",
    // Allow .js files to use JSX syntax
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
  },
};

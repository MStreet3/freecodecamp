const presets = [
  [
    "@babel/env",
    {
      targets: { "node": "8.10" },
      useBuiltIns: "usage",
    },
  ],
];

const plugins = [
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-class-properties"
];

module.exports = {
  presets,
  plugins,
};

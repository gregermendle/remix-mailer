module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-plugin-namespace")(".rm", {
      ignore: [/^.rm\s*[*]?$/, ":root"],
    }),
  ],
};

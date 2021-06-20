export default [
  {
    input: "src/main.js",
    output: [
      {
        file: "src/js/min.js",
        format: "iife",
        sourcemap: true,
        plugins: [],
      },
    ],
  }
];

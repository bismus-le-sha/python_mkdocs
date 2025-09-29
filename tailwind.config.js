/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.md",
    "./theme/*.html",
    // "./theme/**/*.html",
    "./theme/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        atkinson: ['"Atkinson Hyperlegible"', "monospace"],
      },
      typography: ({ theme }) => ({
        klein: {
          css: {
            "--tw-prose-body": theme("colors.klein"),
            "--tw-prose-headings": theme("colors.klein"),
            "--tw-prose-lead": theme("colors.klein"),
            "--tw-prose-links": theme("colors.klein"),
            "--tw-prose-bold": theme("colors.klein-bold"),
            "--tw-prose-counters": theme("colors.klein"),
            "--tw-prose-bullets": theme("colors.klein"),
            "--tw-prose-hr": theme("colors.klein"),
            "--tw-prose-quotes": theme("colors.klein"),
            "--tw-prose-quote-borders": theme("colors.klein"),
            "--tw-prose-captions": theme("colors.klein"),
            "--tw-prose-code": theme("colors.klein"),
            "--tw-prose-pre-code": theme("colors.gray.100"),
            "--tw-prose-pre-bg": theme("colors.klein"),
            "--tw-prose-th-borders": theme("colors.klein"),
            "--tw-prose-td-borders": theme("colors.klein"),
          },
        },
      }),
      colors: {
        klein: "#002fa7",
        klein_bold: "#002074",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

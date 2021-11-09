import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';

process.stdout.write(process.cwd());

export default defineConfig({
  darkMode: 'media',
  extract: {
    include: [
      '**/*.tsx',
    ],
    exclude: [
      'node_modules',
      '.git',
    ],
  },
  plugins: [
    typography(),
  ],
});

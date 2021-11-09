import { defineConfig } from 'windicss/helpers';
import typography from 'windicss/plugin/typography';

export default defineConfig({
  darkMode: 'media',
  extract: {
    include: [
      '**/*.tsx',
      '../../libs/**/*.tsx',
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

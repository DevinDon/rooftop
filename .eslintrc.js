module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [
    '**/*',
  ],
  plugins: [
    '@nrwl/nx',
  ],
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
      ],
      rules: {
        '@nrwl/nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: [
                  '*',
                ],
              },
            ],
          },
        ],
      },
    },
  ],
};

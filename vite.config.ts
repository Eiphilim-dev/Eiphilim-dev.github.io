import tailwindcss from '@tailwindcss/vite';
import angular from '@analogjs/vite-plugin-angular';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  let base = './';

  // In GitHub Actions, GITHUB_REPOSITORY is automatically provided (e.g. "owner/repo")
  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    const owner = (parts[0] || '').toLowerCase();
    const repo = parts[1] || '';
    if (repo && repo.toLowerCase() === `${owner}.github.io`) {
      base = '/';
    } else if (repo) {
      base = `/${repo}/`;
    }
  } else if (process.env.BASE_URL && process.env.BASE_URL !== '/') {
    base = process.env.BASE_URL.endsWith('/') ? process.env.BASE_URL : `${process.env.BASE_URL}/`;
  }

  return {
    base,
    plugins: [
      angular({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

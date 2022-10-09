// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [viteSingleFile()],
});

import { type ConfigEnv, defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import terser from '@rollup/plugin-terser';
import path from 'path';

export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  if (command === 'build') {
    return {
      plugins: [ react() ],
      root: '.',
      build: {
        minify: 'terser',
        emptyOutDir: false,
        lib: {
          entry: path.resolve(__dirname, 'src/lib/index.ts'),
          formats: [ 'es' ],
          fileName: 'index'
        },
        rollupOptions: {
          external: [ 'react', 'react-dom', 'react/jsx-runtime' ],
          plugins: [ terser({
            compress: {
              passes: 3,
              pure_getters: true
            },
            format: {
              comments: false,
              preserve_annotations: false
            },
            mangle: {
              toplevel: true
            }
          }) ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'React-dom',
              'react/jsx-runtime': 'react/jsx-runtime'
            },
            minifyInternalExports: true
          }
        }
      }
    };
  } else if (command === 'serve') {
    return {
      plugins: [ react() ],
      root: 'demo'
    };
  } else {
    throw new Error(`Command ${ command } not recongnised.`);
  }
});

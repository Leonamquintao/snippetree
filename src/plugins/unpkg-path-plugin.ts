import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  const BASE_URL = 'https://unpkg.com';
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              BASE_URL + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `${BASE_URL}/${args.path}`
        }
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import react from 'react';
              console.log(message);
            `,
          };
        }

        const { data, request } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        }
      });
    },
  };
};